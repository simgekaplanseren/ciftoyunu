import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import {
  buildAlsancakLayout,
  buildKusadasiLayout,
  buildSirinceLayout,
  buildSelcukLayout,
} from './levelBlueprints.js';

function createIzmirLevel({ id, name, emoji, subtitle, atmosphere, width, buildLayout }) {
  return {
    id,
    name,
    emoji,
    subtitle,
    width,
    height: 270,
    theme: atmosphere,
    atmosphere,
    music: 'musicCave',
    spawn: spawnPoint(48),
    background: atmosphere,
    sectionId: 'izmir',

    build() {
      const data = buildLayout();
      const lp = loverPoint(data.finishX);
      data.lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });
      return data;
    },
  };
}

export const LEVEL_ALSANCAK = createIzmirLevel({
  id: 9,
  name: 'ALSANCAK',
  emoji: '🌊',
  subtitle: 'Kordon taş yolu — deniz boşluklarını zıpla',
  atmosphere: 'alsancak',
  width: 960,
  buildLayout: buildAlsancakLayout,
});

export const LEVEL_KUSADASI = createIzmirLevel({
  id: 14,
  name: 'KUŞADASI',
  emoji: '⛵',
  subtitle: 'Sahil yolu — iskele geçitleri, martı ve kayalık uçurum',
  atmosphere: 'kusadasi',
  width: 960,
  buildLayout: buildKusadasiLayout,
});

export const LEVEL_SIRINCE = createIzmirLevel({
  id: 12,
  name: 'ŞİRİNCE',
  emoji: '🍷',
  subtitle: 'Taş sokaklar — köprü, uçurum ve bağ arası dar geçitler',
  atmosphere: 'sirince',
  width: 1024,
  buildLayout: buildSirinceLayout,
});

export const LEVEL_SELCUK = createIzmirLevel({
  id: 13,
  name: 'SELÇUK',
  emoji: '🏛️',
  subtitle: 'Efes yolu — harabe geçitleri ve devrilmiş sütunlar',
  atmosphere: 'selcuk',
  width: 1024,
  buildLayout: buildSelcukLayout,
});

export const IZMIR_LEVELS = [
  LEVEL_ALSANCAK,
  LEVEL_KUSADASI,
  LEVEL_SIRINCE,
  LEVEL_SELCUK,
];
