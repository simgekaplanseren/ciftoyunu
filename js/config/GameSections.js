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
    subtitle: 'Alsancak\'tan Kuşadası\'na, Selçuk\'a 6 durak',
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

export function getDefaultUnlockedSections() {
  return new Set(
    GAME_SECTIONS.filter((s) => s.defaultUnlocked).map((s) => s.id),
  );
}

export function getSectionById(id) {
  return GAME_SECTIONS.find((s) => s.id === id);
}
