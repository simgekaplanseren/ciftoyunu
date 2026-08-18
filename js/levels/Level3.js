import { Platform, MovingPlatform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';
import { Trap } from '../entities/Trap.js';
import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, enemyY, platformY, loverPoint, trapPoint } from './levelUtils.js';

export const LEVEL3 = {
  id: 3,
  name: 'KALBİN KALESİ',
  emoji: '🏰❤️',
  subtitle: 'Sevgilinin seni beklediği son durak',
  width: 2600,
  height: 270,
  theme: 'castle',
  music: 'musicCastle',
  spawn: spawnPoint(48),
  background: 'castle',

  build() {
    const platforms = [];
    const traps = [];
    const enemies = [];
    const collectibles = [];

    const grounds = [
      [0, 300], [364, 260], [688, 240], [992, 260], [1300, 280], [1640, 320], [2000, 600],
    ];
    for (const [gx, gw] of grounds) {
      platforms.push(new Platform(gx, platformY(0), gw, 40, 'castle'));
    }

    platforms.push(new Platform(304, platformY(32), 68, 14, 'castle'));
    platforms.push(new Platform(628, platformY(28), 72, 14, 'castle'));
    platforms.push(new Platform(932, platformY(34), 68, 14, 'castle'));
    platforms.push(new Platform(1240, platformY(30), 72, 14, 'castle'));
    platforms.push(new MovingPlatform(720, platformY(55), 60, 14, 720, platformY(88), 0.4, 'castle'));
    platforms.push(new MovingPlatform(1080, platformY(58), 64, 14, 1080, platformY(92), 0.38, 'castle'));
    platforms.push(new Platform(760, platformY(90), 56, 14, 'castle'));
    platforms.push(new Platform(1120, platformY(95), 60, 14, 'castle'));
    platforms.push(new Platform(1680, platformY(45), 80, 14, 'castle'));
    platforms.push(new Platform(1880, platformY(70), 64, 14, 'castle'));

    for (const [tx, tw] of [[300, 64], [624, 64], [928, 64], [1236, 64], [1580, 60], [1960, 40]]) {
      const t = trapPoint(tx, tw);
      traps.push(new Trap(t.x, t.y, t.width, t.height));
    }

    enemies.push(new Enemy(420, enemyY(), 24, 20, { type: 'walker', patrolMin: 380, patrolMax: 580, speed: 48 }));
    enemies.push(new Enemy(780, enemyY(), 24, 20, { type: 'slime', patrolMin: 700, patrolMax: 920, speed: 42 }));
    enemies.push(new Enemy(1080, enemyY(), 24, 20, { type: 'walker', patrolMin: 1000, patrolMax: 1240, speed: 50 }));
    enemies.push(new Enemy(1400, enemyY(), 24, 20, { type: 'bat', patrolMin: 1320, patrolMax: 1580, speed: 55, flyAmplitude: 14 }));
    enemies.push(new Enemy(1750, enemyY(), 24, 20, { type: 'slime', patrolMin: 1660, patrolMax: 1920, speed: 45 }));

    collectibles.push(new Collectible(660, platformY(28) - 16, 'heart', 10));
    collectibles.push(new Collectible(1140, platformY(95) - 16, 'heart', 10));
    collectibles.push(new Collectible(400, platformY() - 16, 'heart', 10));
    collectibles.push(new Collectible(1480, platformY() - 16, 'heart', 10));
    collectibles.push(new Collectible(1720, platformY(45) - 16, 'heart', 10));
    collectibles.push(new Collectible(2100, platformY() - 16, 'heart', 10));

    const lp = loverPoint(2520);
    const lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });

    return { platforms, traps, enemies, collectibles, lover, boss: null, bossTriggerX: null };
  },
};
