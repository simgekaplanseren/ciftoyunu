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

function buildHayvanatLayout() {
  const theme = 'hayvanat';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 300, 40, theme));
  platforms.push(new Platform(364, platformY(0), 280, 40, theme));
  platforms.push(new Platform(688, platformY(0), 272, 40, theme));
  platforms.push(new Platform(340, platformY(34), 64, 14, theme));
  platforms.push(new Platform(160, platformY(50), 56, 14, theme));

  addTrap(traps, 300, 64);
  addTrap(traps, 644, 44);

  enemies.push(new Enemy(420, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 360, patrolMax: 580, speed: 32,
  }));
  enemies.push(new Enemy(780, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 700, patrolMax: 880, speed: 34,
  }));

  collectibles.push(new Collectible(150, platformY(50) - 16, 'heart', 10));
  collectibles.push(new Collectible(360, platformY(34) - 16, 'heart', 10));
  collectibles.push(new Collectible(520, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(820, platformY() - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildIconovaLayout() {
  const theme = 'iconova';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 280, 40, theme));
  platforms.push(new Platform(344, platformY(0), 260, 40, theme));
  platforms.push(new Platform(668, platformY(0), 292, 40, theme));
  platforms.push(new Platform(320, platformY(36), 68, 14, theme));
  platforms.push(new Platform(720, platformY(44), 60, 14, theme));

  addTrap(traps, 280, 64);
  addTrap(traps, 604, 64);

  enemies.push(new Enemy(200, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 120, patrolMax: 300, speed: 36,
  }));
  enemies.push(new Enemy(500, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 360, patrolMax: 560, speed: 34,
  }));
  enemies.push(new Enemy(820, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 700, patrolMax: 900, speed: 38,
  }));

  collectibles.push(new Collectible(340, platformY(36) - 16, 'heart', 10));
  collectibles.push(new Collectible(480, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(740, platformY(44) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildPetParkLayout() {
  const theme = 'petpark';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 260, 40, theme));
  platforms.push(new Platform(324, platformY(0), 300, 40, theme));
  platforms.push(new Platform(668, platformY(0), 292, 40, theme));
  platforms.push(new Platform(300, platformY(32), 72, 14, theme));
  platforms.push(new Platform(120, platformY(48), 64, 14, theme));

  addTrap(traps, 260, 64);
  addTrap(traps, 624, 44);

  enemies.push(new Enemy(180, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 100, patrolMax: 280, speed: 36,
  }));
  enemies.push(new Enemy(480, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 340, patrolMax: 560, speed: 36,
  }));

  collectibles.push(new Collectible(140, platformY(48) - 16, 'heart', 10));
  collectibles.push(new Collectible(330, platformY(32) - 16, 'heart', 10));
  collectibles.push(new Collectible(560, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(800, platformY() - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildSehitkamilLayout() {
  const theme = 'sehitkamil';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 320, 40, theme));
  platforms.push(new Platform(384, platformY(0), 300, 40, theme));
  platforms.push(new Platform(728, platformY(0), 296, 40, theme));
  platforms.push(new Platform(360, platformY(38), 68, 14, theme));
  platforms.push(new Platform(180, platformY(52), 60, 14, theme));
  platforms.push(new Platform(820, platformY(40), 64, 14, theme));

  addTrap(traps, 320, 64);
  addTrap(traps, 684, 44);

  enemies.push(new Enemy(240, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 160, patrolMax: 360, speed: 38,
  }));
  enemies.push(new Enemy(540, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 400, patrolMax: 620, speed: 36,
  }));
  enemies.push(new Enemy(860, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 780, patrolMax: 960, speed: 40,
  }));

  collectibles.push(new Collectible(200, platformY(52) - 16, 'heart', 10));
  collectibles.push(new Collectible(380, platformY(38) - 16, 'heart', 10));
  collectibles.push(new Collectible(600, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(850, platformY(40) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

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
      const lp = loverPoint(width - 60);
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
