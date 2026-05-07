import { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { signOut as authSignOut } from '../services/authService';

async function upsertProfile(user: User) {
  const meta = user.user_metadata ?? {};
  await supabase.from('profiles').upsert({
    id: user.id,
    email: user.email,
    full_name: meta.full_name ?? meta.name ?? null,
    avatar_url: meta.avatar_url ?? meta.picture ?? null,
    provider: user.app_metadata?.provider ?? null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (event === 'SIGNED_IN' && session?.user) {
        upsertProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, signOut: authSignOut };
}
