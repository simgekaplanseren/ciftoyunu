import { Platform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';
import { Trap } from '../entities/Trap.js';
import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, enemyY, platformY, loverPoint, trapPoint } from './levelUtils.js';

function addTrap(traps, x, width) {
  const t = trapPoint(x, width);
  traps.push(new Trap(t.x, t.y, t.width, t.height));
}

function buildAlsancakLayout() {
  const theme = 'alsancak';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 300, 40, theme));
  platforms.push(new Platform(364, platformY(0), 280, 40, theme));
  platforms.push(new Platform(688, platformY(0), 272, 40, theme));
  platforms.push(new Platform(340, platformY(32), 64, 14, theme));
  platforms.push(new Platform(160, platformY(48), 56, 14, theme));

  addTrap(traps, 300, 64);
  addTrap(traps, 644, 44);

  enemies.push(new Enemy(420, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 360, patrolMax: 580, speed: 34,
  }));
  enemies.push(new Enemy(780, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 700, patrolMax: 880, speed: 32,
  }));

  collectibles.push(new Collectible(150, platformY(48) - 16, 'heart', 10));
  collectibles.push(new Collectible(360, platformY(32) - 16, 'heart', 10));
  collectibles.push(new Collectible(540, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(820, platformY() - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildGoztepeLayout() {
  const theme = 'goztepe';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 280, 40, theme));
  platforms.push(new Platform(344, platformY(0), 260, 40, theme));
  platforms.push(new Platform(668, platformY(0), 292, 40, theme));
  platforms.push(new Platform(320, platformY(34), 68, 14, theme));
  platforms.push(new Platform(720, platformY(42), 60, 14, theme));

  addTrap(traps, 280, 64);
  addTrap(traps, 604, 64);

  enemies.push(new Enemy(200, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 120, patrolMax: 300, speed: 34,
  }));
  enemies.push(new Enemy(500, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 360, patrolMax: 560, speed: 36,
  }));

  collectibles.push(new Collectible(340, platformY(34) - 16, 'heart', 10));
  collectibles.push(new Collectible(480, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(740, platformY(42) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildGaziemirLayout() {
  const theme = 'gaziemir';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 260, 40, theme));
  platforms.push(new Platform(324, platformY(0), 300, 40, theme));
  platforms.push(new Platform(668, platformY(0), 292, 40, theme));
  platforms.push(new Platform(300, platformY(30), 72, 14, theme));
  platforms.push(new Platform(120, platformY(46), 64, 14, theme));

  addTrap(traps, 260, 64);
  addTrap(traps, 624, 44);

  enemies.push(new Enemy(180, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 100, patrolMax: 280, speed: 36,
  }));
  enemies.push(new Enemy(480, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 340, patrolMax: 560, speed: 34,
  }));
  enemies.push(new Enemy(820, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 740, patrolMax: 920, speed: 38,
  }));

  collectibles.push(new Collectible(140, platformY(46) - 16, 'heart', 10));
  collectibles.push(new Collectible(330, platformY(30) - 16, 'heart', 10));
  collectibles.push(new Collectible(560, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(800, platformY() - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildKusadasiLayout() {
  const theme = 'kusadasi';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 280, 40, theme));
  platforms.push(new Platform(344, platformY(0), 280, 40, theme));
  platforms.push(new Platform(668, platformY(0), 292, 40, theme));
  platforms.push(new Platform(320, platformY(34), 68, 14, theme));
  platforms.push(new Platform(140, platformY(50), 60, 14, theme));
  platforms.push(new Platform(760, platformY(40), 64, 14, theme));

  addTrap(traps, 280, 64);
  addTrap(traps, 624, 44);

  enemies.push(new Enemy(200, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 120, patrolMax: 300, speed: 34,
  }));
  enemies.push(new Enemy(500, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 360, patrolMax: 560, speed: 32,
  }));
  enemies.push(new Enemy(820, platformY(40) - 16, 24, 16, {
    type: 'bat', patrolMin: 740, patrolMax: 900, speed: 36, flyAmplitude: 10,
  }));

  collectibles.push(new Collectible(160, platformY(50) - 16, 'heart', 10));
  collectibles.push(new Collectible(340, platformY(34) - 16, 'heart', 10));
  collectibles.push(new Collectible(560, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(790, platformY(40) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildSirinceLayout() {
  const theme = 'sirince';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 300, 40, theme));
  platforms.push(new Platform(364, platformY(0), 280, 40, theme));
  platforms.push(new Platform(688, platformY(0), 272, 40, theme));
  platforms.push(new Platform(340, platformY(36), 68, 14, theme));
  platforms.push(new Platform(160, platformY(52), 60, 14, theme));
  platforms.push(new Platform(760, platformY(44), 56, 14, theme));

  addTrap(traps, 300, 64);
  addTrap(traps, 644, 44);

  enemies.push(new Enemy(240, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 160, patrolMax: 340, speed: 34,
  }));
  enemies.push(new Enemy(520, enemyY(), 24, 20, {
    type: 'bat', patrolMin: 460, patrolMax: 640, speed: 38, flyAmplitude: 10,
  }));

  collectibles.push(new Collectible(180, platformY(52) - 16, 'heart', 10));
  collectibles.push(new Collectible(360, platformY(36) - 16, 'heart', 10));
  collectibles.push(new Collectible(580, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(780, platformY(44) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildSelcukLayout() {
  const theme = 'selcuk';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 320, 40, theme));
  platforms.push(new Platform(384, platformY(0), 300, 40, theme));
  platforms.push(new Platform(728, platformY(0), 296, 40, theme));
  platforms.push(new Platform(360, platformY(38), 68, 14, theme));
  platforms.push(new Platform(180, platformY(50), 60, 14, theme));

  addTrap(traps, 320, 64);
  addTrap(traps, 684, 44);

  enemies.push(new Enemy(260, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 180, patrolMax: 380, speed: 38,
  }));
  enemies.push(new Enemy(560, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 420, patrolMax: 640, speed: 36,
  }));
  enemies.push(new Enemy(860, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 780, patrolMax: 960, speed: 40,
  }));

  collectibles.push(new Collectible(200, platformY(50) - 16, 'heart', 10));
  collectibles.push(new Collectible(380, platformY(38) - 16, 'heart', 10));
  collectibles.push(new Collectible(600, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(850, platformY() - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

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
      const lp = loverPoint(width - 60);
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

export const LEVEL_GOZTEPE = createIzmirLevel({
  id: 10,
  name: "GÖZTEPE'DEYKEN",
  emoji: '🏟️',
  subtitle: 'Şehrin kalbinde birlikte',
  atmosphere: 'goztepe',
  width: 960,
  buildLayout: buildGoztepeLayout,
});

export const LEVEL_GAZIEMIR = createIzmirLevel({
  id: 11,
  name: "GAZİEMİR'DEYKEN",
  emoji: '🚆',
  subtitle: 'Banliyö hatlarında aşk yolculuğu',
  atmosphere: 'gaziemir',
  width: 960,
  buildLayout: buildGaziemirLayout,
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
  LEVEL_GOZTEPE,
  LEVEL_GAZIEMIR,
  LEVEL_KUSADASI,
  LEVEL_SIRINCE,
  LEVEL_SELCUK,
];
