import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Topic } from '../data/topics';
import {
  CHARACTERS,
  Character,
  Language,
  PODCAST_SCRIPTS,
  SCRIPT_TEMPLATE,
  resolveLine,
} from '../data/podcastData';
import SharePopup from './SharePopup';

const { width: SCREEN_W } = Dimensions.get('window');
const USE_NATIVE = Platform.OS !== 'web';
const SLIDE_AMOUNT = SCREEN_W - 32;

const LANGUAGES: { key: Language; label: string }[] = [
  { key: 'hindi',    label: 'Hindi 🇮🇳' },
  { key: 'telugu',   label: 'Telugu 🌴' },
  { key: 'tamil',    label: 'Tamil 🎵' },
  { key: 'odia',     label: 'Odia 🌊' },
  { key: 'kannada',  label: 'Kannada 🦁' },
  { key: 'english',  label: 'English 🗣️' },
];

interface PodcastExplainerProps {
  topic: Topic;
  defaultLang?: Language;
  defaultCharIds?: string[];
}

const PodcastExplainer = React.memo(function PodcastExplainer({ topic, defaultLang, defaultCharIds }: PodcastExplainerProps) {
  const [selectedChars, setSelectedChars] = useState<string[]>(defaultCharIds ?? []);
  const [selectedLang, setSelectedLang] = useState<Language | null>(defaultLang ?? null);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [currentExchange, setCurrentExchange] = useState(0);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const charScaleAnims = useRef<Record<string, Animated.Value>>(
    Object.fromEntries(CHARACTERS.map(c => [c.id, new Animated.Value(1)]))
  ).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const initialCanStart = (defaultCharIds?.length ?? 0) >= 2 && defaultLang != null;
  const buttonFadeAnim = useRef(new Animated.Value(initialCanStart ? 1 : 0)).current;

  const canStart = selectedChars.length === 2 && selectedLang !== null;
  const char1 = CHARACTERS.find(c => c.id === selectedChars[0]) ?? null;
  const char2 = CHARACTERS.find(c => c.id === selectedChars[1]) ?? null;
  const script = topic.id && selectedLang ? PODCAST_SCRIPTS[topic.id]?.[selectedLang] : null;

  const resolvedLines = script && char1 && char2
    ? [
        resolveLine(script[currentExchange * 2],     char1.name, char2.name, topic.tag),
        resolveLine(script[currentExchange * 2 + 1], char1.name, char2.name, topic.tag),
      ]
    : null;

  useEffect(() => {
    handleReset();
  }, [topic.id]);

  useEffect(() => {
    Animated.timing(buttonFadeAnim, {
      toValue: canStart ? 1 : 0,
      duration: 200,
      useNativeDriver: USE_NATIVE,
    }).start();
  }, [canStart]);

  const handleReset = () => {
    setConversationStarted(false);
    setCurrentExchange(0);
    setSelectedChars(defaultCharIds ?? []);
    setSelectedLang(defaultLang ?? null);
    const willCanStart = (defaultCharIds?.length ?? 0) >= 2 && defaultLang != null;
    buttonFadeAnim.setValue(willCanStart ? 1 : 0);
    slideAnim.setValue(0);
  };

  const handleCharTap = (charId: string) => {
    setSelectedChars(prev => {
      if (prev.includes(charId)) return prev.filter(id => id !== charId);
      if (prev.length < 2) return [...prev, charId];
      return [prev[0], charId];
    });
    Animated.sequence([
      Animated.spring(charScaleAnims[charId], { toValue: 1.35, friction: 3, tension: 200, useNativeDriver: USE_NATIVE }),
      Animated.spring(charScaleAnims[charId], { toValue: 1,    friction: 5, tension: 80,  useNativeDriver: USE_NATIVE }),
    ]).start();
  };

  const handleStartPodcast = () => {
    if (!canStart) return;
    setConversationStarted(true);
    setCurrentExchange(0);
    slideAnim.setValue(SLIDE_AMOUNT);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: USE_NATIVE,
    }).start();
  };

  const handleNext = () => {
    if (currentExchange >= 3) return;
    Animated.timing(slideAnim, {
      toValue: -SLIDE_AMOUNT,
      duration: 180,
      easing: Easing.in(Easing.quad),
      useNativeDriver: USE_NATIVE,
    }).start(() => {
      setCurrentExchange(prev => prev + 1);
      slideAnim.setValue(SLIDE_AMOUNT);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: USE_NATIVE,
      }).start();
    });
  };

  const handlePrev = () => {
    if (currentExchange <= 0) return;
    Animated.timing(slideAnim, {
      toValue: SLIDE_AMOUNT,
      duration: 180,
      easing: Easing.in(Easing.quad),
      useNativeDriver: USE_NATIVE,
    }).start(() => {
      setCurrentExchange(prev => prev - 1);
      slideAnim.setValue(-SLIDE_AMOUNT);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: USE_NATIVE,
      }).start();
    });
  };

  const scriptAvailable = !!(topic.id && selectedLang && PODCAST_SCRIPTS[topic.id]?.[selectedLang]);

  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎙️ Podcast Explainer</Text>
        <Text style={styles.sectionSub}>pick your characters & language</Text>
      </View>

      {!conversationStarted && (
        <>
          {/* Character picker */}
          <Text style={styles.pickerLabel}>Choose 2 characters</Text>
          <View style={styles.charGrid}>
            {CHARACTERS.map(char => (
              <CharacterButton
                key={char.id}
                char={char}
                selected={selectedChars.includes(char.id)}
                selectionIndex={selectedChars.indexOf(char.id)}
                topicColor={topic.color}
                scaleAnim={charScaleAnims[char.id]}
                onPress={() => handleCharTap(char.id)}
              />
            ))}
          </View>

          {/* Language picker */}
          <Text style={styles.pickerLabel}>Choose language</Text>
          <View style={styles.langWrap}>
            {LANGUAGES.map(lang => {
              const available = selectedLang === lang.key ||
                !topic.id ||
                !!PODCAST_SCRIPTS[topic.id]?.[lang.key];
              return (
                <LanguagePill
                  key={lang.key}
                  label={lang.label}
                  selected={selectedLang === lang.key}
                  available={available}
                  topicColor={topic.color}
                  onPress={() => available && setSelectedLang(lang.key)}
                />
              );
            })}
          </View>

          {/* Start button */}
          <Animated.View
            style={{ opacity: buttonFadeAnim }}
            pointerEvents={canStart && scriptAvailable ? 'auto' : 'none'}
          >
            <TouchableOpacity
              style={[styles.startBtn, { backgroundColor: topic.color }]}
              onPress={handleStartPodcast}
              activeOpacity={0.85}
            >
              <Text style={styles.startBtnText}>🎙️ Start Podcast</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* No script warning */}
          {canStart && !scriptAvailable && (
            <Text style={styles.noScriptText}>
              This language isn't available for this topic yet. Try Hindi!
            </Text>
          )}
        </>
      )}

      {conversationStarted && resolvedLines && char1 && char2 && (
        <>
          {/* Exchange header */}
          <View style={styles.exchangeHeader}>
            <Text style={styles.exchangeCount}>Exchange {currentExchange + 1} of 4</Text>
            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
              <Text style={styles.resetText}>↩ Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Sliding bubbles */}
          <View style={styles.bubblesClip}>
            <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
              {resolvedLines.map((line, idx) => {
                const lineTemplate = SCRIPT_TEMPLATE[currentExchange * 2 + idx];
                const speakerChar = lineTemplate.speaker === 1 ? char1 : char2;
                return (
                  <ChatBubble
                    key={idx}
                    text={line}
                    char={speakerChar}
                    isLeft={lineTemplate.speaker === 1}
                  />
                );
              })}
            </Animated.View>
          </View>

          {/* Navigation */}
          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navBtn, currentExchange === 0 && styles.navBtnDisabled]}
              onPress={handlePrev}
              disabled={currentExchange === 0}
            >
              <Text style={styles.navBtnText}>◀ Prev</Text>
            </TouchableOpacity>

            <View style={styles.dotRow}>
              {[0, 1, 2, 3].map(i => (
                <View
                  key={i}
                  style={[styles.dot, i === currentExchange && { backgroundColor: topic.color, width: 16 }]}
                />
              ))}
            </View>

            {currentExchange === 3 ? (
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: topic.color }]}
                onPress={() => setShowSharePopup(true)}
              >
                <Text style={[styles.navBtnText, { color: '#fff' }]}>Share 🎙️</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.navBtn}
                onPress={handleNext}
              >
                <Text style={styles.navBtnText}>Next ▶</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {conversationStarted && char1 && char2 && (
        <SharePopup
          visible={showSharePopup}
          topic={topic}
          onClose={() => setShowSharePopup(false)}
          podcastShareText={`🎙️ Just learned about ${topic.tag} with ${char1.name} & ${char2.name} on AI Vibe Check!\n\nToday's vibe: "${topic.vibe}" 🧠\n\nCheck it out → https://ai-vibe-check-mu.vercel.app\n#AIVibeCheck #LearnAI #TechVibes`}
        />
      )}
    </View>
  );
});

export default PodcastExplainer;

// ─── CharacterButton ───────────────────────────────────────────────────────────

interface CharacterButtonProps {
  char: Character;
  selected: boolean;
  selectionIndex: number;
  topicColor: string;
  scaleAnim: Animated.Value;
  onPress: () => void;
}

const CharacterButton = React.memo(function CharacterButton({ char, selected, selectionIndex, topicColor, scaleAnim, onPress }: CharacterButtonProps) {
  return (
    <TouchableOpacity style={styles.charButton} onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View style={[
          styles.charCircle,
          selected && { borderColor: topicColor, borderWidth: 2.5 },
        ]}>
          {char.image
            ? <Image source={char.image} style={styles.charImage} resizeMode="cover" />
            : <Text style={styles.charEmoji}>{char.emoji}</Text>
          }
          {selected && (
            <View style={[styles.charBadge, { backgroundColor: topicColor }]}>
              <Text style={styles.charBadgeText}>{selectionIndex === 0 ? '①' : '②'}</Text>
            </View>
          )}
        </View>
        <Text style={styles.charName} numberOfLines={1}>{char.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
});


interface LanguagePillProps {
  label: string;
  selected: boolean;
  available: boolean;
  topicColor: string;
  onPress: () => void;
}

const LanguagePill = React.memo(function LanguagePill({ label, selected, available, topicColor, onPress }: LanguagePillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.langPill,
        selected && { backgroundColor: topicColor },
        !available && styles.langPillUnavailable,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.langPillText,
        selected && { color: '#fff' },
        !available && { opacity: 0.35 },
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
});

// ─── ChatBubble ────────────────────────────────────────────────────────────────

interface ChatBubbleProps {
  text: string;
  char: Character;
  isLeft: boolean;
}

const ChatBubble = React.memo(function ChatBubble({ text, char, isLeft }: ChatBubbleProps) {
  return (
    <View style={[styles.bubbleRow, isLeft ? styles.bubbleRowLeft : styles.bubbleRowRight]}>
      <View style={styles.avatarCol}>
        <View style={[styles.avatarCircle, { backgroundColor: char.color }]}>
          {char.image
            ? <Image source={char.image} style={styles.avatarImage} resizeMode="cover" />
            : <Text style={styles.avatarEmoji}>{char.emoji}</Text>
          }
        </View>
        <Text style={styles.avatarName} numberOfLines={1}>{char.name.split(' ')[0]}</Text>
      </View>
      <View style={[
        styles.bubble,
        isLeft ? styles.bubbleLeft : styles.bubbleRight,
      ]}>
        <Text style={styles.bubbleText}>{text}</Text>
      </View>
    </View>
  );
});

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionSub: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'italic',
  },
  pickerLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  charGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  charButton: {
    width: '22%',
    alignItems: 'center',
    gap: 5,
  },
  charCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  charEmoji: {
    fontSize: 24,
  },
  charImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  charBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  charBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '800',
  },
  charName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
    textAlign: 'center',
    width: 56,
  },
  langWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  langPill: {
    width: '31%',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  langPillUnavailable: {
    opacity: 0.5,
  },
  langPillText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
  startBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  noScriptText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  exchangeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  exchangeCount: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '600',
  },
  resetBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
  },
  resetText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  bubblesClip: {
    overflow: 'hidden',
    marginBottom: 16,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleRowLeft: {
    justifyContent: 'flex-start',
  },
  bubbleRowRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  avatarCol: {
    alignItems: 'center',
    gap: 3,
    width: 44,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarName: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 9,
    textAlign: 'center',
    width: 44,
  },
  bubble: {
    maxWidth: SCREEN_W * 0.6,
    padding: 12,
    borderRadius: 16,
  },
  bubbleLeft: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderTopLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderTopRightRadius: 4,
  },
  bubbleText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    lineHeight: 20,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  navBtnDisabled: {
    opacity: 0.3,
  },
  navBtnText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '600',
  },
  dotRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
