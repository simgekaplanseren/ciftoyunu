import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import { buildDogumGunuLayout } from './levelBlueprints.js';

function createIstanbulLevel({ id, name, emoji, subtitle, atmosphere, width, buildLayout }) {
  return {
    id,
    name,
    emoji,
    subtitle,
    width,
    height: 270,
    theme: atmosphere,
    atmosphere,
    music: 'musicCastle',
    spawn: spawnPoint(48),
    background: atmosphere,
    sectionId: 'istanbul',
    isFinale: true,

    build() {
      const data = buildLayout();
      const lp = loverPoint(data.finishX);
      data.lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });
      return data;
    },
  };
}

export const LEVEL_DOGUMGUNU = createIstanbulLevel({
  id: 15,
  name: 'DOĞUM GÜNÜ',
  emoji: '🎂',
  subtitle: 'Boğaz kıyısında — deniz geçitlerini atla, sürprize ulaş',
  atmosphere: 'dogumgunu',
  width: 1080,
  buildLayout: buildDogumGunuLayout,
});

export const ISTANBUL_LEVELS = [LEVEL_DOGUMGUNU];
