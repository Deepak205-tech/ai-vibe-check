import { Language } from './podcastData';

export const REGIONAL_GREETINGS: Record<Language, string> = {
  hindi:   "Namaste! Kaise hain aap? Chalo AI ki duniya mein kadam rakhte hain 🙏",
  telugu:  "Ela unnaru? Mana AI journey start chedam 🌴",
  tamil:   "Vanakkam! Naama AI pathi poi pesuvom 🎵",
  odia:    "Kemiti achha? Chala AI re ki hue sehi janibu 🌊",
  kannada: "Hege iddira? Naavu AI bagge koodi kalike shuru maadona 🦁",
  english: "Welcome aboard! Ready to learn AI? Let's vibe! ⚡",
};

export const REGIONS: { key: string; label: string; emoji: string; characterIds: string[] }[] = [
  { key: 'north',         label: 'North India',       emoji: '🏔️', characterIds: ['virat', 'kapil', 'deepika'] },
  { key: 'south_tamil',   label: 'Tamil Nadu',         emoji: '🎵', characterIds: ['rajini', 'samantha', 'sundar'] },
  { key: 'south_telugu',  label: 'Andhra / Telangana', emoji: '🌴', characterIds: ['allu', 'samantha', 'yash'] },
  { key: 'south_kannada', label: 'Karnataka',          emoji: '🦁', characterIds: ['yash', 'rajini', 'sundar'] },
  { key: 'east',          label: 'East India',         emoji: '🌊', characterIds: ['dhoni', 'virat', 'kapil'] },
  { key: 'west',          label: 'West / Maharashtra', emoji: '🌆', characterIds: ['deepika', 'kapil', 'sundar'] },
];

export function getDefaultCharIds(region: string): string[] {
  return REGIONS.find(r => r.key === region)?.characterIds ?? ['virat', 'kapil'];
}
