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
  name: 'HAYVANAT BAHÇESİNDEYKEN',
  emoji: '🦁',
  subtitle: 'Hayvanlarla dolu bir gün, birlikte',
  atmosphere: 'hayvanat',
  width: 960,
  buildLayout: buildHayvanatLayout,
});

export const LEVEL_ICONOVA = createGaziantepLevel({
  id: 6,
  name: "İCONOVA'DAYKEN",
  emoji: '🛍️',
  subtitle: 'AVM macerasında el ele',
  atmosphere: 'iconova',
  width: 960,
  buildLayout: buildIconovaLayout,
});

export const LEVEL_PETPARK = createGaziantepLevel({
  id: 7,
  name: "PET PARK'TAYKEN",
  emoji: '🐾',
  subtitle: 'Patili dostlarla geçen mutlu anlar',
  atmosphere: 'petpark',
  width: 960,
  buildLayout: buildPetParkLayout,
});

export const LEVEL_SEHITKAMIL = createGaziantepLevel({
  id: 8,
  name: "ŞEHİTKAMİL'DEYKEN",
  emoji: '🌆',
  subtitle: 'Gaziantep gecesi, sevgilinle',
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
