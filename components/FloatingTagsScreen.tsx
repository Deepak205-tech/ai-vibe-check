import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import { Topic } from '../data/topics';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const USE_NATIVE = Platform.OS !== 'web';

const PILL_W = 240;
const ROW_SPEEDS = [0.6, 0.45, 0.55, 0.5];
const ROW_DIRECTIONS = [-1, 1, -1, 1];

// ─── MarqueeRow ────────────────────────────────────────────────────────────────

interface MarqueeRowProps {
  topics: Topic[];
  onPress: (topic: Topic) => void;
  onLongPress: (topic: Topic) => void;
  rowIndex: number;
  paused: boolean;
  isRead?: boolean;
}

function MarqueeRow({ topics, onPress, onLongPress, rowIndex, paused, isRead }: MarqueeRowProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const posX = useRef(0);
  const animFrame = useRef(0);
  const pausedRef = useRef(paused);
  const direction = ROW_DIRECTIONS[rowIndex % ROW_DIRECTIONS.length];
  const speed = ROW_SPEEDS[rowIndex % ROW_SPEEDS.length];

  const rotated = [...topics.slice(rowIndex * 3), ...topics.slice(0, rowIndex * 3)];
  const items = [...rotated, ...rotated, ...rotated];
  const totalW = rotated.length * PILL_W;

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
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
          onLongPress={() => onLongPress(topic)}
          delayLongPress={500}
          style={[
            styles.pill,
            { backgroundColor: topic.color },
            isRead && styles.pillRead,
          ]}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.pillEmoji}>{topic.emoji}</Text>
          <Text style={[styles.pillText, { color: topic.textColor }]}>{topic.tag}</Text>
          {isRead && <Text style={styles.pillCheck}>✓</Text>}
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}

// ─── LongPressMenu ─────────────────────────────────────────────────────────────

interface LongPressMenuProps {
  topic: Topic;
  isRead: boolean;
  onMarkRead: () => void;
  onMarkUnread: () => void;
  onDismiss: () => void;
}

function LongPressMenu({ topic, isRead, onMarkRead, onMarkUnread, onDismiss }: LongPressMenuProps) {
  return (
    <Modal transparent animationType="fade" visible onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.menuBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.menuCard}>
              <View style={[styles.menuTopicBadge, { backgroundColor: topic.color }]}>
                <Text style={styles.menuTopicEmoji}>{topic.emoji}</Text>
                <Text style={[styles.menuTopicTag, { color: topic.textColor }]}>{topic.tag}</Text>
              </View>

              {!isRead ? (
                <TouchableOpacity style={styles.menuItem} onPress={onMarkRead}>
                  <Text style={styles.menuItemIcon}>✅</Text>
                  <Text style={styles.menuItemText}>Move to Read</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.menuItem} onPress={onMarkUnread}>
                  <Text style={styles.menuItemIcon}>🔄</Text>
                  <Text style={styles.menuItemText}>Move back to Unread</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.menuItem, styles.menuItemCancel]} onPress={onDismiss}>
                <Text style={styles.menuItemCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// ─── FloatingTagsScreen ────────────────────────────────────────────────────────

interface FloatingTagsScreenProps {
  topics: Topic[];
  onTopicPress: (topic: Topic) => void;
  modalOpen: boolean;
  readIds: Set<string>;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
}

export default function FloatingTagsScreen({
  topics,
  onTopicPress,
  modalOpen,
  readIds,
  onMarkRead,
  onMarkUnread,
}: FloatingTagsScreenProps) {
  const [menuTopic, setMenuTopic] = useState<Topic | null>(null);

  const unreadTopics = topics.filter(t => !readIds.has(t.id));
  const readTopics = topics.filter(t => readIds.has(t.id));

  const handlePress = (topic: Topic) => {
    onMarkRead(topic.id);
    onTopicPress(topic);
  };

  const handleLongPress = (topic: Topic) => {
    setMenuTopic(topic);
  };

  const dismissMenu = () => setMenuTopic(null);

  const unreadRows = Math.min(unreadTopics.length > 0 ? 2 : 0, 2);

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

      <View style={styles.sectionsArea} pointerEvents="box-none">
        {/* Unread section */}
        {unreadTopics.length > 0 && (
          <View style={styles.section} pointerEvents="box-none">
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>Explore</Text>
              <Text style={styles.sectionCount}>{unreadTopics.length} topics</Text>
            </View>
            {!modalOpen && Array.from({ length: unreadRows }, (_, i) => (
              <MarqueeRow
                key={`unread-${i}`}
                topics={unreadTopics}
                onPress={handlePress}
                onLongPress={handleLongPress}
                rowIndex={i}
                paused={modalOpen}
                isRead={false}
              />
            ))}
          </View>
        )}

        {/* Divider */}
        {unreadTopics.length > 0 && readTopics.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Read section — static grid */}
        {readTopics.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionLabelRow}>
              <View style={[styles.sectionDot, styles.sectionDotRead]} />
              <Text style={[styles.sectionLabel, styles.sectionLabelRead]}>Revisit</Text>
              <Text style={styles.sectionCount}>{readTopics.length} read</Text>
            </View>
            <Text style={styles.readHint}>long-press any pill to move it back to unread</Text>
            <View style={styles.readGrid}>
              {readTopics.map(topic => (
                <TouchableOpacity
                  key={topic.id}
                  onPress={() => handlePress(topic)}
                  onLongPress={() => handleLongPress(topic)}
                  delayLongPress={500}
                  style={[styles.pill, styles.pillRead, { backgroundColor: topic.color }]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.pillEmoji}>{topic.emoji}</Text>
                  <Text style={[styles.pillText, { color: topic.textColor }]}>{topic.tag}</Text>
                  <Text style={styles.pillCheck}>✓</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {readTopics.length > 0
            ? `🔥 ${unreadTopics.length} to explore · ${readTopics.length} read`
            : `🔥 ${topics.length} trending AI topics`}
        </Text>
      </View>

      {menuTopic && (
        <LongPressMenu
          topic={menuTopic}
          isRead={readIds.has(menuTopic.id)}
          onMarkRead={() => { onMarkRead(menuTopic.id); dismissMenu(); }}
          onMarkUnread={() => { onMarkUnread(menuTopic.id); dismissMenu(); }}
          onDismiss={dismissMenu}
        />
      )}
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
    paddingBottom: 20,
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
  sectionsArea: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  section: {
    gap: 10,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A855F7',
  },
  sectionDotRead: {
    backgroundColor: '#10B981',
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    flex: 1,
  },
  sectionLabelRead: {
    color: 'rgba(16,185,129,0.7)',
  },
  sectionCount: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 20,
    marginVertical: 4,
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
  pillRead: {
    opacity: 0.65,
  },
  pillEmoji: { fontSize: 20 },
  pillText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  pillCheck: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '800',
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
  readHint: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    fontStyle: 'italic',
    paddingHorizontal: 20,
    marginBottom: 2,
  },
  readGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  // Long-press menu
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  menuCard: {
    backgroundColor: '#1C1C28',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  menuTopicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    gap: 6,
    marginBottom: 8,
  },
  menuTopicEmoji: { fontSize: 18 },
  menuTopicTag: { fontSize: 15, fontWeight: '700' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  menuItemIcon: { fontSize: 20 },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  menuItemCancel: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginTop: 4,
  },
  menuItemCancelText: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});
