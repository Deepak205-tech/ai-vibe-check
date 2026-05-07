import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { Topic } from '../data/topics';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const USE_NATIVE = Platform.OS !== 'web';

const NUM_ROWS = 4;
// Speed in px/frame — odd rows go left, even rows go right
const ROW_SPEEDS = [0.6, 0.45, 0.55, 0.5];
const ROW_DIRECTIONS = [-1, 1, -1, 1]; // -1 = right→left, 1 = left→right

interface MarqueeRowProps {
  topics: Topic[];
  onPress: (topic: Topic) => void;
  rowIndex: number;
  paused: boolean;
}

function MarqueeRow({ topics, onPress, rowIndex, paused }: MarqueeRowProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const posX = useRef(0);
  const animFrame = useRef(0);
  const pausedRef = useRef(paused);
  const direction = ROW_DIRECTIONS[rowIndex % ROW_DIRECTIONS.length];
  const speed = ROW_SPEEDS[rowIndex % ROW_SPEEDS.length];

  // Rotate topic order per row so adjacent rows don't start with the same pill
  const rotated = [...topics.slice(rowIndex * 3), ...topics.slice(0, rowIndex * 3)];
  // Triple-duplicate so totalW is always >> screen width — no gap ever
  const items = [...rotated, ...rotated, ...rotated];

  const PILL_W = 240; // avg pill width + gap
  const totalW = rotated.length * PILL_W; // width of ONE set

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    // Right-to-left starts at 0, scrolls negative
    // Left-to-right starts at -totalW, scrolls toward 0 then wraps
    posX.current = direction === 1 ? -totalW : 0;
    translateX.setValue(posX.current);

    const move = () => {
      if (!pausedRef.current) {
        posX.current += speed * direction;
        if (direction === -1 && posX.current <= -totalW) posX.current = 0;
        if (direction === 1 && posX.current >= 0) posX.current = -totalW;
        translateX.setValue(posX.current);
      }
      animFrame.current = requestAnimationFrame(move);
    };

    animFrame.current = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  return (
    <Animated.View style={[styles.row, { transform: [{ translateX }] }]}>
      {items.map((topic, i) => (
        <TouchableOpacity
          key={`${topic.id}-${i}`}
          onPress={() => onPress(topic)}
          style={[styles.pill, { backgroundColor: topic.color }]}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.pillEmoji}>{topic.emoji}</Text>
          <Text style={[styles.pillText, { color: topic.textColor }]}>{topic.tag}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

interface FloatingTagsScreenProps {
  topics: Topic[];
  onTopicPress: (topic: Topic) => void;
  modalOpen: boolean;
}

export default function FloatingTagsScreen({ topics, onTopicPress, modalOpen }: FloatingTagsScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.bgOrb1} />
      <View style={styles.bgOrb2} />
      <View style={styles.bgOrb3} />

      <View style={styles.header}>
        <Text style={styles.headerEmoji}>⚡</Text>
        <Text style={styles.headerTitle}>AI Vibe Check</Text>
        <Text style={styles.headerSub}>tap a topic • get the knowledge • no cap</Text>
      </View>

      <View style={styles.rowsArea} pointerEvents="box-none">
        {!modalOpen && Array.from({ length: NUM_ROWS }, (_, i) => (
          <MarqueeRow
            key={i}
            topics={topics}
            onPress={onTopicPress}
            rowIndex={i}
            paused={modalOpen}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>🔥 {topics.length} trending AI topics</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  bgOrb1: {
    position: 'absolute',
    width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(168, 85, 247, 0.08)',
    top: -50, left: -80,
  },
  bgOrb2: {
    position: 'absolute',
    width: 250, height: 250, borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    top: SCREEN_H * 0.3, right: -60,
  },
  bgOrb3: {
    position: 'absolute',
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    bottom: 100, left: 30,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  headerEmoji: { fontSize: 36, marginBottom: 4 },
  headerTitle: {
    fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontStyle: 'italic',
  },
  rowsArea: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 50,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  pillEmoji: { fontSize: 20 },
  pillText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  footer: {
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
  },
});
