import { LevelBuilder } from './levelDesign.js';

/*
  Tasarım kuralları:
  - Düşmanlar zeminde devriye veya geniş platformda (≥72px)
  - Küçük platformlar = sadece kalp / geçiş, düşmansız
  - Dikenli boşluk üstü = uçan düşman veya düşmansız
  - Boşluk max 56px
  - Düşman devriyesi boşluktan en az 40px önce bitsin
  - Platform varsa altında zemin yolu da olsun
*/

/* ─── KIBRIS ─── */

export function buildLefkosaLayout() {
  const b = new LevelBuilder('lefkosa');
  return b
    .ground(0, 360)
    .groundEnemy(160, { type: 'walker', patrolMin: 100, patrolMax: 340, speed: 28 })
    .heart(280, 0)
    .gap(360)
    .ground(416, 300)
    .plat(460, 26, 80).heart(490, 26)
    .groundEnemy(520, { type: 'slime', patrolMin: 420, patrolMax: 680, speed: 24 })
    .gap(716)
    .ground(772, 320)
    .groundEnemy(820, { type: 'walker', patrolMin: 780, patrolMax: 1020, speed: 30 })
    .plat(880, 28, 72).heart(905, 28)
    .gap(1092)
    .ground(1148, 340)
    .flyOver(1180, 0, { type: 'bat', patrolMin: 1140, patrolMax: 1360, speed: 32, flyAmplitude: 14 })
    .groundEnemy(1220, { type: 'slime', patrolMin: 1160, patrolMax: 1420, speed: 26 })
    .movingPlat(1260, 0, 64, 34, 0.36)
    .heart(1280, 34)
    .gap(1488)
    .ground(1544, 360)
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
    .gap(320)
    .ground(376, 280)
    .flyOver(400, 0, { type: 'bat', patrolMin: 360, patrolMax: 580, speed: 36, flyAmplitude: 16 })
    .movingPlat(420, 0, 68, 38, 0.4)
    .heart(440, 38)
    .gap(656)
    .ground(712, 300)
    .groundEnemy(760, { type: 'bee', patrolMin: 720, patrolMax: 960, speed: 48, flying: true, flyAmplitude: 12 })
    .plat(820, 30, 76).heart(845, 30)
    .gap(1012)
    .ground(1068, 320)
    .movingPlatH(1100, 198, 56, 1260, 0.32)
    .flyOver(1120, 0, { type: 'bee', patrolMin: 1070, patrolMax: 1320, speed: 50, flyAmplitude: 18 })
    .groundEnemy(1180, { type: 'crab', patrolMin: 1080, patrolMax: 1340, speed: 42 })
    .gap(1388)
    .ground(1444, 340)
    .flyOver(1480, 0, { type: 'bat', patrolMin: 1440, patrolMax: 1680, speed: 38, flyAmplitude: 20 })
    .groundEnemy(1520, { type: 'bee', patrolMin: 1460, patrolMax: 1720, speed: 46, flying: true, flyAmplitude: 14 })
    .heart(1620, 0)
    .finish()
    .build();
}

export function buildMagusaLayout() {
  const b = new LevelBuilder('magusa');
  return b
    // Güvenli giriş — zemin yolu açık, platform isteğe bağlı kalp
    .ground(0, 520)
    .heart(200, 0)
    .plat(280, 22, 80).heart(305, 22)
    .groundEnemy(400, { type: 'jumper', patrolMin: 360, patrolMax: 480, speed: 22, jumpInterval: 2.4 })
    .gap(520)
    .ground(576, 400)
    .groundEnemy(640, { type: 'charger', patrolMin: 600, patrolMax: 820, speed: 28, chargeSpeed: 115 })
    .plat(720, 26, 80).heart(745, 26)
    .gap(976)
    .ground(1032, 380)
    .movingPlat(1080, 0, 64, 36, 0.36)
    .groundEnemy(1160, { type: 'jumper', patrolMin: 1040, patrolMax: 1280, speed: 26 })
    .plat(1240, 28, 80).heart(1265, 28)
    .gap(1412)
    .ground(1468, 400)
    .groundEnemy(1530, { type: 'charger', patrolMin: 1480, patrolMax: 1720, speed: 30, chargeSpeed: 128 })
    .flyOver(1580, 0, { type: 'bat', patrolMin: 1470, patrolMax: 1740, speed: 32, flyAmplitude: 12 })
    .plat(1640, 24, 80).heart(1665, 24)
    .gap(1760)
    .ground(1816, 400)
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
    .gap(340)
    .ground(396, 300)
    .groundEnemy(440, { type: 'turtle', patrolMin: 400, patrolMax: 640, speed: 20 })
    .plat(500, 28, 80).heart(525, 28)
    .gap(696)
    .ground(752, 320)
    .flyOver(780, 0, { type: 'ghost', patrolMin: 740, patrolMax: 980, speed: 26, flyAmplitude: 16 })
    .groundEnemy(820, { type: 'crab', patrolMin: 760, patrolMax: 1000, speed: 42 })
    .movingPlat(880, 0, 64, 38, 0.36)
    .gap(1072)
    .ground(1128, 340)
    .groundEnemy(1180, { type: 'turtle', patrolMin: 1140, patrolMax: 1380, speed: 22 })
    .plat(1240, 32, 76).heart(1265, 32)
    .flyOver(1280, 0, { type: 'ghost', patrolMin: 1130, patrolMax: 1420, speed: 28, flyAmplitude: 18 })
    .gap(1468)
    .ground(1524, 360)
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
    .ground(0, 380)
    .groundEnemy(120, { type: 'jumper', patrolMin: 60, patrolMax: 360, speed: 24, jumpInterval: 1.9 })
    .heart(260, 0)
    .gap(380)
    .ground(436, 320)
    .groundEnemy(480, { type: 'crab', patrolMin: 440, patrolMax: 700, speed: 46 })
    .plat(540, 26, 80).heart(565, 26)
    .gap(756)
    .ground(812, 340)
    .groundEnemy(860, { type: 'turtle', patrolMin: 820, patrolMax: 1060, speed: 20 })
    .movingPlat(920, 0, 68, 36, 0.35)
    .heart(940, 36)
    .gap(1152)
    .ground(1208, 360)
    .groundEnemy(1260, { type: 'jumper', patrolMin: 1220, patrolMax: 1460, speed: 26 })
    .plat(1320, 30, 76).heart(1345, 30)
    .groundEnemy(1380, { type: 'crab', patrolMin: 1320, patrolMax: 1580, speed: 44 })
    .gap(1548)
    .ground(1604, 380)
    .groundEnemy(1660, { type: 'turtle', patrolMin: 1620, patrolMax: 1860, speed: 22 })
    .heart(1760, 0)
    .finish()
    .build();
}

export function buildIconovaLayout() {
  const b = new LevelBuilder('iconova');
  return b
    .ground(0, 340)
    .flyOver(160, 0, { type: 'ghost', patrolMin: 80, patrolMax: 340, speed: 24, flyAmplitude: 14 })
    .gap(340)
    .ground(396, 300)
    .movingPlat(440, 0, 64, 36, 0.42)
    .groundEnemy(520, { type: 'charger', patrolMin: 400, patrolMax: 680, speed: 28, chargeSpeed: 115 })
    .heart(560, 36)
    .gap(696)
    .ground(752, 320)
    .movingPlatH(780, 198, 56, 960, 0.3)
    .flyOver(820, 0, { type: 'ghost', patrolMin: 760, patrolMax: 1020, speed: 26, flyAmplitude: 16 })
    .groundEnemy(880, { type: 'walker', patrolMin: 760, patrolMax: 1040, speed: 34 })
    .plat(940, 28, 80).heart(965, 28)
    .gap(1092)
    .ground(1148, 340)
    .groundEnemy(1200, { type: 'charger', patrolMin: 1160, patrolMax: 1400, speed: 30, chargeSpeed: 128 })
    .movingPlat(1260, 0, 60, 40, 0.38)
    .flyOver(1280, 0, { type: 'ghost', patrolMin: 1140, patrolMax: 1440, speed: 28, flyAmplitude: 18 })
    .gap(1488)
    .ground(1544, 360)
    .groundEnemy(1600, { type: 'walker', patrolMin: 1560, patrolMax: 1800, speed: 36 })
    .heart(1700, 0)
    .finish()
    .build();
}

export function buildPetParkLayout() {
  const b = new LevelBuilder('petpark');
  return b
    .ground(0, 360)
    .groundEnemy(100, { type: 'crab', patrolMin: 40, patrolMax: 340, speed: 42 })
    .groundEnemy(200, { type: 'slime', patrolMin: 160, patrolMax: 400, speed: 22 })
    .heart(280, 0)
    .gap(360)
    .ground(416, 320)
    .plat(460, 26, 80).heart(485, 26)
    .flyOver(500, 0, { type: 'bee', patrolMin: 420, patrolMax: 680, speed: 46, flyAmplitude: 14 })
    .groundEnemy(540, { type: 'crab', patrolMin: 420, patrolMax: 700, speed: 44 })
    .gap(736)
    .ground(792, 340)
    .groundEnemy(840, { type: 'slime', patrolMin: 800, patrolMax: 1040, speed: 24 })
    .movingPlat(900, 0, 68, 34, 0.36)
    .heart(920, 34)
    .gap(1132)
    .ground(1188, 360)
    .flyOver(1220, 0, { type: 'bee', patrolMin: 1180, patrolMax: 1420, speed: 48, flyAmplitude: 16 })
    .groundEnemy(1260, { type: 'crab', patrolMin: 1200, patrolMax: 1460, speed: 40 })
    .plat(1320, 28, 76).heart(1345, 28)
    .gap(1468)
    .ground(1524, 380)
    .groundEnemy(1580, { type: 'slime', patrolMin: 1540, patrolMax: 1780, speed: 26 })
    .heart(1680, 0)
    .finish()
    .build();
}

export function buildSehitkamilLayout() {
  const b = new LevelBuilder('sehitkamil');
  return b
    .ground(0, 340)
    .groundEnemy(120, { type: 'ghost', patrolMin: 60, patrolMax: 320, speed: 26, flying: true, flyAmplitude: 12 })
    .gap(340)
    .ground(396, 300)
    .groundEnemy(440, { type: 'jumper', patrolMin: 400, patrolMax: 640, speed: 28 })
    .plat(500, 28, 80).heart(525, 28)
    .gap(696)
    .ground(752, 320)
    .groundEnemy(800, { type: 'turtle', patrolMin: 760, patrolMax: 1000, speed: 20 })
    .movingPlat(860, 0, 64, 38, 0.38)
    .flyOver(880, 0, { type: 'ghost', patrolMin: 740, patrolMax: 1020, speed: 24, flyAmplitude: 16 })
    .gap(1072)
    .ground(1128, 340)
    .groundEnemy(1180, { type: 'jumper', patrolMin: 1140, patrolMax: 1380, speed: 30 })
    .plat(1240, 32, 76).heart(1265, 32)
    .groundEnemy(1300, { type: 'turtle', patrolMin: 1240, patrolMax: 1500, speed: 22 })
    .gap(1468)
    .ground(1524, 360)
    .groundEnemy(1580, { type: 'ghost', patrolMin: 1540, patrolMax: 1780, speed: 28, flying: true, flyAmplitude: 14 })
    .groundEnemy(1640, { type: 'jumper', patrolMin: 1600, patrolMax: 1840, speed: 32 })
    .heart(1720, 0)
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
    .gap(360)
    .ground(416, 320)
    .groundEnemy(460, { type: 'crab', patrolMin: 420, patrolMax: 680, speed: 40 })
    .plat(520, 26, 80).heart(545, 26)
    .gap(736)
    .ground(792, 340)
    .movingPlatH(820, 198, 56, 980, 0.32)
    .flyOver(860, 0, { type: 'bee', patrolMin: 800, patrolMax: 1060, speed: 44, flyAmplitude: 14 })
    .groundEnemy(900, { type: 'walker', patrolMin: 800, patrolMax: 1080, speed: 34 })
    .gap(1132)
    .ground(1188, 360)
    .groundEnemy(1240, { type: 'crab', patrolMin: 1200, patrolMax: 1440, speed: 42 })
    .plat(1300, 28, 76).heart(1325, 28)
    .flyOver(1320, 0, { type: 'bee', patrolMin: 1180, patrolMax: 1460, speed: 46, flyAmplitude: 16 })
    .gap(1468)
    .ground(1524, 380)
    .groundEnemy(1580, { type: 'walker', patrolMin: 1540, patrolMax: 1780, speed: 36 })
    .heart(1680, 0)
    .finish()
    .build();
}

export function buildGoztepeLayout() {
  const b = new LevelBuilder('goztepe');
  return b
    .ground(0, 540)
    .plat(100, 22, 64)
    .plat(220, 36, 64).heart(240, 36)
    .plat(340, 48, 64)
    .groundEnemy(420, { type: 'jumper', patrolMin: 380, patrolMax: 500, speed: 24, jumpInterval: 2.2 })
    .gap(540)
    .ground(596, 380)
    .plat(640, 24, 72)
    .plat(740, 40, 72)
    .plat(840, 52, 72).heart(860, 52)
    .flyOver(880, 0, { type: 'bat', patrolMin: 600, patrolMax: 960, speed: 32, flying: true, flyAmplitude: 16 })
    .gap(976)
    .ground(1032, 400)
    .groundEnemy(1090, { type: 'charger', patrolMin: 1040, patrolMax: 1280, speed: 28, chargeSpeed: 120 })
    .movingPlat(1160, 0, 68, 36, 0.4)
    .plat(1240, 26, 80).heart(1265, 26)
    .gap(1376)
    .ground(1432, 420)
    .plat(1480, 22, 64)
    .plat(1580, 38, 64)
    .plat(1680, 52, 64)
    .groundEnemy(1740, { type: 'jumper', patrolMin: 1440, patrolMax: 1780, speed: 26 })
    .flyOver(1640, 52, { type: 'bat', patrolMin: 1480, patrolMax: 1760, speed: 34, flying: true, flyAmplitude: 12 })
    .heart(1820, 0)
    .finish()
    .build();
}

export function buildGaziemirLayout() {
  const b = new LevelBuilder('gaziemir');
  return b
    .ground(0, 340)
    .movingPlatH(220, 198, 56, 400, 0.34)
    .groundEnemy(280, { type: 'walker', patrolMin: 200, patrolMax: 480, speed: 34 })
    .heart(320, 0)
    .gap(480)
    .ground(536, 320)
    .flyOver(560, 0, { type: 'ghost', patrolMin: 520, patrolMax: 760, speed: 24, flyAmplitude: 14 })
    .movingPlatH(580, 198, 56, 780, 0.3)
    .groundEnemy(640, { type: 'walker', patrolMin: 540, patrolMax: 860, speed: 32 })
    .plat(700, 26, 80).heart(725, 26)
    .gap(856)
    .ground(912, 340)
    .groundEnemy(960, { type: 'ghost', patrolMin: 920, patrolMax: 1160, speed: 26, flying: true, flyAmplitude: 16 })
    .movingPlat(1020, 0, 64, 38, 0.36)
    .gap(1180)
    .ground(1236, 360)
    .movingPlatH(1260, 198, 56, 1460, 0.32)
    .flyOver(1300, 0, { type: 'ghost', patrolMin: 1240, patrolMax: 1520, speed: 28, flyAmplitude: 18 })
    .groundEnemy(1360, { type: 'walker', patrolMin: 1240, patrolMax: 1540, speed: 36 })
    .heart(1480, 0)
    .finish()
    .build();
}

export function buildKusadasiLayout() {
  const b = new LevelBuilder('kusadasi');
  return b
    .ground(0, 340)
    .groundEnemy(120, { type: 'crab', patrolMin: 60, patrolMax: 320, speed: 44 })
    .gap(340)
    .ground(396, 300)
    .movingPlat(440, 0, 68, 40, 0.4)
    .flyOver(460, 40, { type: 'bee', patrolMin: 400, patrolMax: 640, speed: 48, flyAmplitude: 16 })
    .heart(480, 40)
    .gap(696)
    .ground(752, 320)
    .groundEnemy(800, { type: 'bat', patrolMin: 760, patrolMax: 1000, speed: 36, flying: true, flyAmplitude: 20 })
    .plat(860, 28, 80).heart(885, 28)
    .groundEnemy(920, { type: 'crab', patrolMin: 760, patrolMax: 1040, speed: 42 })
    .gap(1072)
    .ground(1128, 340)
    .movingPlat(1180, 0, 64, 36, 0.38)
    .flyOver(1200, 36, { type: 'bee', patrolMin: 1140, patrolMax: 1380, speed: 50, flyAmplitude: 14 })
    .groundEnemy(1240, { type: 'bat', patrolMin: 1180, patrolMax: 1420, speed: 38, flying: true, flyAmplitude: 18 })
    .gap(1468)
    .ground(1524, 360)
    .groundEnemy(1580, { type: 'crab', patrolMin: 1540, patrolMax: 1780, speed: 40 })
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
    .gap(560)
    .ground(616, 380)
    .flyOver(660, 0, { type: 'ghost', patrolMin: 620, patrolMax: 860, speed: 24, flyAmplitude: 14 })
    .groundEnemy(720, { type: 'turtle', patrolMin: 640, patrolMax: 900, speed: 20 })
    .plat(780, 26, 80).heart(805, 26)
    .gap(996)
    .ground(1052, 400)
    .movingPlat(1100, 0, 64, 36, 0.36)
    .groundEnemy(1180, { type: 'jumper', patrolMin: 1060, patrolMax: 1300, speed: 28 })
    .plat(1260, 28, 80).heart(1285, 28)
    .gap(1412)
    .ground(1468, 420)
    .plat(1520, 22, 64)
    .plat(1620, 38, 64)
    .plat(1720, 52, 64).heart(1740, 52)
    .groundEnemy(1780, { type: 'turtle', patrolMin: 1480, patrolMax: 1820, speed: 22 })
    .flyOver(1680, 52, { type: 'ghost', patrolMin: 1520, patrolMax: 1800, speed: 26, flyAmplitude: 12 })
    .heart(1880, 0)
    .finish()
    .build();
}

export function buildSelcukLayout() {
  const b = new LevelBuilder('selcuk');
  return b
    .ground(0, 340)
    .groundEnemy(120, { type: 'turtle', patrolMin: 60, patrolMax: 320, speed: 18 })
    .gap(340)
    .ground(396, 300)
    .flyOver(420, 0, { type: 'bat', patrolMin: 380, patrolMax: 620, speed: 34, flyAmplitude: 18 })
    .groundEnemy(480, { type: 'turtle', patrolMin: 400, patrolMax: 640, speed: 20 })
    .plat(540, 28, 80).heart(565, 28)
    .gap(696)
    .ground(752, 320)
    .groundEnemy(800, { type: 'charger', patrolMin: 760, patrolMax: 1000, speed: 28, chargeSpeed: 120 })
    .movingPlat(860, 0, 64, 38, 0.38)
    .flyOver(880, 38, { type: 'bat', patrolMin: 760, patrolMax: 1040, speed: 36, flyAmplitude: 14 })
    .gap(1072)
    .ground(1128, 340)
    .groundEnemy(1180, { type: 'turtle', patrolMin: 1140, patrolMax: 1380, speed: 22 })
    .plat(1240, 30, 76).heart(1265, 30)
    .groundEnemy(1300, { type: 'charger', patrolMin: 1240, patrolMax: 1500, speed: 30, chargeSpeed: 130 })
    .gap(1468)
    .ground(1524, 360)
    .flyOver(1560, 0, { type: 'bat', patrolMin: 1520, patrolMax: 1760, speed: 38, flyAmplitude: 20 })
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
    .groundEnemy(420, { type: 'slime', patrolMin: 360, patrolMax: 560, speed: 16 })
    .gap(560)
    .ground(616, 360)
    .heart(680, 0).heart(760, 0)
    .plat(820, 26, 80).heart(845, 26)
    .flyOver(860, 0, { type: 'bee', patrolMin: 620, patrolMax: 900, speed: 30, flyAmplitude: 10 })
    .gap(976)
    .ground(1032, 380)
    .heart(1100, 0).heart(1180, 0).heart(1260, 0)
    .plat(1320, 24, 80).heart(1345, 24)
    .groundEnemy(1380, { type: 'ghost', patrolMin: 1040, patrolMax: 1400, speed: 18, flying: true, flyAmplitude: 12 })
    .heart(1500, 0)
    .finish()
    .build();
}
