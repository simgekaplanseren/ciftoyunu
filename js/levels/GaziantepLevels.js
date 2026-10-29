import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, loverPoint } from './levelUtils.js';
import {
  buildHayvanatLayout,
  buildIconovaLayout,
  buildPetParkLayout,
  buildSehitkamilLayout,
} from './levelBlueprints.js';

function createGaziantepLevel({ id, name, emoji, subtitle, themeLabel, completeMessage, atmosphere, width, buildLayout }) {
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
  name: 'EŞİK',
  emoji: '🏡',
  themeLabel: 'Yuva',
  subtitle: 'Yanında nefesin rahatlıyorsa, orada bir ev filizlenmiştir.',
  completeMessage: 'Güven, sevginin sessizce üzerine kurulduğu yerdir. Bir insan yanında kendini güvende hissediyorsa, bu onun kalbini sana emanet etmesidir.',
  atmosphere: 'hayvanat',
  width: 960,
  buildLayout: buildHayvanatLayout,
});

export const LEVEL_ICONOVA = createGaziantepLevel({
  id: 6,
  name: 'SICAK ODALAR',
  emoji: '🕯️',
  themeLabel: 'Yuva',
  subtitle: 'Söz, ancak evin içinde de aynı duruşla tutulunca gerçek olur.',
  completeMessage: '“Yanındayım” demek yetmez. Güven, verilen sözün ertesi gün de aynı yönde yürümesiyle kurulur. Kalp, güzel cümlelere değil, tutulan sözlere yaslanır.',
  atmosphere: 'iconova',
  width: 960,
  buildLayout: buildIconovaLayout,
});

export const LEVEL_PETPARK = createGaziantepLevel({
  id: 7,
  name: 'GÜVEN',
  emoji: '🤍',
  themeLabel: 'Yuva',
  subtitle: 'Huzur, gösterişte değil; sıradan bir günde de yanında kalmaktır.',
  completeMessage: 'Sadakat, yalnızca yanında görünmek değildir. Kimsenin bakmadığı bir yolda da ilişkinin ağırlığını taşımak ve kalbine başka kapı aralamamaktır.',
  atmosphere: 'petpark',
  width: 960,
  buildLayout: buildPetParkLayout,
});

export const LEVEL_SEHITKAMIL = createGaziantepLevel({
  id: 8,
  name: 'SADAKAT',
  emoji: '🌙',
  themeLabel: 'Yuva',
  subtitle: 'Yokluğunda da verdiğin söze sahip çık.',
  completeMessage: 'Sadakat, yokluğunda da sevgine ve verdiğin söze sahip çıkmaktır. Bir kalbin sana inanmasını hafife alma; o inanç, gecenin sessizliğinde de korunmak ister.',
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
