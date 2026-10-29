import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import {
  buildLefkosaLayout,
  buildGirneLayout,
  buildMagusaLayout,
  buildDipkarpazLayout,
} from './levelBlueprints.js';

function createCyprusLevel({ id, name, emoji, subtitle, themeLabel, completeMessage, atmosphere, width, buildLayout }) {
  return {
    id,
    name,
    emoji,
    subtitle,
    themeLabel,
    completeMessage,
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
  name: 'İLK BAKIŞ',
  emoji: '💗',
  themeLabel: 'Kıvılcım',
  subtitle: 'Kalbin ilk kez başka biri için hızlanır.',
  completeMessage: 'Aşk, içini ısıtan bir kıpırtıyla başlar. Asıl mesele o kıpırtıyı bir hak gibi görmemek; önce karşındaki insanın kim olduğunu merak etmektir.',
  atmosphere: 'lefkosa',
  width: 960,
  buildLayout: buildLefkosaLayout,
});

export const LEVEL_GIRNE = createCyprusLevel({
  id: 2,
  name: 'KALP ÇARPINMASI',
  emoji: '💓',
  themeLabel: 'Kıvılcım',
  subtitle: 'Yaklaşmak, sahip olmak değil; dinlemeye razı olmaktır.',
  completeMessage: 'Birini sevmek, onu kendi hikâyene çekmek değildir. Acele etmeden yaklaş: ne taşıdığını öğrenerek.',
  atmosphere: 'girne',
  width: 960,
  buildLayout: buildGirneLayout,
});

export const LEVEL_MAGUSA = createCyprusLevel({
  id: 3,
  name: 'TANIŞMA',
  emoji: '🌸',
  themeLabel: 'Kıvılcım',
  subtitle: 'Sevgi, gördüğün sureti değil, insanın kendisini arar.',
  completeMessage: 'Herkesin bir dışı vardır. Aşk, o dışın hoşuna gitmesiyle yetinmez; insanın yorgunluğunu, korkusunu ve değerini de görmeye cesaret eder.',
  atmosphere: 'magusa',
  width: 960,
  buildLayout: buildMagusaLayout,
});

export const LEVEL_DIPKARPAZ = createCyprusLevel({
  id: 4,
  name: 'KIVILCIM',
  emoji: '✨',
  themeLabel: 'Kıvılcım',
  subtitle: 'Bir kalbe dokunmadan önce onun kıymetini bil.',
  completeMessage: 'Aşk, bir kalbe dokunmaktan önce o kalbin kıymetini bilmektir. Sevmek, birini ele geçirmek değil; ona zarar vermeden yanında durmayı öğrenmektir.',
  atmosphere: 'dipkarpaz',
  width: 1024,
  buildLayout: buildDipkarpazLayout,
});
