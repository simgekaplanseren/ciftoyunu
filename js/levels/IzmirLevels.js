import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import {
  buildAlsancakLayout,
  buildKusadasiLayout,
  buildSirinceLayout,
  buildSelcukLayout,
} from './levelBlueprints.js';

function createIzmirLevel({ id, name, emoji, subtitle, themeLabel, completeMessage, atmosphere, width, buildLayout }) {
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
  name: 'ÖZEN',
  emoji: '🌷',
  themeLabel: 'İncelik',
  subtitle: 'Sevdiğin insanın duygusu, senin haklılığından daha ağır basabilir.',
  completeMessage: 'Sevgi, karşındaki insanın kalbini kendi kalbin kadar değerli bilmektir. Onun üzüntüsünü küçümsemek, aşkı kendi rahatına indirmektir.',
  atmosphere: 'alsancak',
  width: 960,
  buildLayout: buildAlsancakLayout,
});

export const LEVEL_KUSADASI = createIzmirLevel({
  id: 14,
  name: 'ÇİÇEK BAHÇESİ',
  emoji: '💐',
  themeLabel: 'İncelik',
  subtitle: 'Sınır, uzaklaşmak değil; bir kalbin nasıl tutulacağını öğretmektir.',
  completeMessage: 'Saygı, sevdiğin insanın sınırını duymak ve onu aşmamaktır. İstediğin her şeyi almak aşk değildir; durması gereken yerde durabilmektir.',
  atmosphere: 'kusadasi',
  width: 960,
  buildLayout: buildKusadasiLayout,
});

export const LEVEL_SIRINCE = createIzmirLevel({
  id: 12,
  name: 'İNCE SÖZ',
  emoji: '💌',
  themeLabel: 'İncelik',
  subtitle: 'Sevgi, özel bir sahnede değil; küçük bir hatırlayışta da durur.',
  completeMessage: 'Aşk yalnızca hissedilen değil, her gün davranışlarınla yaşattığın bir şeydir. Küçük bir özen, büyük bir sözden daha çok yer tutar.',
  atmosphere: 'sirince',
  width: 1024,
  buildLayout: buildSirinceLayout,
});

export const LEVEL_SELCUK = createIzmirLevel({
  id: 13,
  name: 'EMEK',
  emoji: '🤲',
  themeLabel: 'İncelik',
  subtitle: 'Değer bilmek, sözle değil günlük duruşla belli olur.',
  completeMessage: 'Güzel sözler bir kalbi etkileyebilir; emek ve dürüstlük ise o kalbin sana güvenmesini sağlar. Özen göstermek, karşındakini yanılmamaktır.',
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
