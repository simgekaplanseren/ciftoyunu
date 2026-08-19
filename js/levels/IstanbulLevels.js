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

function buildDogumGunuLayout() {
  const theme = 'dogumgunu';
  const platforms = [];
  const traps = [];
  const enemies = [];
  const collectibles = [];

  platforms.push(new Platform(0, platformY(0), 320, 40, theme));
  platforms.push(new Platform(384, platformY(0), 300, 40, theme));
  platforms.push(new Platform(728, platformY(0), 320, 40, theme));
  platforms.push(new Platform(360, platformY(34), 68, 14, theme));
  platforms.push(new Platform(180, platformY(50), 60, 14, theme));
  platforms.push(new Platform(820, platformY(42), 64, 14, theme));
  platforms.push(new Platform(520, platformY(58), 72, 14, theme));

  addTrap(traps, 320, 64);
  addTrap(traps, 684, 44);

  enemies.push(new Enemy(260, enemyY(), 24, 20, {
    type: 'slime', patrolMin: 200, patrolMax: 380, speed: 30,
  }));
  enemies.push(new Enemy(560, enemyY(), 24, 20, {
    type: 'walker', patrolMin: 420, patrolMax: 640, speed: 32,
  }));

  collectibles.push(new Collectible(200, platformY(50) - 16, 'heart', 10));
  collectibles.push(new Collectible(380, platformY(34) - 16, 'heart', 10));
  collectibles.push(new Collectible(540, platformY(58) - 16, 'heart', 10));
  collectibles.push(new Collectible(600, platformY() - 16, 'heart', 10));
  collectibles.push(new Collectible(880, platformY(42) - 16, 'heart', 10));

  return { platforms, traps, enemies, collectibles, boss: null, bossTriggerX: null };
}

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
      const lp = loverPoint(width - 60);
      data.lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });
      return data;
    },
  };
}

export const LEVEL_DOGUMGUNU = createIstanbulLevel({
  id: 15,
  name: 'DOĞUM GÜNÜNDEYKEN',
  emoji: '🎂',
  subtitle: 'İstanbul\'da en güzel sürpriz — iyi ki doğdun',
  atmosphere: 'dogumgunu',
  width: 1080,
  buildLayout: buildDogumGunuLayout,
});

export const ISTANBUL_LEVELS = [LEVEL_DOGUMGUNU];
