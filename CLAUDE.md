# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (all platforms)
npm start           # opens Expo dev menu
npm run ios         # iOS simulator
npm run android     # Android emulator
npm run web         # browser at localhost:8089

# Type check
npx tsc --noEmit
```

Port is fixed at **8089** across all targets.

There is no test suite or linter configured.

## Architecture

**Entry point:** `index.ts` → `App.tsx`

**App.tsx** manages two pieces of state: `selectedTopic` and `modalVisible`. It renders two siblings — `FloatingTagsScreen` (always mounted) and `TopicModal` (always mounted but animated in/out). The `modalOpen` prop is passed to `FloatingTagsScreen` to unmount floating tags while the modal is open (prevents them showing through gaps).

### Data flow

```
App.tsx
 ├── FloatingTagsScreen   — bouncing topic pill animations, unmounts tags when modalOpen
 └── TopicModal           — bottom sheet modal with 3 tabs
      └── PodcastExplainer — lazy-mounted 100ms after sheet animation completes
```

**Static topics:** `data/topics.ts` exports `AI_TOPICS` — 20 hardcoded `Topic` objects used as fallback and default.

**Dynamic topics:** `services/topicsService.ts` calls Claude (`claude-haiku-4-5`) to generate fresh topics. Results are cached in AsyncStorage for 24h with a stale-while-revalidate pattern (background refresh after 6h). The app currently uses static topics from `AI_TOPICS` directly — `topicsService` is wired but not yet connected in `App.tsx`.

**`ApiKeyScreen`** — gates the dynamic generation flow. Validates that the key starts with `sk-ant-`. Not currently shown in `App.tsx` (static topics are used instead).

### Topic Modal tabs

- **The Vibe** — TL;DR card, Fun Fact card, Real World Example card, then `PodcastExplainer`
- **Try It** — multiple choice quiz with shake animation on wrong answer
- **Meme** — static meme text card

### Podcast Explainer (`components/PodcastExplainer.tsx`)

Self-contained component with its own state machine:
1. **Picker state** — choose 2 of 9 characters + 1 of 6 languages → "Start Podcast" fades in
2. **Conversation state** — 4 exchanges of 2 chat bubbles each, with slide animations between exchanges

Scripts live in `data/podcastData.ts` as `PODCAST_SCRIPTS: Record<topicId, Partial<Record<Language, string[]>>>` — 20 topics × 6 languages × 8 lines per script. Placeholders `{char1}`, `{char2}`, `{topic}` are resolved at render time via `resolveLine()`.

**Languages:** `hindi | telugu | tamil | odia | kannada | english`

**Characters:** 9 total (Rajinikanth, Virat Kohli, Allu Arjun, MS Dhoni, Samantha, Deepika, Kapil Sharma, Sundar Pichai, Yash). Each has a chibi PNG in `assets/characters/` loaded via `require`.

### Animation patterns

- `useNativeDriver` is conditionally set: `const USE_NATIVE = Platform.OS !== 'web'` — web doesn't support native driver, so this guard is used everywhere.
- Floating tags use `requestAnimationFrame` loops (not Animated API) for position updates.
- `PodcastExplainer` is lazy-mounted via a `setTimeout(..., 100)` in the modal's `.start()` callback to avoid JS thread contention during the slide-in animation.

### Key constraints

- `data/podcastData.ts` is ~1300 lines — the full script corpus. Edits to add a language or topic require adding entries to `PODCAST_SCRIPTS` for all relevant topic IDs.
- The `Topic` interface requires `id` to be a string matching keys in `PODCAST_SCRIPTS` (e.g. `"1"` through `"20"`).
- `newArchEnabled: true` in app.json — React Native new architecture is on.
- `android.edgeToEdgeEnabled: true` — Android renders edge-to-edge; bottom safe area must be handled manually.
