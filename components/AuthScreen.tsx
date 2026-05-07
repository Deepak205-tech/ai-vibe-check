import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { signInWithGoogle, signInWithLinkedIn } from '../services/authService';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function AuthScreen() {
  const [loading, setLoading] = useState<'google' | 'linkedin' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogle = async () => {
    setError(null);
    setLoading('google');
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setError(e.message ?? 'Sign in failed');
    } finally {
      setLoading(null);
    }
  };

  const handleLinkedIn = async () => {
    setError(null);
    setLoading('linkedin');
    try {
      await signInWithLinkedIn();
    } catch (e: any) {
      setError(e.message ?? 'Sign in failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      <View style={styles.inner}>
        <Text style={styles.emoji}>⚡</Text>
        <Text style={styles.title}>AI Vibe Check</Text>
        <Text style={styles.sub}>Learn AI concepts, no cap fr fr</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.btn, styles.googleBtn]}
            onPress={handleGoogle}
            disabled={loading !== null}
            activeOpacity={0.85}
          >
            {loading === 'google'
              ? <ActivityIndicator color="#333" />
              : <>
                  <Text style={styles.googleIcon}>G</Text>
                  <Text style={styles.googleText}>Continue with Google</Text>
                </>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.linkedinBtn]}
            onPress={handleLinkedIn}
            disabled={loading !== null}
            activeOpacity={0.85}
          >
            {loading === 'linkedin'
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Text style={styles.linkedinIcon}>in</Text>
                  <Text style={styles.linkedinText}>Continue with LinkedIn</Text>
                </>
            }
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.disclaimer}>
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    top: -50,
    left: -80,
  },
  orb2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    top: SCREEN_H * 0.3,
    right: -60,
  },
  orb3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    bottom: 100,
    left: 30,
  },
  inner: {
    width: Math.min(SCREEN_W - 48, 400),
    alignItems: 'center',
  },
  emoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  sub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.45)',
    fontStyle: 'italic',
    marginBottom: 48,
  },
  buttons: {
    width: '100%',
    gap: 14,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
  },
  googleBtn: {
    backgroundColor: '#FFFFFF',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4285F4',
    width: 22,
    textAlign: 'center',
  },
  googleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  linkedinBtn: {
    backgroundColor: '#0A66C2',
  },
  linkedinIcon: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    width: 22,
    textAlign: 'center',
    paddingVertical: 1,
  },
  linkedinText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  error: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 16,
    textAlign: 'center',
  },
  disclaimer: {
    marginTop: 32,
    color: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    textAlign: 'center',
  },
});
