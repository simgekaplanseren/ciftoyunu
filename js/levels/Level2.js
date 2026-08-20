import { Platform, MovingPlatform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';
import { Trap } from '../entities/Trap.js';
import { LoverNPC } from '../entities/LoverNPC.js';
import { spawnPoint, enemyY, platformY, loverPoint, trapPoint } from './levelUtils.js';

export const LEVEL2 = {
  id: 5,
  name: 'KARANLIK MAĞARA',
  emoji: '🌑',
  subtitle: 'Mağarada sevgilini bul',
  width: 2400,
  height: 270,
  theme: 'cave',
  music: 'musicCave',
  spawn: spawnPoint(48),
  background: 'cave',

  build() {
    const platforms = [];
    const traps = [];
    const enemies = [];
    const collectibles = [];

    const grounds = [
      [0, 320], [384, 280], [728, 240], [1024, 260], [1336, 280], [1680, 300], [2040, 360],
    ];
    for (const [gx, gw] of grounds) {
      platforms.push(new Platform(gx, platformY(0), gw, 40, 'cave'));
    }

    platforms.push(new Platform(324, platformY(34), 68, 14, 'cave'));
    platforms.push(new Platform(668, platformY(30), 72, 14, 'cave'));
    platforms.push(new Platform(964, platformY(36), 68, 14, 'cave'));
    platforms.push(new Platform(1276, platformY(32), 72, 14, 'cave'));
    platforms.push(new Platform(1620, platformY(38), 68, 14, 'cave'));
    platforms.push(new MovingPlatform(780, platformY(55), 64, 14, 780, platformY(90), 0.35, 'cave'));
    platforms.push(new MovingPlatform(1150, platformY(60), 60, 14, 1150, platformY(95), 0.4, 'cave'));
    platforms.push(new MovingPlatform(1480, platformY(58), 64, 14, 1480, platformY(88), 0.38, 'cave'));
    platforms.push(new Platform(820, platformY(95), 56, 14, 'cave'));
    platforms.push(new Platform(1180, platformY(100), 64, 14, 'cave'));
    platforms.push(new Platform(1520, platformY(92), 56, 14, 'cave'));

    for (const [tx, tw] of [[320, 64], [664, 64], [960, 64], [1272, 64], [1616, 64]]) {
      const t = trapPoint(tx, tw);
      traps.push(new Trap(t.x, t.y, t.width, t.height));
    }

    enemies.push(new Enemy(460, enemyY(), 24, 20, { type: 'walker', patrolMin: 400, patrolMax: 620, speed: 42 }));
    enemies.push(new Enemy(820, enemyY(), 24, 20, { type: 'slime', patrolMin: 740, patrolMax: 940, speed: 38 }));
    enemies.push(new Enemy(1100, enemyY(), 24, 20, { type: 'walker', patrolMin: 1040, patrolMax: 1240, speed: 45 }));
    enemies.push(new Enemy(1420, enemyY(), 24, 20, { type: 'slime', patrolMin: 1340, patrolMax: 1560, speed: 40 }));
    enemies.push(new Enemy(1760, enemyY(), 24, 20, { type: 'bat', patrolMin: 1700, patrolMax: 1980, speed: 50, flyAmplitude: 12 }));

    collectibles.push(new Collectible(280, platformY() - 16, 'heart', 10));
    collectibles.push(new Collectible(560, platformY(34) - 16, 'heart', 10));
    collectibles.push(new Collectible(850, platformY(95) - 16, 'heart', 10));
    collectibles.push(new Collectible(1220, platformY(100) - 16, 'heart', 10));
    collectibles.push(new Collectible(1560, platformY(92) - 16, 'heart', 10));
    collectibles.push(new Collectible(1900, platformY() - 16, 'heart', 10));
    collectibles.push(new Collectible(840, platformY(55) - 16, 'key', 50));

    const photoPieces = [
      new Collectible(500, platformY(34) - 20, 'photo', 30),
      new Collectible(1190, platformY(60) - 20, 'photo', 30),
      new Collectible(1540, platformY(58) - 20, 'photo', 30),
    ];
    photoPieces.forEach((p, i) => { p.index = i; collectibles.push(p); });

    const lp = loverPoint(2340);
    const lover = new LoverNPC(lp.x, lp.y, { triggerX: lp.triggerX });

    return { platforms, traps, enemies, collectibles, lover, boss: null, bossTriggerX: null };
  },
};
