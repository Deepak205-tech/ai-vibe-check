import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CHARACTERS, Language } from '../data/podcastData';
import { REGIONAL_GREETINGS, REGIONS } from '../data/onboardingData';

const { width: SCREEN_W } = Dimensions.get('window');

const LANGUAGES: { key: Language; label: string }[] = [
  { key: 'hindi',   label: 'Hindi 🇮🇳' },
  { key: 'telugu',  label: 'Telugu 🌴' },
  { key: 'tamil',   label: 'Tamil 🎵' },
  { key: 'odia',    label: 'Odia 🌊' },
  { key: 'kannada', label: 'Kannada 🦁' },
  { key: 'english', label: 'English 🗣️' },
];

interface Props {
  onComplete: (language: Language, region: string) => Promise<void>;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleLangSelect = (lang: Language) => {
    setSelectedLang(lang);
    setStep(2);
  };

  const handleComplete = async () => {
    if (!selectedLang || !selectedRegion) return;
    setSaving(true);
    try {
      await onComplete(selectedLang, selectedRegion);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      {/* Step dots */}
      <View style={styles.dots}>
        {[1, 2, 3].map(n => (
          <View key={n} style={[styles.dot, step >= n && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.inner}>
        {step === 1 && (
          <>
            <Text style={styles.emoji}>🌐</Text>
            <Text style={styles.heading}>Choose your language</Text>
            <Text style={styles.sub}>Pick the language for your podcasts</Text>
            <View style={styles.pills}>
              {LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang.key}
                  style={styles.pill}
                  onPress={() => handleLangSelect(lang.key)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.pillText}>{lang.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {step === 2 && selectedLang && (
          <>
            <Text style={styles.greeting}>{REGIONAL_GREETINGS[selectedLang]}</Text>
            <Text style={styles.heading}>Apna region choose karo</Text>
            <View style={styles.regionGrid}>
              {REGIONS.map(region => {
                const chars = region.characterIds
                  .map(id => CHARACTERS.find(c => c.id === id))
                  .filter(Boolean);
                const isSelected = selectedRegion === region.key;
                return (
                  <TouchableOpacity
                    key={region.key}
                    style={[styles.regionCard, isSelected && styles.regionCardSelected]}
                    onPress={() => setSelectedRegion(region.key)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.regionEmoji}>{region.emoji}</Text>
                    <Text style={styles.regionLabel}>{region.label}</Text>
                    <Text style={styles.regionChars}>
                      {chars.map(c => c!.emoji).join(' ')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={[styles.continueBtn, !selectedRegion && styles.continueBtnDisabled]}
              onPress={() => selectedRegion && setStep(3)}
              disabled={!selectedRegion}
              activeOpacity={0.85}
            >
              <Text style={styles.continueBtnText}>Continue →</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && selectedLang && (
          <>
            <Text style={styles.emoji}>🎉</Text>
            <Text style={styles.greetingLarge}>{REGIONAL_GREETINGS[selectedLang]}</Text>
            <Text style={styles.sub}>Your vibe is set. Chalo shuru karte hain!</Text>
            <TouchableOpacity
              style={styles.letsGoBtn}
              onPress={handleComplete}
              disabled={saving}
              activeOpacity={0.85}
            >
              {saving
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.letsGoBtnText}>Let's Go! ⚡</Text>
              }
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb1: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(168,85,247,0.08)', top: -50, left: -80,
  },
  orb2: {
    position: 'absolute', width: 250, height: 250, borderRadius: 125,
    backgroundColor: 'rgba(59,130,246,0.08)', top: '30%', right: -60,
  },
  orb3: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(16,185,129,0.06)', bottom: 100, left: 30,
  },
  dots: {
    position: 'absolute', top: 60, flexDirection: 'row', gap: 8,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dotActive: {
    backgroundColor: '#A855F7',
  },
  inner: {
    width: Math.min(SCREEN_W - 48, 400),
    alignItems: 'center',
  },
  emoji: {
    fontSize: 52, marginBottom: 12,
  },
  heading: {
    fontSize: 22, fontWeight: '700', color: '#fff',
    textAlign: 'center', marginBottom: 6,
  },
  sub: {
    fontSize: 14, color: 'rgba(255,255,255,0.45)',
    textAlign: 'center', marginBottom: 32,
  },
  greeting: {
    fontSize: 15, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', marginBottom: 20, fontStyle: 'italic',
  },
  greetingLarge: {
    fontSize: 20, color: '#fff', fontWeight: '600',
    textAlign: 'center', marginBottom: 16,
  },
  pills: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 12,
  },
  pill: {
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  pillText: {
    color: '#fff', fontSize: 15, fontWeight: '500',
  },
  regionGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 12, marginBottom: 28,
  },
  regionCard: {
    width: (Math.min(SCREEN_W - 48, 400) - 12) / 2,
    padding: 16, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', gap: 4,
  },
  regionCardSelected: {
    borderColor: '#A855F7',
    backgroundColor: 'rgba(168,85,247,0.12)',
  },
  regionEmoji: { fontSize: 28 },
  regionLabel: { fontSize: 13, color: '#fff', fontWeight: '600', textAlign: 'center' },
  regionChars: { fontSize: 16, marginTop: 2 },
  continueBtn: {
    paddingVertical: 15, paddingHorizontal: 40,
    backgroundColor: '#A855F7', borderRadius: 14,
  },
  continueBtnDisabled: {
    backgroundColor: 'rgba(168,85,247,0.3)',
  },
  continueBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  letsGoBtn: {
    marginTop: 24, paddingVertical: 16, paddingHorizontal: 48,
    backgroundColor: '#A855F7', borderRadius: 14, minWidth: 180, alignItems: 'center',
  },
  letsGoBtnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
