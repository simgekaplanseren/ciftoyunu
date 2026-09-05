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
    .gap(140, 'water')
    .gapPit()
    .gapFerry({ width: 72, theme: 'concrete' })
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

/** Hayvan gezintisi — çit atla, tek papağan aviary boşluğu */
export function buildHayvanatLayout() {
  const b = new LevelBuilder('hayvanat');
  return b
    .ground(0, 400)
    .heart(160, 0)
    .groundEnemy(240, { type: 'turtle', speed: 20, patrolMin: 180, patrolMax: 360 })
    .heart(340, 0)
    .gap()
    .nextGround(360)
    .groundEnemy(560, { type: 'slime', speed: 24, patrolMin: 500, patrolMax: 720 })
    .heart(680, 0)
    .gap().gapBird()
    .nextGround(380)
    .heart(920, 0)
    .groundEnemy(1040, { type: 'turtle', speed: 18, patrolMin: 980, patrolMax: 1180 })
    .secretKey('k3', 1120, 0)
    .gap()
    .nextGround(360)
    .heart(1420, 0)
    .finish()
    .build();
}

/** AVM — asansör + skybridge, güvenlik devriyesi */
export function buildIconovaLayout() {
  const b = new LevelBuilder('iconova');
  return b
    .ground(0, 360)
    .heart(140, 0)
    .groundEnemy(300, { type: 'walker', speed: 28, patrolMin: 240, patrolMax: 340 })
    .gap(120, 'spike')
    .gapPit()
    .gapFerry({ width: 72, bobSpeed: 0.18, theme: 'concrete' })
    .nextGround(40)
    .jumpGap(248)
    .movingPlatH(520, 198, 68, 700, 0.26)
    .nextGround(52)
    .heart(790, 0)
    .gap()
    .nextGround(360)
    .groundEnemy(860, { type: 'walker', speed: 32, patrolMin: 800, patrolMax: 980 })
    .jumpGap(120)
    .gapFerry({ width: 72, theme: 'concrete' })
    .nextGround(380)
    .groundEnemy(1180, { type: 'walker', speed: 30, patrolMin: 1120, patrolMax: 1380 })
    .heart(1340, 0)
    .gap()
    .nextGround(360)
    .groundEnemy(1520, { type: 'walker', speed: 34, patrolMin: 1460, patrolMax: 1680 })
    .heart(1680, 0)
    .finish()
    .build();
}

/** Pet park — düz yürüyüş yolu, çukur ve çit */
export function buildPetParkLayout() {
  const b = new LevelBuilder('petpark');
  return b
    .ground(0, 420)
    .heart(200, 0)
    .groundEnemy(320, { type: 'walker', speed: 22, patrolMin: 260, patrolMax: 400 })
    .jumpGap()
    .nextGround(380)
    .heart(580, 0)
    .gap()
    .nextGround(400)
    .heart(800, 0)
    .groundEnemy(960, { type: 'walker', speed: 26, patrolMin: 900, patrolMax: 1080 })
    .jumpGap()
    .nextGround(420)
    .heart(1180, 0)
    .gap()
    .nextGround(400)
    .heart(1420, 0)
    .finish()
    .build();
}

/** Gece sokağı — düz yürüyüş, hayalet devriyesi, tek yarasa boşluğu */
export function buildSehitkamilLayout() {
  const b = new LevelBuilder('sehitkamil');
  return b
    .ground(0, 420)
    .heart(140, 0)
    .groundEnemy(260, { type: 'ghost', speed: 18, patrolMin: 200, patrolMax: 380 })
    .jumpGap()
    .nextGround(380)
    .heart(520, 0)
    .groundEnemy(640, { type: 'walker', speed: 24, patrolMin: 580, patrolMax: 760 })
    .gap()
    .nextGround(400)
    .heart(840, 0)
    .gap().gapBird({ type: 'bat', elevation: 52, flyAmplitude: 30, speed: 14 })
    .nextGround(360)
    .groundEnemy(980, { type: 'ghost', speed: 20, patrolMin: 920, patrolMax: 1100 })
    .secretKey('k4', 1040, 0)
    .heart(1080, 0)
    .jumpGap()
    .nextGround(400)
    .groundEnemy(1240, { type: 'walker', speed: 26, patrolMin: 1180, patrolMax: 1380 })
    .heart(1360, 0)
    .gap()
    .nextGround(380)
    .heart(1580, 0)
    .finish()
    .build();
}

/* ─── İZMİR ─── */

export function buildAlsancakLayout() {
  const b = new LevelBuilder('alsancak');
  return b
    .ground(0, 420)
    .heart(140, 0)
    .groundEnemy(260, { type: 'walker', speed: 28, patrolMin: 200, patrolMax: 380 })
    .gap(56, 'water')
    .nextGround(360)
    .heart(480, 0)
    .groundEnemy(580, { type: 'crab', speed: 36, patrolMin: 520, patrolMax: 720 })
    .jumpGap()
    .nextGround(380)
    .heart(720, 0)
    .gap(56, 'water')
    .nextGround(400)
    .groundEnemy(900, { type: 'walker', speed: 30, patrolMin: 840, patrolMax: 1060 })
    .heart(1020, 0)
    .jumpGap()
    .gap(56, 'water')
    .nextGround(380)
    .groundEnemy(1180, { type: 'crab', speed: 38, patrolMin: 1120, patrolMax: 1340 })
    .heart(1320, 0)
    .finish()
    .build();
}

export function buildKusadasiLayout() {
  const b = new LevelBuilder('kusadasi');
  return b
    .ground(0, 420)
    .groundEnemy(140, { type: 'crab', speed: 42, patrolMin: 80, patrolMax: 320 })
    .heart(200, 0)
    .gap(56, 'water')
    .nextGround(340)
    .groundEnemy(460, { type: 'crab', speed: 44, patrolMin: 400, patrolMax: 620 })
    .heart(540, 0)
    .gap(140, 'water')
    .gapPit()
    .gapFerry({ width: 72, theme: 'concrete' })
    .nextGround(360)
    .groundEnemy(680, { type: 'crab', speed: 46, patrolMin: 620, patrolMax: 820 })
    .heart(760, 0)
    .jumpGap()
    .nextGround(360)
    .groundEnemy(880, { type: 'crab', speed: 44, patrolMin: 820, patrolMax: 1020 })
    .gap(56, 'water').gapBird({ type: 'bird', elevation: 48, flyAmplitude: 28, speed: 14 })
    .nextGround(340)
    .groundEnemy(1040, { type: 'crab', speed: 48, patrolMin: 980, patrolMax: 1180 })
    .secretKey('k6', 1120, 0)
    .heart(1160, 0)
    .gap(140, 'water')
    .gapPit()
    .gapFerry({ width: 72, theme: 'concrete' })
    .nextGround(360)
    .groundEnemy(1340, { type: 'crab', speed: 50, patrolMin: 1280, patrolMax: 1480 })
    .heart(1440, 0)
    .finish()
    .build();
}

export function buildSirinceLayout() {
  const b = new LevelBuilder('sirince');
  return b
    .ground(0, 420)
    .heartHere(140)
    .groundEnemyHere(240, { type: 'jumper', speed: 24, jumpInterval: 2.0 })
    .groundEnemyHere(340, { type: 'turtle', speed: 20 })
    .jumpGap()
    .nextGround(360)
    .heartHere(80)
    .groundEnemyHere(200, { type: 'jumper', speed: 26, jumpInterval: 1.8 })
    .gap()
    .nextGround(340)
    .groundEnemyHere(180, { type: 'turtle', speed: 22 })
    .gap(120, 'spike')
    .gapPit()
    .gapFerry({ width: 72, theme: 'concrete' })
    .nextGround(360)
    .secretKeyHere('k5', 220)
    .heartHere(80)
    .groundEnemyHere(160, { type: 'jumper', speed: 28, jumpInterval: 1.7 })
    .groundEnemyHere(280, { type: 'turtle', speed: 24 })
    .jumpGap()
    .nextGround(380)
    .heartHere(100)
    .gap().gapBird({ type: 'bird', elevation: 46, flyAmplitude: 26, speed: 13 })
    .nextGround(340)
    .groundEnemyHere(180, { type: 'jumper', speed: 30, jumpInterval: 1.6 })
    .gap()
    .nextGround(360)
    .groundEnemyHere(200, { type: 'turtle', speed: 26 })
    .heartHere(280)
    .finish()
    .build();
}

export function buildSelcukLayout() {
  const b = new LevelBuilder('selcuk');
  return b
    .ground(0, 420)
    .groundEnemy(140, { type: 'turtle', speed: 18, patrolMin: 80, patrolMax: 340 })
    .heart(200, 0)
    .gap()
    .nextGround(360)
    .groundEnemy(480, { type: 'turtle', speed: 20, patrolMin: 420, patrolMax: 640 })
    .heart(580, 0)
    .jumpGap()
    .nextGround(380)
    .groundEnemy(760, { type: 'charger', speed: 26, chargeSpeed: 110, patrolMin: 700, patrolMax: 920 })
    .gap()
    .nextGround(400)
    .groundEnemy(960, { type: 'charger', speed: 28, chargeSpeed: 120, patrolMin: 900, patrolMax: 1120 })
    .heart(1060, 0)
    .jumpGap()
    .nextGround(380)
    .groundEnemy(1240, { type: 'turtle', speed: 22, patrolMin: 1180, patrolMax: 1360 })
    .gap()
    .nextGround(360)
    .groundEnemy(1400, { type: 'charger', speed: 30, chargeSpeed: 125, patrolMin: 1340, patrolMax: 1520 })
    .heart(1520, 0)
    .finish()
    .build();
}

/* ─── İSTANBUL ─── */

export function buildDogumGunuLayout() {
  const b = new LevelBuilder('dogumgunu');
  return b
    .ground(0, 380)
    .heartHere(100)
    .groundEnemyHere(220, { type: 'walker', speed: 20 })
    .gap(140, 'water')
    .gapPit()
    .gapFerry({ width: 72, theme: 'concrete' })
    .nextGround(280)
    .heartHere(80)
    .jumpGap()
    .nextGround(300)
    .heartHere(100)
    .groundEnemyHere(200, { type: 'crab', speed: 34 })
    .gap(56, 'water')
    .nextGround(320)
    .secretKeyHere('k7', 180)
    .heartHere(260)
    .gap(56, 'water')
    .nextGround(340)
    .heartHere(120)
    .finish()
    .build();
}
