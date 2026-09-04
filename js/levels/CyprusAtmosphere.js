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
    sky: ['#0c3320', '#14532d', '#6ee7a0'],
  },
  iconova: {
    id: 'iconova',
    platformTheme: 'iconova',
    sky: ['#312e81', '#4c1d95', '#a78bfa'],
  },
  petpark: {
    id: 'petpark',
    platformTheme: 'petpark',
    sky: ['#0369a1', '#7dd3fc', '#bbf7d0'],
  },
  sehitkamil: {
    id: 'sehitkamil',
    platformTheme: 'sehitkamil',
    sky: ['#050810', '#0f172a', '#1e3a5f'],
  },
  alsancak: {
    id: 'alsancak',
    platformTheme: 'alsancak',
    sky: ['#2c3e50', '#6a8fa3', '#e8b896'],
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
    sky: ['#3d4f5f', '#8fa89a', '#f2dcc4'],
  },
  selcuk: {
    id: 'selcuk',
    platformTheme: 'selcuk',
    sky: ['#3d4a52', '#8a9a8e', '#e8dcc8'],
  },
  dogumgunu: {
    id: 'dogumgunu',
    platformTheme: 'dogumgunu',
    sky: ['#2c3e50', '#6a8fa3', '#f5c4d8'],
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
  // Uzak tepe silüeti
  ctx.fillStyle = 'rgba(20, 83, 45, 0.4)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y - 20);
  for (let i = 0; i <= Math.ceil(width / 60); i++) {
    const hx = startX + i * 60;
    ctx.lineTo(hx, GROUND_Y - 48 - (i % 4) * 12);
  }
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.lineTo(startX, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Bulutlar
  for (let i = 0; i < Math.ceil(width / 180); i++) {
    const cx = startX + 60 + i * 180;
    const cy = 36 + (i % 3) * 18;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, 32, 11, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 18, cy + 4, 22, 9, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ağaçlar — yol boyunca tekrar
  for (let x = startX + 70; x < startX + width; x += 130) {
    const h = 42 + ((x / 130) % 3) * 10;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, GROUND_Y - h, 5, h);
    ctx.fillStyle = `rgba(34, 197, 94, ${0.45 + ((x / 130) % 2) * 0.15})`;
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y - h - 6, 14 + (x % 3) * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Çit direkleri — patika kenarı
  for (let x = startX + 16; x < startX + width; x += 44) {
    ctx.fillStyle = '#92400e';
    ctx.fillRect(x, GROUND_Y - 28, 3, 28);
    if (Math.floor((x - startX) / 44) % 2 === 0) {
      ctx.fillRect(x, GROUND_Y - 32, 44, 3);
    }
  }

  // Çimen şeridi
  ctx.fillStyle = 'rgba(74, 222, 128, 0.22)';
  ctx.fillRect(startX, GROUND_Y - 10, width, 10);

  // Hayvan bölgesi panoları
  const animals = ['🦁', '🦒', '🐘', '🦓', '🐒', '🦜'];
  ctx.font = '20px sans-serif';
  for (let x = startX + 180; x < startX + width; x += 280) {
    const idx = Math.floor((x - startX) / 280) % animals.length;
    ctx.fillStyle = 'rgba(120, 53, 15, 0.35)';
    ctx.fillRect(x - 8, GROUND_Y - 46, 4, 46);
    ctx.fillRect(x + 52, GROUND_Y - 46, 4, 46);
    ctx.fillRect(x - 8, GROUND_Y - 42, 64, 4);
    ctx.fillText(animals[idx], x + 12, GROUND_Y - 50);
  }

  // Su havuzu (dekor)
  for (let x = startX + 320; x < startX + width; x += 420) {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.fillRect(x, GROUND_Y + 8, 48, 10);
    ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
    ctx.beginPath();
    ctx.ellipse(x + 24, GROUND_Y + 6, 22, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawIconovaDecor(ctx, startX, width) {
  for (let x = startX + 80; x < startX + width; x += 220) {
    const h = 55 + ((x / 220) % 3) * 25;
    ctx.fillStyle = 'rgba(76, 29, 149, 0.5)';
    ctx.fillRect(x, GROUND_Y - h, 90 + (x % 2) * 30, h);
    ctx.fillStyle = 'rgba(167, 139, 250, 0.25)';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        ctx.fillRect(x + 8 + col * 18, GROUND_Y - h + 10 + row * 14, 12, 9);
      }
    }
  }
  ctx.fillStyle = 'rgba(196, 181, 253, 0.15)';
  ctx.fillRect(startX, GROUND_Y - 6, width, 6);
}

function drawPetParkDecor(ctx, startX, width) {
  // Uzak ağaç hattı
  ctx.fillStyle = 'rgba(21, 128, 61, 0.3)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y - 30);
  for (let i = 0; i <= Math.ceil(width / 70); i++) {
    ctx.lineTo(startX + i * 70, GROUND_Y - 50 - (i % 3) * 8);
  }
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.lineTo(startX, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Bulut
  for (let i = 0; i < Math.ceil(width / 200); i++) {
    const cx = startX + 90 + i * 200;
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.beginPath();
    ctx.ellipse(cx, 42 + (i % 2) * 12, 30, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Arka plan ağaçları
  for (let x = startX + 80; x < startX + width; x += 150) {
    const h = 38 + ((x / 150) % 3) * 12;
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, GROUND_Y - h, 5, h);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.55)';
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y - h - 8, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Çimen
  ctx.fillStyle = 'rgba(74, 222, 128, 0.25)';
  ctx.fillRect(startX, GROUND_Y - 12, width, 12);

  // Patika izleri (dekor, alçak)
  ctx.font = '12px sans-serif';
  ctx.globalAlpha = 0.35;
  for (let x = startX + 100; x < startX + width; x += 220) {
    ctx.fillText('🐾', x, GROUND_Y - 4);
    ctx.fillText('🐾', x + 18, GROUND_Y - 2);
  }
  ctx.globalAlpha = 1;
}

function drawSehitkamilDecor(ctx, startX, width) {
  // Uzak tepe silüeti
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y - 24);
  for (let i = 0; i <= Math.ceil(width / 80); i++) {
    const hx = startX + i * 80;
    ctx.lineTo(hx, GROUND_Y - 62 - (i % 4) * 14);
  }
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.lineTo(startX, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Ay
  const moonX = startX + width * 0.72;
  ctx.fillStyle = 'rgba(253, 224, 171, 0.32)';
  ctx.beginPath();
  ctx.arc(moonX, 44, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(253, 224, 171, 0.12)';
  ctx.beginPath();
  ctx.arc(moonX, 44, 36, 0, Math.PI * 2);
  ctx.fill();

  // Yıldızlar
  for (let i = 0; i < Math.ceil(width / 42); i++) {
    const sx = startX + 18 + i * 42;
    const sy = 14 + (i % 5) * 16;
    ctx.fillStyle = `rgba(255,255,255,${0.22 + (i % 4) * 0.12})`;
    ctx.fillRect(sx, sy, 2, 2);
    if (i % 7 === 0) {
      ctx.fillRect(sx + 6, sy + 8, 1, 1);
    }
  }

  // Uzak şehir katmanı
  for (let x = startX + 20; x < startX + width; x += 110) {
    const h = 38 + ((x / 110) % 5) * 16;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
    ctx.fillRect(x, GROUND_Y - h, 36 + (x % 3) * 14, h);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.18)';
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        if ((x + row + col) % 2 === 0) {
          ctx.fillRect(x + 6 + col * 16, GROUND_Y - h + 10 + row * 12, 6, 7);
        }
      }
    }
  }

  // Yakın binalar — daha yüksek, daha belirgin
  for (let x = startX + 60; x < startX + width; x += 160) {
    const h = 72 + ((x / 160) % 4) * 22;
    ctx.fillStyle = 'rgba(30, 41, 59, 0.88)';
    ctx.fillRect(x, GROUND_Y - h, 56 + (x % 2) * 24, h);
    ctx.fillRect(x - 4, GROUND_Y - h - 6, 64 + (x % 2) * 24, 6);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.35)';
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        if ((x + row + col) % 3 !== 0) {
          ctx.fillRect(x + 8 + col * 16, GROUND_Y - h + 12 + row * 13, 8, 9);
        }
      }
    }
  }

  // Tramvay telleri
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y - 88);
  ctx.lineTo(startX + width, GROUND_Y - 88);
  ctx.moveTo(startX, GROUND_Y - 72);
  ctx.lineTo(startX + width, GROUND_Y - 72);
  ctx.stroke();
  for (let x = startX + 40; x < startX + width; x += 120) {
    ctx.fillStyle = 'rgba(100, 116, 139, 0.45)';
    ctx.fillRect(x, GROUND_Y - 88, 2, 88);
  }

  // Sokak lambaları
  for (let x = startX + 50; x < startX + width; x += 130) {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x, GROUND_Y - 50, 4, 50);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.55)';
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y - 52, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(253, 224, 171, 0.1)';
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y - 34, 32, 0, Math.PI * 2);
    ctx.fill();
  }

  // Kaldırım ve yol kenarı
  ctx.fillStyle = 'rgba(51, 65, 85, 0.45)';
  ctx.fillRect(startX, GROUND_Y - 8, width, 8);
  ctx.fillStyle = 'rgba(148, 163, 184, 0.2)';
  ctx.fillRect(startX, GROUND_Y - 2, width, 2);

  // Park halinde araç silüetleri
  for (let x = startX + 100; x < startX + width; x += 240) {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.fillRect(x, GROUND_Y - 22, 44, 14);
    ctx.fillRect(x + 6, GROUND_Y - 28, 32, 8);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.2)';
    ctx.fillRect(x + 10, GROUND_Y - 26, 8, 5);
    ctx.fillRect(x + 26, GROUND_Y - 26, 8, 5);
  }

  // Gece tabelaları
  ctx.font = '14px sans-serif';
  ctx.globalAlpha = 0.4;
  for (let x = startX + 180; x < startX + width; x += 320) {
    ctx.fillStyle = 'rgba(251, 191, 36, 0.35)';
    ctx.fillRect(x, GROUND_Y - 58, 52, 18);
    ctx.fillStyle = '#fde68a';
    ctx.fillText('🌆', x + 16, GROUND_Y - 44);
  }
  ctx.globalAlpha = 1;

  // Hafif gece pususu
  ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
  ctx.fillRect(startX, GROUND_Y - 80, width, 80);
}

function drawAlsancakDecor(ctx, startX, width) {
  // Deniz — kordon altı
  ctx.fillStyle = '#1a5f7a';
  ctx.fillRect(startX, GROUND_Y + 6, width, 24);
  ctx.fillStyle = 'rgba(103, 232, 249, 0.3)';
  for (let i = 0; i < width; i += 28) {
    ctx.beginPath();
    ctx.moveTo(startX + i, GROUND_Y + 10);
    ctx.quadraticCurveTo(startX + i + 10, GROUND_Y + 6, startX + i + 20, GROUND_Y + 10);
    ctx.lineTo(startX + i + 20, GROUND_Y + 16);
    ctx.lineTo(startX + i, GROUND_Y + 16);
    ctx.closePath();
    ctx.fill();
  }

  // Uzak kıyı / Kadifekale silüeti
  ctx.fillStyle = 'rgba(44, 62, 80, 0.35)';
  ctx.beginPath();
  ctx.moveTo(startX + width * 0.7, GROUND_Y - 30);
  ctx.lineTo(startX + width * 0.78, GROUND_Y - 72);
  ctx.lineTo(startX + width * 0.86, GROUND_Y - 30);
  ctx.closePath();
  ctx.fill();

  // Kordon apartmanları — yolun arkasında (karada)
  for (let x = startX + 30; x < startX + width; x += 150) {
    const h = 55 + ((x / 150) % 3) * 20;
    ctx.fillStyle = 'rgba(168, 162, 158, 0.5)';
    ctx.fillRect(x, GROUND_Y - h - 40, 50 + (x % 2) * 20, h);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.2)';
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        ctx.fillRect(x + 8 + col * 18, GROUND_Y - h - 32 + row * 14, 8, 9);
      }
    }
  }

  // Deniz tarafı palmiyeler — yolun dışında, kumsalda
  for (let x = startX + 100; x < startX + width; x += 180) {
    ctx.fillStyle = '#92400e';
    ctx.fillRect(x, GROUND_Y + 10, 4, 20);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y + 4, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  // Kordon korkuluk — yol kenarı
  ctx.fillStyle = 'rgba(120, 113, 108, 0.45)';
  for (let x = startX + 10; x < startX + width; x += 24) {
    ctx.fillRect(x, GROUND_Y + 2, 2, 8);
  }
  ctx.fillRect(startX, GROUND_Y + 2, width, 2);

  // Sokak lambaları — kaldırım kenarı
  for (let x = startX + 60; x < startX + width; x += 200) {
    ctx.fillStyle = '#78716c';
    ctx.fillRect(x, GROUND_Y - 44, 3, 44);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.4)';
    ctx.beginPath();
    ctx.arc(x + 1, GROUND_Y - 46, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Vapur / tekne — denizde
  ctx.font = '14px sans-serif';
  ctx.globalAlpha = 0.5;
  for (let x = startX + 80; x < startX + width; x += 300) {
    ctx.fillText('⛵', x, GROUND_Y + 22);
  }
  ctx.globalAlpha = 1;
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

  // Uzak ada silüeti
  ctx.fillStyle = 'rgba(14, 116, 144, 0.45)';
  ctx.beginPath();
  ctx.moveTo(startX + width * 0.55, GROUND_Y - 20);
  ctx.lineTo(startX + width * 0.62, GROUND_Y - 48);
  ctx.lineTo(startX + width * 0.72, GROUND_Y - 20);
  ctx.closePath();
  ctx.fill();

  // Sahil palmiyeleri
  for (let x = startX + 70; x < startX + width; x += 150) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, GROUND_Y - 34, 5, 34);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.5)';
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y - 38, 13, 0, Math.PI * 2);
    ctx.fill();
  }

  // Şezlong ve şemsiye — yol kenarında
  ctx.font = '14px sans-serif';
  ctx.globalAlpha = 0.5;
  for (let x = startX + 120; x < startX + width; x += 260) {
    ctx.fillText('🏖️', x, GROUND_Y - 4);
    ctx.fillText('⛱️', x + 36, GROUND_Y - 6);
  }
  for (let x = startX + 200; x < startX + width; x += 320) {
    ctx.fillText('⛵', x, GROUND_Y + 16);
  }
  ctx.globalAlpha = 1;
}

function drawSirinceDecor(ctx, startX, width) {
  // Uzak tepe — zeytin yeşili
  ctx.fillStyle = 'rgba(74, 93, 74, 0.4)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y - 20);
  for (let i = 0; i <= Math.ceil(width / 80); i++) {
    ctx.lineTo(startX + i * 80, GROUND_Y - 55 - (i % 4) * 12);
  }
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.lineTo(startX, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Bağ terasları
  ctx.fillStyle = 'rgba(101, 163, 13, 0.2)';
  for (let x = startX + 40; x < startX + width; x += 120) {
    ctx.fillRect(x, GROUND_Y - 48, 80, 6);
    ctx.fillRect(x + 10, GROUND_Y - 56, 60, 6);
  }

  // Hafif bulutlar
  for (let i = 0; i < Math.ceil(width / 200); i++) {
    const cx = startX + 80 + i * 200;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.ellipse(cx, 36 + (i % 2) * 14, 28, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Şirince taş evleri — krem duvar, kiremit çatı
  for (let i = 0; i < Math.ceil(width / 140); i++) {
    const hx = startX + 20 + i * 140;
    const h = 42 + (i % 3) * 14;
    ctx.fillStyle = 'rgba(245, 240, 232, 0.7)';
    ctx.fillRect(hx, GROUND_Y - h - 36, 48 + (i % 2) * 16, h);
    ctx.fillStyle = 'rgba(180, 83, 9, 0.55)';
    ctx.beginPath();
    ctx.moveTo(hx - 4, GROUND_Y - h - 36);
    ctx.lineTo(hx + 24, GROUND_Y - h - 56);
    ctx.lineTo(hx + 52, GROUND_Y - h - 36);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(120, 113, 108, 0.35)';
    ctx.fillRect(hx + 12, GROUND_Y - h - 22, 8, 10);
    ctx.fillRect(hx + 28, GROUND_Y - h - 22, 8, 10);
  }

  // Servi ağaçları — arka planda
  for (let x = startX + 90; x < startX + width; x += 170) {
    ctx.fillStyle = 'rgba(22, 78, 46, 0.45)';
    ctx.beginPath();
    ctx.moveTo(x, GROUND_Y - 30);
    ctx.lineTo(x - 6, GROUND_Y - 30);
    ctx.lineTo(x, GROUND_Y - 72);
    ctx.lineTo(x + 6, GROUND_Y - 30);
    ctx.closePath();
    ctx.fill();
  }

  // Taş duvar — yol kenarı
  ctx.fillStyle = 'rgba(168, 162, 158, 0.35)';
  ctx.fillRect(startX, GROUND_Y - 6, width, 6);
  for (let x = startX + 16; x < startX + width; x += 32) {
    ctx.fillStyle = 'rgba(120, 113, 108, 0.3)';
    ctx.fillRect(x, GROUND_Y - 18, 4, 18);
  }

  // Asma pergolası — yol kenarında
  for (let x = startX + 110; x < startX + width; x += 240) {
    ctx.fillStyle = '#92400e';
    ctx.fillRect(x, GROUND_Y - 38, 3, 38);
    ctx.fillRect(x + 36, GROUND_Y - 38, 3, 38);
    ctx.fillRect(x, GROUND_Y - 38, 39, 3);
    ctx.fillStyle = 'rgba(101, 163, 13, 0.35)';
    ctx.beginPath();
    ctx.ellipse(x + 19, GROUND_Y - 42, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Şarap fıçıları — dekor
  ctx.font = '12px sans-serif';
  ctx.globalAlpha = 0.45;
  for (let x = startX + 60; x < startX + width; x += 220) {
    ctx.fillText('🍷', x, GROUND_Y - 8);
    ctx.fillText('🍇', x + 50, GROUND_Y - 32);
  }
  ctx.globalAlpha = 1;
}

function drawSelcukDecor(ctx, startX, width) {
  // Uzak tepe
  ctx.fillStyle = 'rgba(87, 83, 78, 0.25)';
  ctx.beginPath();
  ctx.moveTo(startX, GROUND_Y - 24);
  for (let i = 0; i <= Math.ceil(width / 90); i++) {
    ctx.lineTo(startX + i * 90, GROUND_Y - 50 - (i % 3) * 10);
  }
  ctx.lineTo(startX + width, GROUND_Y);
  ctx.lineTo(startX, GROUND_Y);
  ctx.closePath();
  ctx.fill();

  // Uzak tapınak silüeti — arka planda sabit
  for (let i = 0; i < 2; i++) {
    const tx = startX + width * (0.35 + i * 0.35);
    ctx.fillStyle = 'rgba(87, 83, 78, 0.35)';
    ctx.fillRect(tx - 36, GROUND_Y - 80, 72, 80);
    ctx.beginPath();
    ctx.moveTo(tx - 44, GROUND_Y - 80);
    ctx.lineTo(tx, GROUND_Y - 108);
    ctx.lineTo(tx + 44, GROUND_Y - 80);
    ctx.closePath();
    ctx.fill();
  }

  // Devrilmiş sütunlar — yatay kalıntı (hareketli değil)
  for (let x = startX + 120; x < startX + width; x += 220) {
    ctx.fillStyle = 'rgba(168, 162, 158, 0.4)';
    ctx.fillRect(x, GROUND_Y - 8, 52, 8);
    ctx.fillRect(x + 44, GROUND_Y - 14, 8, 14);
    ctx.fillStyle = 'rgba(120, 113, 108, 0.3)';
    ctx.fillRect(x + 4, GROUND_Y - 6, 10, 4);
    ctx.fillRect(x + 22, GROUND_Y - 6, 10, 4);
  }

  // Ayakta duran sütun kalıntıları — yol kenarı, kısa
  for (let i = 0; i < Math.ceil(width / 200); i++) {
    const cx = startX + 60 + i * 200;
    ctx.fillStyle = 'rgba(168, 162, 158, 0.45)';
    ctx.fillRect(cx, GROUND_Y - 36, 10, 36);
    ctx.fillRect(cx - 6, GROUND_Y - 40, 22, 6);
    ctx.fillStyle = 'rgba(120, 113, 108, 0.25)';
    ctx.fillRect(cx + 1, GROUND_Y - 30, 8, 3);
    ctx.fillRect(cx + 1, GROUND_Y - 20, 8, 3);
  }

  ctx.font = '14px sans-serif';
  ctx.globalAlpha = 0.4;
  ctx.fillText('🏛️', startX + width * 0.12, GROUND_Y - 52);
  ctx.globalAlpha = 1;
}

function drawDogumGunuDecor(ctx, startX, width) {
  // Boğaz / deniz — promenad altı
  ctx.fillStyle = '#1a5f7a';
  ctx.fillRect(startX, GROUND_Y + 6, width, 24);
  ctx.fillStyle = 'rgba(103, 232, 249, 0.3)';
  for (let i = 0; i < width; i += 28) {
    ctx.beginPath();
    ctx.moveTo(startX + i, GROUND_Y + 10);
    ctx.quadraticCurveTo(startX + i + 10, GROUND_Y + 6, startX + i + 20, GROUND_Y + 10);
    ctx.lineTo(startX + i + 20, GROUND_Y + 16);
    ctx.lineTo(startX + i, GROUND_Y + 16);
    ctx.closePath();
    ctx.fill();
  }

  // İstanbul silüeti — arka planda
  for (let x = startX + 40; x < startX + width; x += 150) {
    const h = 48 + ((x / 150) % 3) * 18;
    ctx.fillStyle = 'rgba(45, 27, 78, 0.35)';
    ctx.fillRect(x, GROUND_Y - h - 28, 44 + (x % 2) * 16, h);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.18)';
    for (let row = 0; row < 2; row++) {
      ctx.fillRect(x + 10, GROUND_Y - h - 18 + row * 14, 7, 8);
      ctx.fillRect(x + 26, GROUND_Y - h - 18 + row * 14, 7, 8);
    }
  }

  // Cami kubbesi silüeti
  const mx = startX + width * 0.62;
  ctx.fillStyle = 'rgba(45, 27, 78, 0.4)';
  ctx.fillRect(mx - 14, GROUND_Y - 62, 28, 62);
  ctx.beginPath();
  ctx.arc(mx, GROUND_Y - 62, 16, Math.PI, 0);
  ctx.fill();

  // Deniz tarafı palmiye
  for (let x = startX + 100; x < startX + width; x += 180) {
    ctx.fillStyle = '#92400e';
    ctx.fillRect(x, GROUND_Y + 10, 4, 18);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
    ctx.beginPath();
    ctx.arc(x + 2, GROUND_Y + 4, 11, 0, Math.PI * 2);
    ctx.fill();
  }

  // Kordon korkuluk
  ctx.fillStyle = 'rgba(120, 113, 108, 0.4)';
  for (let x = startX + 12; x < startX + width; x += 26) {
    ctx.fillRect(x, GROUND_Y + 2, 2, 7);
  }
  ctx.fillRect(startX, GROUND_Y + 2, width, 2);

  // Sokak lambası + balon (yol kenarı)
  for (let x = startX + 70; x < startX + width; x += 220) {
    ctx.fillStyle = '#78716c';
    ctx.fillRect(x, GROUND_Y - 44, 3, 44);
    ctx.fillStyle = 'rgba(253, 224, 171, 0.4)';
    ctx.beginPath();
    ctx.arc(x + 1, GROUND_Y - 46, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '14px sans-serif';
    ctx.globalAlpha = 0.5;
    ctx.fillText('🎈', x - 5, GROUND_Y - 54);
    ctx.globalAlpha = 1;
  }

  // Pasta ve hediye — promenad kenarı
  ctx.font = '16px sans-serif';
  ctx.globalAlpha = 0.45;
  for (let x = startX + 180; x < startX + width; x += 340) {
    ctx.fillText('🎂', x, GROUND_Y - 6);
    ctx.fillText('🎁', x + 36, GROUND_Y - 4);
  }
  ctx.globalAlpha = 1;

  // Tekne — denizde
  ctx.font = '14px sans-serif';
  ctx.globalAlpha = 0.45;
  ctx.fillText('⛵', startX + width * 0.25, GROUND_Y + 20);
  ctx.globalAlpha = 1;
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
