import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Language } from '../data/podcastData';

export interface UserProfile {
  language: Language | null;
  region: string | null;
  onboarding_done: boolean;
}

export function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setProfileLoading(false);
      return;
    }
    supabase
      .from('profiles')
      .select('language, region, onboarding_done')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        setProfile(data ?? { language: null, region: null, onboarding_done: false });
        setProfileLoading(false);
      });
  }, [userId]);

  const saveOnboarding = async (language: Language, region: string) => {
    await supabase
      .from('profiles')
      .update({ language, region, onboarding_done: true, updated_at: new Date().toISOString() })
      .eq('id', userId);
    setProfile(p => p ? { ...p, language, region, onboarding_done: true } : p);
  };

  return { profile, profileLoading, saveOnboarding };
}
