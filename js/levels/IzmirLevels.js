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
  name: 'ALSANCAKTAYKEN',
  emoji: '🌊',
  subtitle: 'Kordon boyunca el ele yürüyüş',
  atmosphere: 'alsancak',
  width: 960,
  buildLayout: buildAlsancakLayout,
});

export const LEVEL_KUSADASI = createIzmirLevel({
  id: 14,
  name: "KUŞADASI'DAYKEN",
  emoji: '⛵',
  subtitle: 'Ege kıyısında güneş ve deniz',
  atmosphere: 'kusadasi',
  width: 960,
  buildLayout: buildKusadasiLayout,
});

export const LEVEL_SIRINCE = createIzmirLevel({
  id: 12,
  name: "ŞİRİNCE'DEYKEN",
  emoji: '🍷',
  subtitle: 'Taş evler arasında romantik kaçamak',
  atmosphere: 'sirince',
  width: 1024,
  buildLayout: buildSirinceLayout,
});

export const LEVEL_SELCUK = createIzmirLevel({
  id: 13,
  name: "SELÇUK'TAYKEN",
  emoji: '🏛️',
  subtitle: 'Efes yolunda son durak',
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
