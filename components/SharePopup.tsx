import React, { useState } from 'react';
import {
  Linking,
  Modal,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Topic } from '../data/topics';
import Toast from './Toast';

const APP_URL = 'https://ai-vibe-check-mu.vercel.app';

interface SharePopupProps {
  visible: boolean;
  topic: Topic;
  onClose: () => void;
  podcastShareText?: string;
}

export default function SharePopup({ visible, topic, onClose, podcastShareText }: SharePopupProps) {
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const defaultShareText = `🧠 Just aced the AI Vibe Check on ${topic.tag}!\nCrushed all 3 questions — I'm on my AI learning journey 🚀\nCheck it out → ${APP_URL}\n#AIVibeCheck #LearnAI #TechVibes`;
  const shareText = podcastShareText ?? defaultShareText;

  const titleText = podcastShareText
    ? 'Share your learning! 🎙️'
    : 'AI Genius unlocked!';

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 50);
  };

  const [linkedInCopied, setLinkedInCopied] = useState(false);

  const handleLinkedIn = async () => {
    // Copy post text to clipboard first so user can paste it into the LinkedIn dialog
    try {
      if (Platform.OS !== 'web') {
        // On mobile just open share sheet — native LinkedIn app handles text
        await Share.share({ message: shareText, url: APP_URL });
        return;
      }
      await (navigator as any).clipboard.writeText(shareText);
      setLinkedInCopied(true);
    } catch {}
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(APP_URL)}&title=${encodeURIComponent('AI Vibe Check')}&summary=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  const handleInstagram = async () => {
    if (Platform.OS !== 'web') {
      // Mobile: native share sheet — user picks Instagram in one tap
      try {
        await Share.share({ message: shareText, url: APP_URL });
      } catch {}
    } else {
      // Web: Instagram has no public web share API — copy caption is the only option
      try {
        await (navigator as any).clipboard.writeText(shareText);
        showToast('Caption copied! Open Instagram and paste into your Story 📸');
      } catch {
        showToast('Copy the caption above and paste into your Instagram Story 📸');
      }
    }
  };

  const handleCopyLink = async () => {
    if (Platform.OS !== 'web') {
      try {
        await Share.share({ message: APP_URL });
      } catch {}
    } else {
      try {
        await (navigator as any).clipboard.writeText(APP_URL);
        showToast('Link copied ✅');
      } catch {
        showToast('Copy: ' + APP_URL);
      }
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Trophy header */}
          <Text style={styles.trophy}>{podcastShareText ? '🎙️' : '🏆'}</Text>
          <Text style={styles.title}>{titleText}</Text>
          <Text style={styles.sub}>
            {podcastShareText
              ? <>Spread the vibe on <Text style={{ color: topic.color }}>{topic.emoji} {topic.tag}</Text></>
              : <>You aced all 3 questions on <Text style={{ color: topic.color }}>{topic.emoji} {topic.tag}</Text></>
            }
          </Text>

          {/* Share preview card */}
          <View style={styles.previewCard}>
            <Text style={styles.previewText}>{shareText}</Text>
          </View>

          {/* Share buttons */}
          <TouchableOpacity style={[styles.shareBtn, styles.linkedinBtn]} onPress={handleLinkedIn} activeOpacity={0.85}>
            <Text style={styles.shareBtnIcon}>🔗</Text>
            <Text style={styles.shareBtnText}>Share on LinkedIn</Text>
          </TouchableOpacity>
          {linkedInCopied && (
            <Text style={styles.linkedInHint}>✅ Post copied — just paste it in the box and hit Post!</Text>
          )}

          <TouchableOpacity style={[styles.shareBtn, styles.instaBtn]} onPress={handleInstagram} activeOpacity={0.85}>
            <Text style={styles.shareBtnIcon}>📸</Text>
            <Text style={styles.shareBtnText}>
              {Platform.OS !== 'web' ? 'Share to Instagram (1 tap)' : 'Copy caption for Instagram'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.shareBtn, styles.copyBtn]} onPress={handleCopyLink} activeOpacity={0.85}>
            <Text style={styles.shareBtnIcon}>🔗</Text>
            <Text style={styles.shareBtnText}>Copy App Link</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.laterBtn} onPress={() => { setLinkedInCopied(false); onClose(); }} activeOpacity={0.7}>
            <Text style={styles.laterText}>Maybe later</Text>
          </TouchableOpacity>
        </View>

        <Toast message={toast} visible={toastVisible} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1A1A26',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  trophy: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  sub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
  },
  previewCard: {
    backgroundColor: '#0A0A0F',
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  previewText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    lineHeight: 20,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
    gap: 10,
  },
  linkedinBtn: {
    backgroundColor: '#0A66C2',
  },
  instaBtn: {
    backgroundColor: '#C13584',
  },
  copyBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  shareBtnIcon: {
    fontSize: 18,
  },
  shareBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  linkedInHint: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -4,
    marginBottom: 6,
  },
  laterBtn: {
    marginTop: 4,
    paddingVertical: 10,
  },
  laterText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
    fontWeight: '500',
  },
});
