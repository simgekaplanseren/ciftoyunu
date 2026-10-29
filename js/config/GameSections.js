/** Oyun üst bölümleri — alt bölümler ayrıca eklenir */
export const GAME_SECTIONS = [
  {
    id: 'cyprus',
    name: 'Aşkın Kıvılcımı',
    emoji: '💗',
    icon: 'spark',
    subtitle: 'Kalbin ilk kez başka biri için hızlanması.',
    defaultUnlocked: true,
  },
  {
    id: 'gaziantep',
    name: 'Kalbin Evi',
    emoji: '🏡',
    icon: 'home',
    subtitle: 'Güvenin, sadakatin ve huzurun olduğu yer.',
    defaultUnlocked: false,
  },
  {
    id: 'izmir',
    name: 'Sevginin İnceliği',
    emoji: '🌷',
    icon: 'bloom',
    subtitle: 'Sevmek, özen göstermek ve değer bilmektir.',
    defaultUnlocked: false,
  },
  {
    id: 'istanbul',
    name: 'Aşkın Gerçeği',
    emoji: '✨',
    icon: 'bond',
    subtitle: 'Gerçek aşk, sözlerde değil davranışlarda yaşar.',
    finale: true,
    defaultUnlocked: false,
  },
];

/** Test için tüm bölümleri aç (false = normal ilerleme) */
export const UNLOCK_ALL_LEVELS = false;

export function getDefaultUnlockedSections() {
  if (UNLOCK_ALL_LEVELS) {
    return new Set(GAME_SECTIONS.map((s) => s.id));
  }
  return new Set(
    GAME_SECTIONS.filter((s) => s.defaultUnlocked).map((s) => s.id),
  );
}

export function getSectionById(id) {
  return GAME_SECTIONS.find((s) => s.id === id);
}
