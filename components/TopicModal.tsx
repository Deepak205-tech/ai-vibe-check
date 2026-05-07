import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const USE_NATIVE = Platform.OS !== 'web';
import { Topic } from '../data/topics';
import { Language } from '../data/podcastData';
import { getDefaultCharIds } from '../data/onboardingData';
import PodcastExplainer from './PodcastExplainer';
import SharePopup from './SharePopup';

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

interface TopicModalProps {
  topic: Topic | null;
  visible: boolean;
  onClose: () => void;
  defaultLang?: Language;
  defaultRegion?: string;
}

type Tab = 'vibe' | 'tryit' | 'meme';

export default function TopicModal({ topic, visible, onClose, defaultLang, defaultRegion }: TopicModalProps) {
  const slideAnim = useRef(new Animated.Value(SCREEN_H)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState<Tab>('vibe');
  const [currentQ, setCurrentQ] = useState(0);
  const [correctFlags, setCorrectFlags] = useState([false, false, false]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const [podcastMounted, setPodcastMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setPodcastMounted(false);
      setActiveTab('vibe');
      setCurrentQ(0);
      setCorrectFlags([false, false, false]);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowSharePopup(false);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          tension: 65,
          useNativeDriver: USE_NATIVE,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: USE_NATIVE,
        }),
      ]).start(() => {
        setTimeout(() => setPodcastMounted(true), 100);
      });
    } else {
      setPodcastMounted(false);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_H,
          duration: 300,
          useNativeDriver: USE_NATIVE,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: USE_NATIVE,
        }),
      ]).start();
    }
  }, [visible]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === topic!.tryIt[currentQ].correctIndex;
    if (isCorrect) {
      const next = [...correctFlags];
      next[currentQ] = true;
      setCorrectFlags(next);
      if (next.every(Boolean)) {
        setTimeout(() => setShowSharePopup(true), 800);
      }
    } else {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: USE_NATIVE }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: USE_NATIVE }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: USE_NATIVE }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: USE_NATIVE }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: USE_NATIVE }),
      ]).start();
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQ(q => q + 1);
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!topic) return null;

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'vibe', label: 'The Vibe', icon: '✨' },
    { key: 'tryit', label: 'Try It', icon: '🧩' },
    { key: 'meme', label: 'Meme', icon: '😂' },
  ];

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
      </Animated.View>

      {/* Bottom sheet */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        {/* Drag handle */}
        <View style={styles.dragHandle} />

        {/* Header */}
        <View style={[styles.topicHeader, { backgroundColor: topic.color + '22' }]}>
          <View style={[styles.topicBadge, { backgroundColor: topic.color }]}>
            <Text style={styles.topicEmoji}>{topic.emoji}</Text>
            <Text style={[styles.topicTag, { color: topic.textColor }]}>{topic.tag}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.vibe}>{topic.vibe}</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && { backgroundColor: topic.color }]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          overScrollMode="never"
        >
          {activeTab === 'vibe' && (
            <View>
              <View style={styles.card}>
                <Text style={styles.cardLabel}>TL;DR 📱</Text>
                <Text style={styles.cardText}>{topic.tldr}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardLabel}>Mind-blowing fact 🤯</Text>
                <Text style={styles.cardText}>{topic.funFact}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardLabel}>Real world example 🌍</Text>
                <Text style={styles.cardText}>{topic.realWorldExample}</Text>
              </View>

              {podcastMounted && (
                <PodcastExplainer
                  key={topic.id}
                  topic={topic}
                  defaultLang={defaultLang}
                  defaultCharIds={defaultRegion ? getDefaultCharIds(defaultRegion).slice(0, 2) : undefined}
                />
              )}
            </View>
          )}

          {activeTab === 'tryit' && (
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              <View style={styles.quizCard}>
                {/* Progress dots */}
                <View style={styles.progressRow}>
                  {[0, 1, 2].map(i => (
                    <View
                      key={i}
                      style={[
                        styles.progressDot,
                        i === currentQ && styles.progressDotActive,
                        correctFlags[i] && styles.progressDotCorrect,
                      ]}
                    />
                  ))}
                  <Text style={styles.progressLabel}>Question {currentQ + 1} of 3</Text>
                </View>

                <Text style={styles.quizPrompt}>{topic.tryIt[currentQ].prompt}</Text>

                {topic.tryIt[currentQ].options.map((option, idx) => {
                  let btnStyle = styles.quizOption;
                  let textStyle = styles.quizOptionText;

                  if (showResult) {
                    if (idx === topic.tryIt[currentQ].correctIndex) {
                      btnStyle = { ...styles.quizOption, ...styles.correctOption };
                      textStyle = { ...styles.quizOptionText, color: '#fff' };
                    } else if (idx === selectedAnswer) {
                      btnStyle = { ...styles.quizOption, ...styles.wrongOption };
                      textStyle = { ...styles.quizOptionText, color: '#fff' };
                    }
                  } else if (idx === selectedAnswer) {
                    btnStyle = { ...styles.quizOption, backgroundColor: topic.color + '33', borderColor: topic.color };
                  }

                  return (
                    <TouchableOpacity
                      key={idx}
                      style={btnStyle}
                      onPress={() => handleAnswerSelect(idx)}
                      disabled={showResult}
                      activeOpacity={0.75}
                    >
                      <Text style={styles.optionLetter}>{['A', 'B', 'C', 'D'][idx]}</Text>
                      <Text style={textStyle}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}

                {showResult && (
                  <Animated.View style={[
                    styles.resultCard,
                    { backgroundColor: selectedAnswer === topic.tryIt[currentQ].correctIndex ? '#10B981' + '22' : '#EF4444' + '22' }
                  ]}>
                    <Text style={styles.resultEmoji}>
                      {selectedAnswer === topic.tryIt[currentQ].correctIndex ? '🔥 Slay!' : '💀 Not quite...'}
                    </Text>
                    <Text style={styles.resultText}>{topic.tryIt[currentQ].explanation}</Text>

                    {selectedAnswer === topic.tryIt[currentQ].correctIndex ? (
                      currentQ < 2 ? (
                        <TouchableOpacity style={styles.retryBtn} onPress={handleNextQuestion}>
                          <Text style={styles.retryText}>Next Question →</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={[styles.retryBtn, { backgroundColor: topic.color + '33' }]} onPress={() => setShowSharePopup(true)}>
                          <Text style={styles.retryText}>See your result 🏆</Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
                        <Text style={styles.retryText}>Try again 🔄</Text>
                      </TouchableOpacity>
                    )}
                  </Animated.View>
                )}
              </View>
            </Animated.View>
          )}

          {activeTab === 'meme' && (
            <View style={styles.memeCard}>
              <Text style={styles.memeIcon}>😭</Text>
              <View style={styles.memeTextBox}>
                <Text style={styles.memeText}>{topic.meme}</Text>
              </View>
              <Text style={styles.memeCaption}>— every dev ever, probably</Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>

      {topic && (
        <SharePopup
          visible={showSharePopup}
          topic={topic}
          onClose={() => setShowSharePopup(false)}
        />
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_H * 0.82,
    backgroundColor: '#13131A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  topicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    gap: 6,
  },
  topicEmoji: {
    fontSize: 20,
  },
  topicTag: {
    fontSize: 16,
    fontWeight: '700',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
  vibe: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    fontStyle: 'italic',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    gap: 4,
  },
  tabIcon: {
    fontSize: 14,
  },
  tabLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cardText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 15,
    lineHeight: 23,
  },
  quizCard: {
    gap: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressDotActive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 20,
  },
  progressDotCorrect: {
    backgroundColor: '#10B981',
    width: 8,
  },
  progressLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  quizPrompt: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 25,
  },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 12,
  },
  correctOption: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  wrongOption: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  optionLetter: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    fontWeight: '800',
    width: 18,
  },
  quizOptionText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  resultCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  resultEmoji: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  resultText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  retryBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  retryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  memeCard: {
    alignItems: 'center',
    paddingTop: 10,
  },
  memeIcon: {
    fontSize: 50,
    marginBottom: 16,
  },
  memeTextBox: {
    backgroundColor: '#1C1C28',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  memeText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'monospace',
  },
  memeCaption: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 14,
  },
});
