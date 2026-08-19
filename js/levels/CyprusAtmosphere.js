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
    sky: ['#0c2340', '#1e4d7b', '#3b82c4'],
  },
  magusa: {
    id: 'magusa',
    platformTheme: 'magusa',
    sky: ['#2a1810', '#5c3d2e', '#8b5a2b'],
  },
  dipkarpaz: {
    id: 'dipkarpaz',
    platformTheme: 'dipkarpaz',
    sky: ['#4a1942', '#c2410c', '#fb923c'],
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
    sky: ['#713f12', '#a16207', '#fde047'],
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
  gaziemir: {
    id: 'gaziemir',
    platformTheme: 'gaziemir',
    sky: ['#334155', '#475569', '#94a3b8'],
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

/** Girne — deniz, liman, Beşparmak silüeti */
function drawGirneDecor(ctx, startX, width) {
  const seaY = GROUND_Y + 8;
  ctx.fillStyle = '#0e7490';
  ctx.fillRect(startX, seaY, width, 32);
  ctx.fillStyle = 'rgba(103, 232, 249, 0.35)';
  for (let i = 0; i < width; i += 28) {
    const wx = startX + i;
    ctx.beginPath();
    ctx.moveTo(wx, seaY + 6);
    ctx.quadraticCurveTo(wx + 7, seaY + 2, wx + 14, seaY + 6);
    ctx.quadraticCurveTo(wx + 21, seaY + 10, wx + 28, seaY + 6);
    ctx.lineTo(wx + 28, seaY + 14);
    ctx.lineTo(wx, seaY + 14);
    ctx.closePath();
    ctx.fill();
  }

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

/** Gazimağusa — sur duvarları, kule, palmiye */
function drawMagusaDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(92, 61, 46, 0.75)';
  for (let i = 0; i < 4; i++) {
    const tx = startX + 30 + i * 120;
    ctx.fillRect(tx, GROUND_Y - 65, 28, 65);
    ctx.fillRect(tx - 6, GROUND_Y - 72, 40, 10);
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(tx + j * 8, GROUND_Y - 55 + j * 14, 6, 10);
    }
  }

  ctx.fillStyle = 'rgba(60, 40, 25, 0.85)';
  ctx.fillRect(startX, GROUND_Y - 28, width, 28);
  for (let i = 0; i < width; i += 24) {
    ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.fillRect(startX + i, GROUND_Y - 28, 12, 6);
  }

  for (let i = 0; i < 2; i++) {
    const px = startX + 100 + i * 280;
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.moveTo(px, GROUND_Y);
    ctx.lineTo(px - 14, GROUND_Y - 38);
    ctx.lineTo(px + 14, GROUND_Y - 38);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#854d0e';
    ctx.fillRect(px - 2, GROUND_Y - 38, 4, 38);
  }

  ctx.fillStyle = 'rgba(251, 191, 36, 0.12)';
  ctx.fillRect(startX + width * 0.3, 20, width * 0.4, GROUND_Y - 20);
}

/** Dipkarpaz — gün batımı, deniz feneri, doğu ucu */
function drawDipkarpazDecor(ctx, startX, width) {
  const sunX = startX + width * 0.72;
  const sunY = 52;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 48);
  sunGrad.addColorStop(0, 'rgba(253, 186, 116, 0.9)');
  sunGrad.addColorStop(0.4, 'rgba(251, 146, 60, 0.4)');
  sunGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(startX, 0, width, GROUND_Y);

  ctx.strokeStyle = 'rgba(254, 205, 211, 0.25)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(sunX, sunY);
    ctx.lineTo(sunX + Math.cos(i * 0.9) * 80, sunY + Math.sin(i * 0.9) * 50);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(74, 25, 66, 0.5)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y);
  ctx.lineTo(startX + width * 0.2, GROUND_Y - 45);
  ctx.lineTo(startX + width * 0.5, GROUND_Y - 60);
  ctx.lineTo(startX + width * 0.85, GROUND_Y - 35);
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  const lx = startX + width * 0.38;
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(lx, GROUND_Y - 72, 14, 72);
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(lx - 4, GROUND_Y - 72);
  ctx.lineTo(lx + 7, GROUND_Y - 88);
  ctx.lineTo(lx + 18, GROUND_Y - 72);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(lx + 7, GROUND_Y - 78, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ea580c';
  ctx.fillRect(startX, GROUND_Y + 6, width, 18);
  ctx.fillStyle = 'rgba(253, 186, 116, 0.3)';
  for (let i = 0; i < width; i += 20) {
    ctx.fillRect(startX + i, GROUND_Y + 10, 10, 3);
  }
}

function drawHayvanatDecor(ctx, startX, width) {
  ctx.fillStyle = 'rgba(22, 101, 52, 0.5)';
  for (let i = 0; i < 6; i++) {
    const tx = startX + 30 + i * 140;
    ctx.beginPath();
    ctx.moveTo(tx, GROUND_Y);
    ctx.lineTo(tx - 12, GROUND_Y - 45 - (i % 2) * 15);
    ctx.lineTo(tx + 12, GROUND_Y - 45 - (i % 2) * 15);
    ctx.closePath();
    ctx.fill();
  }
  ctx.font = '16px sans-serif';
  ctx.fillText('🦁', startX + width * 0.3, GROUND_Y - 60);
  ctx.fillText('🦒', startX + width * 0.6, GROUND_Y - 55);
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
  ctx.fillStyle = 'rgba(161, 98, 7, 0.4)';
  ctx.fillRect(startX, GROUND_Y - 20, width, 20);
  ctx.font = '14px sans-serif';
  for (let i = 0; i < 5; i++) {
    ctx.fillText('🐾', startX + 60 + i * 160, GROUND_Y - 35);
  }
  ctx.fillStyle = '#854d0e';
  ctx.fillRect(startX + 80, GROUND_Y - 48, 4, 48);
  ctx.fillRect(startX + width - 120, GROUND_Y - 42, 4, 42);
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

function drawGaziemirDecor(ctx, startX, width) {
  ctx.fillStyle = '#64748b';
  ctx.fillRect(startX + 60, GROUND_Y - 8, width - 120, 8);
  ctx.fillStyle = '#475569';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(startX + 100 + i * 180, GROUND_Y - 28, 6, 28);
  }
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
  gaziemir: drawGaziemirDecor,
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
