# OAuth Setup Guide — Google & LinkedIn with Supabase

This guide walks you through connecting Google and LinkedIn login to a Supabase project.

Your Supabase callback URL: `https://ekqtpedzawlkttscrthf.supabase.co/auth/v1/callback`

---

## Google OAuth

### Step 1 — Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or select an existing one)

### Step 2 — OAuth Consent Screen

1. Sidebar → **APIs & Services** → **OAuth consent screen**
2. Choose **External** → Create
3. Fill in:
   - App name: `AI Vibe Learn` (or whatever your app is called)
   - User support email: your email
   - Developer contact email: your email
4. Skip Scopes for now → Save and Continue
5. Under **Test users**, add your own Google email so you can test login
6. Finish setup

### Step 3 — Create OAuth Credentials

1. Sidebar → **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Name: anything (e.g. `Supabase`)
5. Under **Authorized redirect URIs**, add:
   ```
   https://ekqtpedzawlkttscrthf.supabase.co/auth/v1/callback
   ```
6. Click **Create**
7. Copy the **Client ID** and **Client Secret** from the popup

### Step 4 — Paste into Supabase

1. Go to your Supabase project → **Authentication** → **Providers** → **Google**
2. Toggle **Enable Sign in with Google** ON
3. Paste **Client ID** → "Client IDs" field
4. Paste **Client Secret** → "Client Secret (for OAuth)" field
5. Click **Save**

---

## LinkedIn OAuth (OIDC)

### Step 1 — Create a LinkedIn App

1. Go to [linkedin.com/developers](https://www.linkedin.com/developers/)
2. Click **Create App**
3. Fill in:
   - App name: `AI Vibe Learn`
   - LinkedIn Page: create a company page if prompted (free)
   - App logo: optional
4. Click **Create App**

### Step 2 — Enable Sign In with LinkedIn

1. Inside your app → **Products** tab
2. Find **Sign In with LinkedIn using OpenID Connect** → click **Request access**
3. It's usually approved instantly

### Step 3 — Add Redirect URL

1. Go to the **Auth** tab of your LinkedIn app
2. Under **Authorized redirect URLs for your app**, add:
   ```
   https://ekqtpedzawlkttscrthf.supabase.co/auth/v1/callback
   ```
3. Click **Update**

### Step 4 — Copy Credentials

1. Go to the **Auth** tab → copy **Client ID** and **Client Secret**

### Step 5 — Paste into Supabase

1. Go to your Supabase project → **Authentication** → **Providers** → **LinkedIn (OIDC)**
2. Toggle enable ON
3. Paste **Client ID** and **Client Secret**
4. Click **Save**

---

## Testing

Once both are set up:

1. Run the app: `npm run web`
2. You should see the Auth screen with Google and LinkedIn buttons
3. Tap Google → browser opens → sign in → redirected back to app
4. Check Supabase → **Authentication** → **Users** — your user should appear
5. Check **Table Editor** → **profiles** — your profile row should be saved

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `redirect_uri_mismatch` | The callback URL in Google/LinkedIn doesn't exactly match Supabase's |
| User appears in Auth but not profiles table | Run `supabase_setup.sql` in SQL Editor — trigger may not be set up |
| `provider is not enabled` error | Toggle the provider ON in Supabase and hit Save |
| LinkedIn gives `invalid_client` | Make sure you requested "Sign In with LinkedIn using OpenID Connect" product, not the old one |
