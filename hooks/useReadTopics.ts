import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@read_topics';

export function useReadTopics() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try { setReadIds(new Set(JSON.parse(raw))); } catch {}
      }
      setLoaded(true);
    });
  }, []);

  const markRead = async (topicId: string) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(topicId);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const markUnread = async (topicId: string) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.delete(topicId);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  return { readIds, markRead, markUnread, loaded };
}
