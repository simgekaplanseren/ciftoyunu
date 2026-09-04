/** Oyun üst bölümleri — alt bölümler ayrıca eklenir */
export const GAME_SECTIONS = [
  {
    id: 'cyprus',
    name: "KIBRIS'TA BİZ",
    emoji: '🏝️',
    subtitle: 'Adada birlikte geçirdiğimiz anılar',
    defaultUnlocked: true,
  },
  {
    id: 'gaziantep',
    name: "GAZİANTEP'TE BİZ",
    emoji: '🌶️',
    subtitle: '4 durak — hayvanat bahçesinden Şehitkamil\'e',
    defaultUnlocked: false,
  },
  {
    id: 'izmir',
    name: "İZMİR'DE BİZ",
    emoji: '🌊',
    subtitle: 'Alsancak\'tan Selçuk\'a 4 durak',
    defaultUnlocked: false,
  },
  {
    id: 'istanbul',
    name: "İSTANBUL'DA BİZ",
    emoji: '🌉',
    subtitle: 'Doğum gününde — en özel gün',
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
