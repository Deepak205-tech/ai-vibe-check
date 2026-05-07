import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const MESSAGES = [
  'Asking Claude for the hottest AI topics... 🤖',
  'Generating fresh quizzes and memes... 😂',
  'No cap, this is gonna slap... 🔥',
  'Almost done bestie... ✨',
];

export default function LoadingScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const [msgIndex, setMsgIndex] = React.useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 1200, useNativeDriver: true })
    ).start();

    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />

      <Animated.View style={[styles.content, { opacity, transform: [{ scale }] }]}>
        <Animated.Text style={[styles.spinnerEmoji, { transform: [{ rotate }] }]}>
          ⚡
        </Animated.Text>
        <Text style={styles.title}>AI Vibe Check</Text>
        <Text style={styles.subtitle}>Cooking up fresh topics...</Text>

        <View style={styles.messageBox}>
          <Text style={styles.message}>{MESSAGES[msgIndex]}</Text>
        </View>

        <View style={styles.dots}>
          {[0, 1, 2].map(i => (
            <PulseDot key={i} delay={i * 200} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

function PulseDot({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.dot, { opacity: anim }]} />;
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
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
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
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  spinnerEmoji: {
    fontSize: 56,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 32,
    fontStyle: 'italic',
  },
  messageBox: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    minWidth: 260,
    alignItems: 'center',
    marginBottom: 28,
  },
  message: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A855F7',
  },
});
