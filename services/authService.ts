import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { supabase } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

function getRedirectUrl() {
  if (Platform.OS === 'web') return window.location.origin;
  // Tell Supabase to redirect back to the app's deep link after OAuth
  return Linking.createURL('auth/callback');
}

async function handleOAuth(url: string, redirectBack: string) {
  const result = await WebBrowser.openAuthSessionAsync(url, redirectBack);
  if (result.type === 'success') {
    const resultUrl = new URL(result.url);
    const code = resultUrl.searchParams.get('code');
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;
    }
  }
}

export async function signInWithGoogle() {
  const redirectTo = getRedirectUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: Platform.OS !== 'web',
    },
  });
  if (error) throw error;
  if (Platform.OS !== 'web' && data.url) await handleOAuth(data.url, redirectTo);
}

export async function signInWithLinkedIn() {
  const redirectTo = getRedirectUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: {
      redirectTo,
      skipBrowserRedirect: Platform.OS !== 'web',
    },
  });
  if (error) throw error;
  if (Platform.OS !== 'web' && data.url) await handleOAuth(data.url, redirectTo);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
