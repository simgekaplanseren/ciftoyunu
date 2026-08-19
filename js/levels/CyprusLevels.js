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

function buildLefkosaLayout() {
  const theme = 'lefkosa';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 320, 40, theme));
  platforms.push(new Platform(384, platformY(0), 280, 40, theme));
  platforms.push(new Platform(704, platformY(0), 240, 40, theme));
  platforms.push(new Platform(360, platformY(32), 64, 14, theme));
  platforms.push(new Platform(560, platformY(48), 56, 14, theme));
  platforms.push(new Platform(820, platformY(36), 68, 14, theme));

  addTrap(traps, 320, 64);
  addTrap(traps, 664, 40);

  enemies.push(new Enemy(460, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 400, patrolMax: 620, speed: 32,
  }));
  enemies.push(new Enemy(780, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 720, patrolMax: 900, speed: 34,
  }));

  collectibles.push(new Collectible(140, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(400, platformY(32) - 16, 'heart', 10));
  collectibles.push(new Collectible(580, platformY(48) - 16, 'heart', 10));
  collectibles.push(new Collectible(860, platformY(36) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildGirneLayout() {
  const theme = 'girne';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 280, 40, theme));
  platforms.push(new Platform(344, platformY(0), 260, 40, theme));
  platforms.push(new Platform(668, platformY(0), 276, 40, theme));
  platforms.push(new Platform(320, platformY(34), 68, 14, theme));
  platforms.push(new Platform(140, platformY(55), 56, 14, theme));
  platforms.push(new Platform(720, platformY(42), 64, 14, theme));

  addTrap(traps, 280, 64);
  addTrap(traps, 604, 64);

  enemies.push(new Enemy(200, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 120, patrolMax: 300, speed: 36,
  }));
  enemies.push(new Enemy(480, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 360, patrolMax: 560, speed: 34,
  }));
  enemies.push(new Enemy(820, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 700, patrolMax: 880, speed: 38,
  }));

  collectibles.push(new Collectible(160, platformY(55) - 16, 'heart', 10));
  collectibles.push(new Collectible(340, platformY(34) - 16, 'heart', 10));
  collectibles.push(new Collectible(520, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(760, platformY(42) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildMagusaLayout() {
  const theme = 'magusa';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 260, 40, theme));
  platforms.push(new Platform(324, platformY(0), 280, 40, theme));
  platforms.push(new Platform(668, platformY(0), 276, 40, theme));
  platforms.push(new Platform(300, platformY(30), 72, 14, theme));
  platforms.push(new Platform(100, platformY(48), 64, 14, theme));
  platforms.push(new Platform(760, platformY(42), 56, 14, theme));

  addTrap(traps, 260, 64);
  addTrap(traps, 604, 64);

  enemies.push(new Enemy(180, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 100, patrolMax: 280, speed: 38,
  }));
  enemies.push(new Enemy(460, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 340, patrolMax: 560, speed: 36,
  }));
  enemies.push(new Enemy(780, platformY(42) - 16, 24, 16, {
    type: 'bat', patrolMin: 720, patrolMax: 880, speed: 40, flyAmplitude: 12,
  }));

  collectibles.push(new Collectible(120, platformY(48) - 16, 'heart', 10));
  collectibles.push(new Collectible(330, platformY(30) - 16, 'heart', 10));
  collectibles.push(new Collectible(540, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(790, platformY(42) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

function buildDipkarpazLayout() {
  const theme = 'dipkarpaz';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 300, 40, theme));
  platforms.push(new Platform(364, platformY(0), 300, 40, theme));
  platforms.push(new Platform(728, platformY(0), 296, 40, theme));
  platforms.push(new Platform(340, platformY(36), 68, 14, theme));
  platforms.push(new Platform(160, platformY(50), 60, 14, theme));
  platforms.push(new Platform(820, platformY(44), 64, 14, theme));

  addTrap(traps, 300, 64);
  addTrap(traps, 664, 64);

  enemies.push(new Enemy(220, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 160, patrolMax: 340, speed: 38,
  }));
  enemies.push(new Enemy(520, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 380, patrolMax: 600, speed: 36,
  }));
  enemies.push(new Enemy(860, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 780, patrolMax: 960, speed: 40,
  }));

  collectibles.push(new Collectible(180, platformY(50) - 16, 'heart', 10));
  collectibles.push(new Collectible(360, platformY(36) - 16, 'heart', 10));
  collectibles.push(new Collectible(580, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(850, platformY(44) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

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
      const lp = loverPoint(width - 60);
      data.lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });
      return data;
    },
  };
}

export const LEVEL_LEFKOSA = createCyprusLevel({
  id: 1,
  name: "LEFKOŞA'DAYKEN",
  emoji: '🏛️',
  subtitle: "Başkentte sevgiline doğru ilk adım",
  atmosphere: 'lefkosa',
  width: 960,
  buildLayout: buildLefkosaLayout,
});

export const LEVEL_GIRNE = createCyprusLevel({
  id: 2,
  name: "GİRNE'DEYKEN",
  emoji: '⚓',
  subtitle: 'Liman kenarında yoluna devam et',
  atmosphere: 'girne',
  width: 960,
  buildLayout: buildGirneLayout,
});

export const LEVEL_MAGUSA = createCyprusLevel({
  id: 3,
  name: "GAZİMAĞUSA'DAYKEN",
  emoji: '🏰',
  subtitle: 'Surların ardında sevgilini ara',
  atmosphere: 'magusa',
  width: 960,
  buildLayout: buildMagusaLayout,
});

export const LEVEL_DIPKARPAZ = createCyprusLevel({
  id: 4,
  name: "DİPKARPAZ'DAYKEN",
  emoji: '🌅',
  subtitle: 'Doğu ucu — sonunda kavuşacaksınız',
  atmosphere: 'dipkarpaz',
  width: 1024,
  buildLayout: buildDipkarpazLayout,
});
