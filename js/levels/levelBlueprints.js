import { LevelBuilder } from './levelDesign.js';

/* ─── KIBRIS ─── */

export function buildLefkosaLayout() {
  const b = new LevelBuilder('lefkosa');
  return b
    .ground(0, 360)
    .groundEnemy(160, { type: 'walker', patrolMin: 100, patrolMax: 340, speed: 28 })
    .heart(280, 0)
    .gap()
    .nextGround(300)
    .groundEnemy(480, { type: 'slime', patrolMin: 440, patrolMax: 680, speed: 24 })
    .heart(560, 0)
    .gap()
    .nextGround(320)
    .groundEnemy(820, { type: 'walker', patrolMin: 780, patrolMax: 1020, speed: 30 })
    .heart(900, 0)
    .gap()
    .nextGround(340)
    .groundEnemy(1220, { type: 'slime', patrolMin: 1160, patrolMax: 1420, speed: 26 })
    .heart(1400, 0)
    .gap()
    .nextGround(360)
    .groundEnemy(1600, { type: 'walker', patrolMin: 1550, patrolMax: 1780, speed: 32 })
    .heart(1700, 0)
    .finish()
    .build();
}

export function buildGirneLayout() {
  const b = new LevelBuilder('girne');
  return b
    .ground(0, 320)
    .groundEnemy(120, { type: 'crab', patrolMin: 60, patrolMax: 300, speed: 40 })
    .gap(56, 'water')
    .nextGround(280)
    .movingPlat(420, 0, 68, 38, 0.4)
    .heart(440, 38)
    .groundEnemy(480, { type: 'crab', patrolMin: 440, patrolMax: 680, speed: 42 })
    .gap(56, 'water')
    .nextGround(300)
    .groundEnemy(820, { type: 'crab', patrolMin: 780, patrolMax: 1020, speed: 42 })
    .secretKey('k1', 760, 0)
    .plat(880, 28, 72).heart(905, 28)
    .gap(56, 'water')
    .nextGround(320)
    .movingPlatH(1100, 198, 56, 1260, 0.32)
    .groundEnemy(1180, { type: 'crab', patrolMin: 1080, patrolMax: 1340, speed: 42 })
    .gap(56, 'water')
    .nextGround(340)
    .groundEnemy(1520, { type: 'crab', patrolMin: 1460, patrolMax: 1720, speed: 42 })
    .heart(1620, 0)
    .finish()
    .build();
}

export function buildMagusaLayout() {
  const b = new LevelBuilder('magusa');
  return b
    .ground(0, 400)
    .heart(120, 0)
    .groundEnemy(180, { type: 'slime', patrolMin: 80, patrolMax: 360, speed: 22 })
    .groundEnemy(320, { type: 'jumper', patrolMin: 280, patrolMax: 380, speed: 22, jumpInterval: 2.4 })
    .jumpGap()
    .nextGround(400)
    .groundEnemy(640, { type: 'charger', patrolMin: 600, patrolMax: 820, speed: 28, chargeSpeed: 115 })
    .secretKey('k8', 820, 0)
    .heart(720, 0)
    .jumpGap()
    .nextGround(380)
    .groundEnemy(980, { type: 'jumper', patrolMin: 920, patrolMax: 1200, speed: 26, jumpInterval: 2.2 })
    .heart(1050, 0)
    .jumpGap()
    .gapMovingPlat(14, 32, 50, 0.38)
    .nextGround(400)
    .groundEnemy(1480, { type: 'charger', patrolMin: 1420, patrolMax: 1680, speed: 30, chargeSpeed: 128 })
    .heart(1560, 0)
    .jumpGap()
    .nextGround(400)
    .groundEnemy(1880, { type: 'jumper', patrolMin: 1840, patrolMax: 2060, speed: 24 })
    .heart(1980, 0)
    .finish()
    .build();
}

export function buildDipkarpazLayout() {
  const b = new LevelBuilder('dipkarpaz');
  return b
    .ground(0, 340)
    .groundEnemy(140, { type: 'crab', patrolMin: 80, patrolMax: 320, speed: 44 })
    .gap(56, 'water')
    .nextGround(300)
    .groundEnemy(440, { type: 'turtle', patrolMin: 400, patrolMax: 640, speed: 20 })
    .plat(500, 28, 80).heart(525, 28)
    .gap(56, 'water')
    .nextGround(320)
    .groundEnemy(820, { type: 'crab', patrolMin: 760, patrolMax: 1000, speed: 42 })
    .movingPlat(880, 0, 64, 38, 0.36)
    .secretKey('k2', 1020, 0)
    .gap(56, 'water')
    .nextGround(340)
    .groundEnemy(1180, { type: 'turtle', patrolMin: 1140, patrolMax: 1380, speed: 22 })
    .plat(1240, 32, 76).heart(1265, 32)
    .gap(56, 'water')
    .nextGround(360)
    .groundEnemy(1580, { type: 'crab', patrolMin: 1540, patrolMax: 1780, speed: 40 })
    .groundEnemy(1640, { type: 'turtle', patrolMin: 1580, patrolMax: 1820, speed: 24 })
    .heart(1720, 0)
    .finish()
    .build();
}

/* ─── GAZİANTEP ─── */

export function buildHayvanatLayout() {
  const b = new LevelBuilder('hayvanat');
  return b
    .ground(0, 480)
    .heart(200, 0)
    .skyBirdFill(3)
    .gap().gapBird()
    .nextGround(460)
    .heart(680, 0)
    .skyBirdFill(2)
    .gap().gapBird()
    .nextGround(440)
    .secretKey('k3', 1200, 0)
    .heart(1320, 0)
    .skyBirdFill(2)
    .gap().gapBird()
    .nextGround(460)
    .heart(1820, 0)
    .finish()
    .build();
}

/** AVM — hareketli platformlar, az süs kuşu */
export function buildIconovaLayout() {
  const b = new LevelBuilder('iconova');
  return b
    .ground(0, 300)
    .heart(140, 0)
    .gap().gapBird()
    .nextGround(280)
    .movingPlat(500, 0, 72, 36, 0.34)
    .heart(520, 36)
    .gap().gapBird()
    .nextGround(300)
    .movingPlatH(820, 198, 64, 1020, 0.3)
    .heart(900, 0)
    .gap().gapBird({ speed: 16 })
    .nextGround(320)
    .movingPlat(1180, 0, 68, 30, 0.38)
    .heart(1200, 30)
    .movingPlatH(1320, 198, 56, 1480, 0.28)
    .heart(1380, 0)
    .finish()
    .build();
}

/** Pet park — çimen yol, çukur ve ahşap köprü */
export function buildPetParkLayout() {
  const b = new LevelBuilder('petpark');
  return b
    .ground(0, 380)
    .heart(140, 0)
    .skyBirdFill(2)
    .jumpGap().gapBird()
    .nextGround(320)
    .heart(500, 0)
    .gap().gapBird()
    .nextGround(340)
    .heart(820, 0)
    .jumpGap()
    .gapMovingPlat(6, 22, 50, 0.32, 'petpark_wood')
    .gapBird()
    .nextGround(360)
    .skyBirdFill(2)
    .heart(1380, 0)
    .finish()
    .build();
}

/** Gece finalesi — karışık boşluklar, hızlı kuş, anahtar */
export function buildSehitkamilLayout() {
  const b = new LevelBuilder('sehitkamil');
  return b
    .ground(0, 320)
    .heart(120, 0)
    .gap().gapBird()
    .nextGround(300)
    .jumpGap().gapBird()
    .nextGround(320)
    .heart(660, 0)
    .movingPlatH(840, 198, 56, 1000, 0.3)
    .gap().gapBird({ speed: 16 })
    .nextGround(340)
    .secretKey('k4', 1120, 0)
    .heart(1020, 0)
    .jumpGap().gapBird({ speed: 16 })
    .nextGround(360)
    .gap().gapBird({ speed: 18 })
    .heart(1540, 0)
    .finish()
    .build();
}

/* ─── İZMİR ─── */

export function buildAlsancakLayout() {
  const b = new LevelBuilder('alsancak');
  return b
    .ground(0, 360)
    .groundEnemy(140, { type: 'walker', patrolMin: 80, patrolMax: 340, speed: 32 })
    .heart(260, 0)
    .gap(56, 'water')
    .nextGround(320)
    .groundEnemy(460, { type: 'crab', patrolMin: 420, patrolMax: 680, speed: 40 })
    .plat(520, 26, 80).heart(545, 26)
    .gap(56, 'water')
    .nextGround(340)
    .movingPlatH(820, 198, 56, 980, 0.32)
    .groundEnemy(900, { type: 'walker', patrolMin: 800, patrolMax: 1080, speed: 34 })
    .gap(56, 'water')
    .nextGround(360)
    .groundEnemy(1240, { type: 'crab', patrolMin: 1200, patrolMax: 1440, speed: 42 })
    .plat(1300, 28, 76).heart(1325, 28)
    .gap(56, 'water')
    .nextGround(380)
    .groundEnemy(1580, { type: 'walker', patrolMin: 1540, patrolMax: 1780, speed: 36 })
    .heart(1680, 0)
    .finish()
    .build();
}

export function buildKusadasiLayout() {
  const b = new LevelBuilder('kusadasi');
  return b
    .ground(0, 340)
    .groundEnemy(120, { type: 'crab', patrolMin: 60, patrolMax: 320, speed: 44 })
    .gap(56, 'water')
    .nextGround(300)
    .movingPlat(440, 0, 68, 40, 0.4)
    .heart(480, 40)
    .gap(56, 'water')
    .nextGround(320)
    .groundEnemy(800, { type: 'crab', patrolMin: 760, patrolMax: 1000, speed: 42 })
    .plat(860, 28, 80).heart(885, 28)
    .groundEnemy(920, { type: 'crab', patrolMin: 760, patrolMax: 1040, speed: 42 })
    .gap(56, 'water')
    .nextGround(340)
    .movingPlat(1180, 0, 64, 36, 0.38)
    .groundEnemy(1240, { type: 'crab', patrolMin: 1180, patrolMax: 1420, speed: 40 })
    .gap(56, 'water')
    .nextGround(360)
    .groundEnemy(1580, { type: 'crab', patrolMin: 1540, patrolMax: 1780, speed: 40 })
    .secretKey('k6', 1580, 0)
    .heart(1680, 0)
    .finish()
    .build();
}

export function buildSirinceLayout() {
  const b = new LevelBuilder('sirince');
  return b
    .ground(0, 560)
    .plat(80, 24, 64)
    .plat(200, 40, 64).heart(220, 40)
    .plat(320, 52, 64)
    .groundEnemy(420, { type: 'jumper', patrolMin: 380, patrolMax: 500, speed: 24, jumpInterval: 2.2 })
    .gap()
    .nextGround(380)
    .groundEnemy(720, { type: 'turtle', patrolMin: 640, patrolMax: 900, speed: 20 })
    .secretKey('k5', 820, 0)
    .plat(780, 26, 80).heart(805, 26)
    .gap()
    .nextGround(400)
    .movingPlat(1100, 0, 64, 36, 0.36)
    .groundEnemy(1180, { type: 'jumper', patrolMin: 1060, patrolMax: 1300, speed: 28 })
    .plat(1260, 28, 80).heart(1285, 28)
    .gap()
    .nextGround(420)
    .plat(1520, 22, 64)
    .plat(1620, 38, 64)
    .plat(1720, 52, 64).heart(1740, 52)
    .groundEnemy(1780, { type: 'turtle', patrolMin: 1480, patrolMax: 1820, speed: 22 })
    .heart(1880, 0)
    .finish()
    .build();
}

export function buildSelcukLayout() {
  const b = new LevelBuilder('selcuk');
  return b
    .ground(0, 340)
    .groundEnemy(120, { type: 'turtle', patrolMin: 60, patrolMax: 320, speed: 18 })
    .gap()
    .nextGround(300)
    .groundEnemy(480, { type: 'turtle', patrolMin: 400, patrolMax: 640, speed: 20 })
    .plat(540, 28, 80).heart(565, 28)
    .gap()
    .nextGround(320)
    .groundEnemy(800, { type: 'charger', patrolMin: 760, patrolMax: 1000, speed: 28, chargeSpeed: 120 })
    .movingPlat(860, 0, 64, 38, 0.38)
    .gap()
    .nextGround(340)
    .groundEnemy(1180, { type: 'turtle', patrolMin: 1140, patrolMax: 1380, speed: 22 })
    .plat(1240, 30, 76).heart(1265, 30)
    .groundEnemy(1300, { type: 'charger', patrolMin: 1240, patrolMax: 1500, speed: 30, chargeSpeed: 130 })
    .gap()
    .nextGround(360)
    .groundEnemy(1600, { type: 'turtle', patrolMin: 1560, patrolMax: 1800, speed: 24 })
    .heart(1700, 0)
    .finish()
    .build();
}

/* ─── İSTANBUL ─── */

export function buildDogumGunuLayout() {
  const b = new LevelBuilder('dogumgunu');
  return b
    .ground(0, 420)
    .heart(120, 0).heart(200, 0).heart(280, 0)
    .plat(360, 22, 80).heart(385, 22)
    .groundEnemy(360, { type: 'slime', patrolMin: 80, patrolMax: 380, speed: 16 })
    .gap()
    .nextGround(360)
    .heart(520, 0).heart(600, 0)
    .plat(660, 26, 80).heart(685, 26)
    .flyOver(700, 0, { type: 'bee', patrolMin: 480, patrolMax: 760, speed: 30, flyAmplitude: 10 })
    .gap()
    .nextGround(380)
    .heart(880, 0).heart(960, 0).heart(1040, 0)
    .plat(1100, 24, 80).heart(1125, 24)
    .secretKey('k7', 1180, 0)
    .groundEnemy(1160, { type: 'ghost', patrolMin: 880, patrolMax: 1200, speed: 18, flying: true, flyAmplitude: 12 })
    .heart(1280, 0)
    .finish()
    .build();
}
