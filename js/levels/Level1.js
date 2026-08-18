import { Platform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';
import { Trap } from '../entities/Trap.js';
import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, groundTop, enemyY, platformY, loverPoint, trapPoint } from './levelUtils.js';

export const LEVEL1 = {
  id: 1,
  name: 'AŞK ORMANI',
  emoji: '🌳❤️',
  subtitle: 'Ormanda sevgilini aramaya başla',
  width: 2000,
  height: 270,
  theme: 'forest',
  music: 'musicForest',
  spawn: spawnPoint(48),
  background: 'forest',

  build() {
    const platforms = [];
    const traps = [];
    const enemies = [];
    const collectibles = [];

    const grounds = [
      [0, 360], [424, 300], [788, 260], [1112, 280], [1440, 320], [1800, 200],
    ];
    for (const [gx, gw] of grounds) {
      platforms.push(new Platform(gx, groundTop(), gw, 40, 'forest'));
    }

    platforms.push(new Platform(364, platformY(36), 72, 14, 'forest'));
    platforms.push(new Platform(728, platformY(28), 68, 14, 'forest'));
    platforms.push(new Platform(1052, platformY(32), 72, 14, 'forest'));
    platforms.push(new Platform(1388, platformY(40), 64, 14, 'forest'));
    platforms.push(new Platform(520, platformY(70), 80, 14, 'forest'));
    platforms.push(new Platform(680, platformY(90), 64, 14, 'forest'));
    platforms.push(new Platform(900, platformY(75), 72, 14, 'forest'));
    platforms.push(new Platform(1200, platformY(85), 80, 14, 'forest'));

    for (const [tx, tw] of [[360, 64], [724, 64], [1048, 64], [1384, 64]]) {
      const t = trapPoint(tx, tw);
      traps.push(new Trap(t.x, t.y, t.width, t.height));
    }

    enemies.push(new Enemy(520, enemyY(), 24, 20, { type: 'slime', patrolMin: 440, patrolMax: 680, speed: 32 }));
    enemies.push(new Enemy(900, enemyY(), 24, 20, { type: 'walker', patrolMin: 820, patrolMax: 1020, speed: 38 }));
    enemies.push(new Enemy(1250, enemyY(), 24, 20, { type: 'slime', patrolMin: 1140, patrolMax: 1360, speed: 35 }));
    enemies.push(new Enemy(1580, enemyY(), 24, 20, { type: 'walker', patrolMin: 1460, patrolMax: 1720, speed: 40 }));
    enemies.push(new Enemy(920, platformY(75) - 16, 24, 16, {
      type: 'bat', patrolMin: 880, patrolMax: 980, speed: 35, flyAmplitude: 10,
    }));

    for (const [hx, hy] of [
      [120, platformY() - 16], [400, platformY(36) - 16], [560, platformY(70) - 16],
      [750, platformY(28) - 16], [980, platformY(75) - 16], [1150, platformY(32) - 16],
      [1280, platformY(85) - 16], [1520, platformY() - 16], [1720, platformY() - 16],
    ]) {
      collectibles.push(new Collectible(hx, hy, 'heart', 10));
    }

    const lp = loverPoint(1940);
    const lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });

    return { platforms, traps, enemies, collectibles, lover, boss: null, bossTriggerX: null };
  },
};
