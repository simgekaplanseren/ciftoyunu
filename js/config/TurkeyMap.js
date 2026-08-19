import {
  MAP_VIEW,
  MAP_CITY_COORDS,
  TURKEY_GEO_PATHS,
  CYPRUS_GEO_PATHS,
} from './TurkeyMapGeo.js';

/** Türkiye haritası bölgeleri — gerçek koordinatlardan */
export const MAP_REGIONS = [
  {
    id: 'istanbul',
    name: 'İSTANBUL',
    emoji: '🌉',
    x: MAP_CITY_COORDS.istanbul.x,
    y: MAP_CITY_COORDS.istanbul.y,
    defaultUnlocked: false,
  },
  {
    id: 'izmir',
    name: 'İZMİR',
    emoji: '🌊',
    x: MAP_CITY_COORDS.izmir.x,
    y: MAP_CITY_COORDS.izmir.y,
    defaultUnlocked: false,
  },
  {
    id: 'kusadasi',
    name: 'KUŞADASI',
    emoji: '⛵',
    x: MAP_CITY_COORDS.kusadasi.x,
    y: MAP_CITY_COORDS.kusadasi.y,
    defaultUnlocked: false,
  },
  {
    id: 'gaziantep',
    name: 'GAZİANTEP',
    emoji: '🌶️',
    x: MAP_CITY_COORDS.gaziantep.x,
    y: MAP_CITY_COORDS.gaziantep.y,
    defaultUnlocked: false,
  },
  {
    id: 'cyprus',
    name: 'KIBRIS',
    emoji: '🏝️',
    x: MAP_CITY_COORDS.cyprus.x,
    y: MAP_CITY_COORDS.cyprus.y,
    defaultUnlocked: true,
    levelsTitle: "KIBRIS'TAKİ SEVGİLİM",
    levelsEmoji: '🏝️❤️',
    levelFilter: 'cyprus',
  },
];

export { MAP_VIEW, TURKEY_GEO_PATHS, CYPRUS_GEO_PATHS, MAP_CITY_COORDS };

export function getDefaultUnlockedRegions() {
  return new Set(
    MAP_REGIONS.filter((r) => r.defaultUnlocked).map((r) => r.id),
  );
}

export function getRegionById(id) {
  return MAP_REGIONS.find((r) => r.id === id);
}
