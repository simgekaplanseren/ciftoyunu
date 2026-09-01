import { LEVEL } from './levelUtils.js';

/** Bölge temaları — gökyüzü ve platform renkleri */
export const ZONE_THEMES = {
  lefkosa: {
    id: 'lefkosa',
    platformTheme: 'lefkosa',
    sky: ['#1a1528', '#3d2f4a', '#5c4a3a'],
  },
  girne: {
    id: 'girne',
    platformTheme: 'girne',
    sky: ['#1a2430', '#2e4050', '#4a6070'],
  },
  magusa: {
    id: 'magusa',
    platformTheme: 'magusa',
    sky: ['#1f2430', '#4a5568', '#c9a882'],
  },
  dipkarpaz: {
    id: 'dipkarpaz',
    platformTheme: 'dipkarpaz',
    sky: ['#1e2836', '#3d5060', '#c4a882'],
  },
  hayvanat: {
    id: 'hayvanat',
    platformTheme: 'hayvanat',
    sky: ['#14532d', '#166534', '#4ade80'],
  },
  iconova: {
    id: 'iconova',
    platformTheme: 'iconova',
    sky: ['#312e81', '#4c1d95', '#a78bfa'],
  },
  petpark: {
    id: 'petpark',
    platformTheme: 'petpark',
    sky: ['#7dd3fc', '#86efac', '#ecfccb'],
  },
  sehitkamil: {
    id: 'sehitkamil',
    platformTheme: 'sehitkamil',
    sky: ['#1e1b4b', '#7c2d12', '#ea580c'],
  },
  alsancak: {
    id: 'alsancak',
    platformTheme: 'alsancak',
    sky: ['#0c4a6e', '#0284c7', '#38bdf8'],
  },
  goztepe: {
    id: 'goztepe',
    platformTheme: 'goztepe',
    sky: ['#1e3a5f', '#2563eb', '#60a5fa'],
  },
  kusadasi: {
    id: 'kusadasi',
    platformTheme: 'kusadasi',
    sky: ['#0e7490', '#06b6d4', '#67e8f9'],
  },
  sirince: {
    id: 'sirince',
    platformTheme: 'sirince',
    sky: ['#713f12', '#b45309', '#fcd34d'],
  },
  selcuk: {
    id: 'selcuk',
    platformTheme: 'selcuk',
    sky: ['#44403c', '#78716c', '#d6d3d1'],
  },
  dogumgunu: {
    id: 'dogumgunu',
    platformTheme: 'dogumgunu',
    sky: ['#4a1942', '#9d174d', '#fb7185'],
  },
};

/** @deprecated */
export const CYPRUS_ZONE_THEMES = ZONE_THEMES;

const GROUND_Y = LEVEL.GROUND_Y;

function drawSkySegment(ctx, x, w, h, sky) {
  const grad = ctx.createLinearGradient(x, 0, x, h);
  grad.addColorStop(0, sky[0]);
  grad.addColorStop(0.45, sky[1]);
  grad.addColorStop(1, sky[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(x, 0, w, h);
}

/** Lefkoşa — başkent silüeti, minare, sokak lambası */
function drawLefkosaDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(26, 21, 40, 0.55)';
  for (let i = 0; i < 5; i++) {
    const bx = startX + 40 + i * 95;
    const bh = 50 + (i % 3) * 18;
    ctx.fillRect(bx, GROUND_Y - bh, 36 + (i % 2) * 12, bh);
    ctx.fillRect(bx - 4, GROUND_Y - bh - 8, 44 + (i % 2) * 12, 8);
  }

  const mx = startX + width * 0.55;
  ctx.fillStyle = 'rgba(45, 35, 55, 0.7)';
  ctx.fillRect(mx, GROUND_Y - 90, 10, 90);
  ctx.beginPath();
  ctx.moveTo(mx - 6, GROUND_Y - 90);
  ctx.lineTo(mx + 5, GROUND_Y - 118);
  ctx.lineTo(mx + 16, GROUND_Y - 90);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(mx + 12, GROUND_Y - 100, 3, 12);

  for (let i = 0; i < 3; i++) {
    const lx = startX + 80 + i * 140;
    ctx.fillStyle = '#4a3f55';
    ctx.fillRect(lx, GROUND_Y - 52, 4, 52);
    ctx.fillStyle = '#ffe4b5';
    ctx.beginPath();
    ctx.arc(lx + 2, GROUND_Y - 56, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(201, 166, 107, 0.15)';
  ctx.fillRect(startX, GROUND_Y - 4, width, 4);
}

/** Girne — liman, Beşparmak silüeti (deniz sadece boşluk tuzaklarında) */
function drawGirneDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(30, 77, 123, 0.6)';
  ctx.beginPath();
  ctx.moveTo(startX + width * 0.15, GROUND_Y);
  ctx.lineTo(startX + width * 0.35, GROUND_Y - 70);
  ctx.lineTo(startX + width * 0.55, GROUND_Y - 95);
  ctx.lineTo(startX + width * 0.78, GROUND_Y - 55);
  ctx.lineTo(startX + width * 0.92, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.fillRect(startX + 60, GROUND_Y - 8, 48, 10);
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(startX + 60, GROUND_Y - 8);
  ctx.lineTo(startX + 84, GROUND_Y - 22);
  ctx.lineTo(startX + 108, GROUND_Y - 8);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#a16207';
  ctx.fillRect(startX + 130, GROUND_Y - 6, 36, 8);

  ctx.strokeStyle = 'rgba(165, 243, 252, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX + width * 0.7, GROUND_Y - 30);
  ctx.lineTo(startX + width * 0.85, GROUND_Y - 18);
  ctx.stroke();
}

/** Gazimağusa — uzak sur silüetleri, gökyüzü ışığı (zemin/boşluk üstüne çizilmez) */
function drawMagusaDecor(ctx, startX, width) {
  const cx = startX + width * 0.5;
  const glow = ctx.createRadialGradient(cx, 60, 8, cx, 80, Math.min(width * 0.42, 480));
  glow.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
  glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(startX, 0, width, GROUND_Y - 70);

  ctx.fillStyle = 'rgba(92, 61, 46, 0.28)';
  for (let i = 0; i < Math.min(6, Math.ceil(width / 380)); i++) {
    const tx = startX + 70 + i * 380;
    ctx.fillRect(tx, GROUND_Y - 125, 22, 42);
    ctx.fillRect(tx - 4, GROUND_Y - 132, 30, 7);
  }
}

/** Dipkarpaz — sakin gün batımı, deniz feneri, doğu ucu */
function drawDipkarpazDecor(ctx, startX, width) {
  const sunX = startX + width * 0.72;
  const sunY = 58;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 42);
  sunGrad.addColorStop(0, 'rgba(232, 196, 160, 0.55)');
  sunGrad.addColorStop(0.45, 'rgba(196, 168, 130, 0.2)');
  sunGrad.addColorStop(1, 'rgba(196, 168, 130, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(startX, 0, width, GROUND_Y);

  ctx.fillStyle = 'rgba(40, 52, 68, 0.45)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y);
  ctx.lineTo(startX + width * 0.18, GROUND_Y - 42);
  ctx.lineTo(startX + width * 0.48, GROUND_Y - 55);
  ctx.lineTo(startX + width * 0.82, GROUND_Y - 32);
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  const lx = startX + width * 0.38;
  ctx.fillStyle = '#e8e0d4';
  ctx.fillRect(lx, GROUND_Y - 72, 12, 72);
  ctx.fillStyle = '#b4534a';
  ctx.beginPath();
  ctx.moveTo(lx - 3, GROUND_Y - 72);
  ctx.lineTo(lx + 6, GROUND_Y - 86);
  ctx.lineTo(lx + 15, GROUND_Y - 72);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(232, 196, 140, 0.85)';
  ctx.beginPath();
  ctx.arc(lx + 6, GROUND_Y - 76, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(58, 88, 108, 0.25)';
  ctx.fillRect(startX, GROUND_Y + 10, width, 14);
}

function drawHayvanatDecor(ctx, startX, width) {
  ctx.font = '16px sans-serif';
  ctx.fillText('🦁', startX + width * 0.3, GROUND_Y - 60);
  ctx.fillText('🦒', startX + width * 0.6, GROUND_Y - 55);
  ctx.fillText('🦜', startX + width * 0.45, 52);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  for (let i = 0; i < 5; i++) {
    const bx = startX + 60 + i * (width / 5);
    const by = 72 + (i % 3) * 22;
    ctx.beginPath();
    ctx.ellipse(bx, by, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(14, 165, 233, 0.45)';
    ctx.fillRect(bx - 8, by - 1, 6, 2);
    ctx.fillRect(bx + 4, by - 1, 6, 2);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  }
}

function drawIconovaDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(76, 29, 149, 0.55)';
  ctx.fillRect(startX + width * 0.2, GROUND_Y - 75, 120, 75);
  ctx.fillRect(startX + width * 0.55, GROUND_Y - 55, 90, 55);
  ctx.fillStyle = 'rgba(167, 139, 250, 0.3)';
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      ctx.fillRect(startX + width * 0.22 + col * 22, GROUND_Y - 68 + row * 16, 14, 10);
    }
  }
}

function drawPetParkDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(22, 101, 52, 0.35)';
  ctx.fillRect(startX, GROUND_Y - 14, width, 14);

  const trees = [0.15, 0.42, 0.72];
  for (const t of trees) {
    const tx = startX + width * t;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(tx, GROUND_Y - 52, 6, 52);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.65)';
    ctx.beginPath();
    ctx.arc(tx + 3, GROUND_Y - 58, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(120, 53, 15, 0.55)';
  for (let i = 0; i < 4; i++) {
    const fx = startX + 40 + i * (width / 4);
    ctx.fillRect(fx, GROUND_Y - 36, 4, 36);
    ctx.fillRect(fx - 8, GROUND_Y - 40, 20, 4);
  }
}

function drawSehitkamilDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(30, 27, 75, 0.45)';
  for (let i = 0; i < 4; i++) {
    const bx = startX + 50 + i * 200;
    ctx.fillRect(bx, GROUND_Y - 50 - (i % 2) * 20, 40, 50 + (i % 2) * 20);
  }
  ctx.fillStyle = 'rgba(234, 88, 12, 0.2)';
  ctx.fillRect(startX, 30, width, GROUND_Y - 30);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#fdba74';
  ctx.fillText('🌆', startX + width * 0.5, 50);
}

function drawAlsancakDecor(ctx, startX, width) {
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(startX, GROUND_Y + 6, width, 20);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  for (let i = 0; i < width; i += 24) {
    ctx.fillRect(startX + i, GROUND_Y + 10, 12, 4);
  }
  ctx.font = '14px sans-serif';
  ctx.fillText('⛵', startX + width * 0.2, GROUND_Y - 40);
}

function drawGoztepeDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
  ctx.fillRect(startX + width * 0.3, GROUND_Y - 60, 100, 60);
  ctx.fillRect(startX + width * 0.55, GROUND_Y - 45, 70, 45);
}

function drawKusadasiDecor(ctx, startX, width) {
  ctx.fillStyle = '#0891b2';
  ctx.fillRect(startX, GROUND_Y + 6, width, 22);
  ctx.fillStyle = 'rgba(103, 232, 249, 0.4)';
  for (let i = 0; i < width; i += 26) {
    ctx.beginPath();
    ctx.moveTo(startX + i, GROUND_Y + 8);
    ctx.quadraticCurveTo(startX + i + 8, GROUND_Y + 4, startX + i + 16, GROUND_Y + 8);
    ctx.lineTo(startX + i + 16, GROUND_Y + 14);
    ctx.lineTo(startX + i, GROUND_Y + 14);
    ctx.closePath();
    ctx.fill();
  }
  ctx.font = '16px sans-serif';
  ctx.fillText('⛵', startX + width * 0.35, GROUND_Y - 45);
  ctx.fillText('🏖️', startX + width * 0.65, GROUND_Y - 50);
}

function drawSirinceDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(180, 83, 9, 0.45)';
  for (let i = 0; i < 5; i++) {
    const hx = startX + 40 + i * 170;
    ctx.fillRect(hx, GROUND_Y - 35, 40, 35);
    ctx.beginPath();
    ctx.moveTo(hx - 6, GROUND_Y - 35);
    ctx.lineTo(hx + 20, GROUND_Y - 52);
    ctx.lineTo(hx + 46, GROUND_Y - 35);
    ctx.closePath();
    ctx.fill();
  }
}

function drawSelcukDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(120, 113, 108, 0.5)';
  for (let i = 0; i < 3; i++) {
    const cx = startX + 120 + i * 260;
    ctx.fillRect(cx, GROUND_Y - 70, 16, 70);
    ctx.fillRect(cx - 20, GROUND_Y - 78, 56, 10);
  }
  ctx.font = '16px sans-serif';
  ctx.fillText('🏛️', startX + width * 0.5, 45);
}

function drawDogumGunuDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(29, 78, 216, 0.35)';
  ctx.fillRect(startX, GROUND_Y + 4, width, 24);

  const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#67e8f9', '#4ade80'];
  for (let i = 0; i < 8; i++) {
    const bx = startX + 40 + i * (width / 8);
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(bx, 30 + (i % 3) * 12, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, 36 + (i % 3) * 12);
    ctx.lineTo(bx, 55 + (i % 2) * 8);
    ctx.stroke();
  }

  ctx.font = '20px sans-serif';
  ctx.fillText('🎂', startX + width * 0.48, GROUND_Y - 55);
  ctx.fillText('🎈', startX + width * 0.35, GROUND_Y - 48);
  ctx.fillText('🎈', startX + width * 0.62, GROUND_Y - 50);

  ctx.fillStyle = 'rgba(45, 27, 78, 0.45)';
  ctx.fillRect(startX + width * 0.15, GROUND_Y - 65, 28, 65);
  ctx.beginPath();
  ctx.moveTo(startX + width * 0.15, GROUND_Y - 65);
  ctx.lineTo(startX + width * 0.15 + 14, GROUND_Y - 88);
  ctx.lineTo(startX + width * 0.15 + 28, GROUND_Y - 65);
  ctx.closePath();
  ctx.fill();
}

const DECORATORS = {
  lefkosa: drawLefkosaDecor,
  girne: drawGirneDecor,
  magusa: drawMagusaDecor,
  dipkarpaz: drawDipkarpazDecor,
  hayvanat: drawHayvanatDecor,
  iconova: drawIconovaDecor,
  petpark: drawPetParkDecor,
  sehitkamil: drawSehitkamilDecor,
  alsancak: drawAlsancakDecor,
  goztepe: drawGoztepeDecor,
  kusadasi: drawKusadasiDecor,
  sirince: drawSirinceDecor,
  selcuk: drawSelcukDecor,
  dogumgunu: drawDogumGunuDecor,
};

export function drawZoneBackground(ctx, atmosphere, levelWidth, levelHeight) {
  const theme = ZONE_THEMES[atmosphere] || ZONE_THEMES.lefkosa;
  drawSkySegment(ctx, 0, levelWidth, levelHeight, theme.sky);

  const drawDecor = DECORATORS[atmosphere];
  if (drawDecor) {
    drawDecor(ctx, 0, levelWidth);
  }
}

/** @deprecated use drawZoneBackground */
export function drawCyprusZoneBackground(ctx, atmosphere, levelWidth, levelHeight) {
  drawZoneBackground(ctx, atmosphere, levelWidth, levelHeight);
}

/**
 * @deprecated Eski tek-harita alt bölge sistemi — artık kullanılmıyor.
 */
export function drawCyprusLevelBackground(ctx, subLevels, levelHeight, levelWidth) {
  for (const sub of subLevels) {
    drawCyprusZoneBackground(ctx, sub.atmosphere, sub.endX - sub.startX, levelHeight);
  }
}

export function getZoneTheme(atmosphereId) {
  return ZONE_THEMES[atmosphereId] || ZONE_THEMES.lefkosa;
}
