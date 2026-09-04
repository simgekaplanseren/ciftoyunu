import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import {
  buildHayvanatLayout,
  buildIconovaLayout,
  buildPetParkLayout,
  buildSehitkamilLayout,
} from './levelBlueprints.js';

function createGaziantepLevel({ id, name, emoji, subtitle, atmosphere, width, buildLayout }) {
  return {
    id,
    name,
    emoji,
    subtitle,
    width,
    height: 270,
    theme: atmosphere,
    atmosphere,
    music: 'musicForest',
    spawn: spawnPoint(48),
    background: atmosphere,
    sectionId: 'gaziantep',

    build() {
      const data = buildLayout();
      const lp = loverPoint(data.finishX);
      data.lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });
      return data;
    },
  };
}

export const LEVEL_HAYVANAT = createGaziantepLevel({
  id: 5,
  name: 'HAYVANAT BAHÇESİ',
  emoji: '🦁',
  subtitle: 'Hayvanları gez, çit atla — papağan aviary\'de kuşu bekle',
  atmosphere: 'hayvanat',
  width: 960,
  buildLayout: buildHayvanatLayout,
});

export const LEVEL_ICONOVA = createGaziantepLevel({
  id: 6,
  name: 'İCONOVA',
  emoji: '🛍️',
  subtitle: 'Asansör, skybridge — güvenlik devriyesinden kaç',
  atmosphere: 'iconova',
  width: 960,
  buildLayout: buildIconovaLayout,
});

export const LEVEL_PETPARK = createGaziantepLevel({
  id: 7,
  name: 'PET PARK',
  emoji: '🐾',
  subtitle: 'Düz park yolu — çukur atla, köpeklerden kaç',
  atmosphere: 'petpark',
  width: 960,
  buildLayout: buildPetParkLayout,
});

export const LEVEL_SEHITKAMIL = createGaziantepLevel({
  id: 8,
  name: 'ŞEHİTKAMİL',
  emoji: '🌆',
  subtitle: 'Gece sokakları — hayaletlerden kaç, yarasa boşluğunu bekle',
  atmosphere: 'sehitkamil',
  width: 1024,
  buildLayout: buildSehitkamilLayout,
});

export const GAZIANTEP_LEVELS = [
  LEVEL_HAYVANAT,
  LEVEL_ICONOVA,
  LEVEL_PETPARK,
  LEVEL_SEHITKAMIL,
];
