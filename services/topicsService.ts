import Anthropic from '@anthropic-ai/sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Topic } from '../data/topics';

const CACHE_KEY = 'ai_topics_cache';
const CACHE_TIMESTAMP_KEY = 'ai_topics_cache_timestamp';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const COLORS = [
  { bg: '#FF6B6B', text: '#fff' },
  { bg: '#4ECDC4', text: '#fff' },
  { bg: '#A855F7', text: '#fff' },
  { bg: '#F59E0B', text: '#fff' },
  { bg: '#EF4444', text: '#fff' },
  { bg: '#10B981', text: '#fff' },
  { bg: '#8B5CF6', text: '#fff' },
  { bg: '#F97316', text: '#fff' },
  { bg: '#06B6D4', text: '#fff' },
  { bg: '#84CC16', text: '#333' },
  { bg: '#EC4899', text: '#fff' },
  { bg: '#6366F1', text: '#fff' },
  { bg: '#14B8A6', text: '#fff' },
  { bg: '#7C3AED', text: '#fff' },
  { bg: '#0EA5E9', text: '#fff' },
  { bg: '#DC2626', text: '#fff' },
  { bg: '#059669', text: '#fff' },
  { bg: '#B45309', text: '#fff' },
  { bg: '#D946EF', text: '#fff' },
  { bg: '#0284C7', text: '#fff' },
];

const SYSTEM_PROMPT = `You are a Gen-Z AI education content creator. You generate trending AI topics that are fun, engaging, and educational for young adults.

Always respond with ONLY valid JSON — no markdown, no code blocks, no commentary. Just the raw JSON array.`;

const USER_PROMPT = `Generate exactly 20 trending AI topics for a learning app. Each topic must be something that is currently hot or viral in the AI space in 2025-2026.

Return a JSON array of 20 objects. Each object must have EXACTLY these fields:
- tag: string starting with # (short, max 15 chars, e.g. "#AgenticAI")
- emoji: single emoji that represents the topic
- vibe: short catchy phrase (max 40 chars, very Gen-Z)
- tldr: 2-3 sentence plain-English explanation using Gen-Z slang (fr, no cap, bestie, etc.)
- funFact: one mind-blowing fact about this topic with an emoji at the end
- realWorldExample: one concrete real-world example, conversational tone
- tryIt: object with:
  - prompt: quiz question about this topic (end with ____)
  - options: array of exactly 4 strings (short answers, add emojis)
  - correctIndex: number 0-3 (which option is correct)
  - explanation: fun explanation of why the answer is correct (2-3 sentences, Gen-Z tone)
- meme: short funny meme text (2-4 lines, use newlines, relatable dev/AI humor)

Make topics diverse — cover agents, models, tools, techniques, companies, trends. Include some niche/cutting-edge topics that real AI enthusiasts would recognize.

Do NOT repeat topics — generate fresh ones each time. The year is 2026, focus on what's trending NOW.

Return ONLY the JSON array, no other text.`;

async function generateTopicsFromClaude(apiKey: string): Promise<Topic[]> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: USER_PROMPT }],
  });

  const textBlock = response.content.find(b => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text in Claude response');
  }

  const raw = textBlock.text.trim();
  const parsed: any[] = JSON.parse(raw);

  return parsed.map((item: any, idx: number) => {
    const color = COLORS[idx % COLORS.length];
    return {
      id: String(idx + 1),
      tag: item.tag,
      emoji: item.emoji,
      color: color.bg,
      textColor: color.text,
      vibe: item.vibe,
      tldr: item.tldr,
      funFact: item.funFact,
      realWorldExample: item.realWorldExample,
      tryIt: {
        prompt: item.tryIt.prompt,
        options: item.tryIt.options,
        correctIndex: item.tryIt.correctIndex,
        explanation: item.tryIt.explanation,
      },
      meme: item.meme,
    } as Topic;
  });
}

export async function loadTopics(apiKey: string): Promise<Topic[]> {
  try {
    const [cached, timestamp] = await Promise.all([
      AsyncStorage.getItem(CACHE_KEY),
      AsyncStorage.getItem(CACHE_TIMESTAMP_KEY),
    ]);

    const cacheAge = timestamp ? Date.now() - Number(timestamp) : Infinity;
    const cacheValid = cached && cacheAge < CACHE_TTL_MS;

    if (cacheValid) {
      const topics = JSON.parse(cached) as Topic[];
      if (cacheAge > 6 * 60 * 60 * 1000) {
        refreshTopicsInBackground(apiKey);
      }
      return topics;
    }

    const topics = await generateTopicsFromClaude(apiKey);
    await saveToCache(topics);
    return topics;
  } catch (err) {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached) as Topic[];
    } catch {}
    throw err;
  }
}

async function saveToCache(topics: Topic[]) {
  await Promise.all([
    AsyncStorage.setItem(CACHE_KEY, JSON.stringify(topics)),
    AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now())),
  ]);
}

function refreshTopicsInBackground(apiKey: string) {
  generateTopicsFromClaude(apiKey)
    .then(saveToCache)
    .catch(() => {});
}

export async function clearTopicsCache() {
  await Promise.all([
    AsyncStorage.removeItem(CACHE_KEY),
    AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY),
  ]);
}
