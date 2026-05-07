import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import FloatingTagsScreen from './components/FloatingTagsScreen';
import TopicModal from './components/TopicModal';
import AuthScreen from './components/AuthScreen';
import LoadingScreen from './components/LoadingScreen';
import OnboardingScreen from './components/OnboardingScreen';
import { AI_TOPICS, Topic } from './data/topics';
import { useAuth } from './hooks/useAuth';
import { useProfile } from './hooks/useProfile';

export default function App() {
  const { user, loading } = useAuth();
  const { profile, profileLoading, saveOnboarding } = useProfile(user?.id ?? null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTopicPress = (topic: Topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  const handleClose = () => setModalVisible(false);

  if (loading || profileLoading) return <LoadingScreen />;
  if (!user) return <AuthScreen />;
  if (!profile?.onboarding_done) {
    return (
      <GestureHandlerRootView style={styles.root}>
        <OnboardingScreen onComplete={saveOnboarding} />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <FloatingTagsScreen
        topics={AI_TOPICS}
        onTopicPress={handleTopicPress}
        modalOpen={modalVisible}
      />
      <TopicModal
        topic={selectedTopic}
        visible={modalVisible}
        onClose={handleClose}
        defaultLang={profile.language ?? undefined}
        defaultRegion={profile.region ?? undefined}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
