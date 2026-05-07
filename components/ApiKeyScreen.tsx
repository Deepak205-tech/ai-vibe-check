import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ApiKeyScreenProps {
  onSubmit: (key: string) => void;
}

export default function ApiKeyScreen({ onSubmit }: ApiKeyScreenProps) {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = () => {
    const trimmed = key.trim();
    if (trimmed.startsWith('sk-ant-')) {
      onSubmit(trimmed);
    }
  };

  const valid = key.trim().startsWith('sk-ant-') && key.trim().length > 20;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />

      <View style={styles.content}>
        <Text style={styles.emoji}>🔑</Text>
        <Text style={styles.title}>Almost there!</Text>
        <Text style={styles.subtitle}>
          AI Vibe Check uses Claude to generate fresh AI topics every time you open the app.
          You need an Anthropic API key to get started.
        </Text>

        <View style={styles.steps}>
          <Text style={styles.step}>1. Go to <Text style={styles.link}>console.anthropic.com</Text></Text>
          <Text style={styles.step}>2. Sign up → Plans & Billing → add $5</Text>
          <Text style={styles.step}>3. API Keys → Create API key</Text>
          <Text style={styles.step}>4. Paste it below 👇</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="sk-ant-..."
            placeholderTextColor="rgba(255,255,255,0.25)"
            value={key}
            onChangeText={setKey}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!showKey}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowKey(s => !s)}>
            <Text style={styles.eyeEmoji}>{showKey ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.btn, !valid && styles.btnDisabled]}
          onPress={handleSubmit}
          disabled={!valid}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Let's vibe ⚡</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Your key is stored only on your device. Never shared.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgOrb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    top: -50,
    left: -80,
  },
  bgOrb2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    bottom: 80,
    right: -60,
  },
  content: {
    paddingHorizontal: 28,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  steps: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  step: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    lineHeight: 22,
  },
  link: {
    color: '#A855F7',
    fontWeight: '600',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 16,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  eyeBtn: {
    padding: 4,
  },
  eyeEmoji: {
    fontSize: 18,
  },
  btn: {
    width: '100%',
    backgroundColor: '#A855F7',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  note: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 12,
    textAlign: 'center',
  },
});
