import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import {
  buildLefkosaLayout,
  buildGirneLayout,
  buildMagusaLayout,
  buildDipkarpazLayout,
} from './levelBlueprints.js';

function createCyprusLevel({ id, name, emoji, subtitle, atmosphere, width, buildLayout }) {
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
    sectionId: 'cyprus',

    build() {
      const data = buildLayout();
      const lp = loverPoint(data.finishX);
      data.lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });
      return data;
    },
  };
}

export const LEVEL_LEFKOSA = createCyprusLevel({
  id: 1,
  name: 'LEFKOŞA',
  emoji: '🏛️',
  subtitle: "Başkentte sevgiline doğru ilk adım",
  atmosphere: 'lefkosa',
  width: 960,
  buildLayout: buildLefkosaLayout,
});

export const LEVEL_GIRNE = createCyprusLevel({
  id: 2,
  name: 'GİRNE',
  emoji: '⚓',
  subtitle: 'Liman kenarında yoluna devam et',
  atmosphere: 'girne',
  width: 960,
  buildLayout: buildGirneLayout,
});

export const LEVEL_MAGUSA = createCyprusLevel({
  id: 3,
  name: 'GAZİMAĞUSA',
  emoji: '🏰',
  subtitle: 'Surların ardında sevgilini ara',
  atmosphere: 'magusa',
  width: 960,
  buildLayout: buildMagusaLayout,
});

export const LEVEL_DIPKARPAZ = createCyprusLevel({
  id: 4,
  name: 'DİPKARPAZ',
  emoji: '🌅',
  subtitle: 'Doğu ucu — sonunda kavuşacaksınız',
  atmosphere: 'dipkarpaz',
  width: 1024,
  buildLayout: buildDipkarpazLayout,
});
