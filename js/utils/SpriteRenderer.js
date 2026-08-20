import { COLORS } from '../config/assets.js';

/**
 * Placeholder pixel-art çizimleri.
 * ASSETS.useCustomSprites = true olduğunda Image objeleri kullanılır.
 */
export class SpriteRenderer {
  constructor(assetLoader) {
    this.assets = assetLoader;
  }

  drawPlayer(ctx, x, y, w, h, facing, state, animFrame, character = 'girl') {
    this.drawCharacter(ctx, x, y, w, h, character, facing, state, animFrame);
  }

  drawCharacter(ctx, x, y, w, h, character, facing, state, animFrame) {
    if (character === 'fadil') {
      this.drawFadil(ctx, x, y, w, h, facing, state, animFrame);
    } else {
      this.drawGirl(ctx, x, y, w, h, facing, state, animFrame);
    }
  }

  drawGirl(ctx, x, y, w, h, facing, state, animFrame) {
    const img = this.assets?.get('player');
    if (img) {
      ctx.save();
      if (facing < 0) {
        ctx.translate(x + w, y);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, w, h);
      } else {
        ctx.drawImage(img, x, y, w, h);
      }
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.translate(x, y);

    const bob = state === 'idle' ? Math.sin(animFrame * 6) * 1 : 0;
    const legOffset = state === 'run' ? Math.sin(animFrame * 12) * 3 : 0;

    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 1, w / 2.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#581c87';
    ctx.fillRect(4 + legOffset, h - 8, 4, 8);
    ctx.fillRect(w - 8 - legOffset, h - 8, 4, 8);

    ctx.fillStyle = COLORS.playerBody;
    ctx.fillRect(3, 8 + bob, w - 6, h - 16);

    const armSwing = state === 'run' ? Math.sin(animFrame * 12) * 4 : 0;
    if (state === 'attack') {
      ctx.fillStyle = COLORS.playerSkin;
      const armX = facing > 0 ? w - 2 : -6;
      ctx.fillRect(armX, 10, 8, 4);
      ctx.fillStyle = '#c084fc';
      ctx.fillRect(facing > 0 ? w + 2 : -10, 8, 10, 6);
    } else {
      ctx.fillStyle = COLORS.playerSkin;
      ctx.fillRect(2, 10 + armSwing, 4, 6);
      ctx.fillRect(w - 6, 10 - armSwing, 4, 6);
    }

    ctx.fillStyle = COLORS.playerSkin;
    ctx.fillRect(4, 0 + bob, w - 8, 10);

    ctx.fillStyle = COLORS.playerHair;
    ctx.fillRect(3, 0 + bob, w - 6, 5);
    ctx.fillRect(2, 2 + bob, 5, 8);
    ctx.fillRect(w - 7, 2 + bob, 5, 8);

    ctx.fillStyle = '#2d1b4e';
    ctx.fillRect(7, 4 + bob, 2, 2);
    ctx.fillRect(12, 4 + bob, 2, 2);

    ctx.fillStyle = 'rgba(255,107,157,0.4)';
    ctx.fillRect(6, 6 + bob, 3, 2);

    ctx.restore();
  }

  drawFadil(ctx, x, y, w, h, facing, state, animFrame) {
    ctx.save();
    ctx.translate(x, y);

    const bob = state === 'idle' ? Math.sin(animFrame * 6) * 1 : 0;
    const legOffset = state === 'run' ? Math.sin(animFrame * 12) * 3 : 0;

    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 1, w / 2.5, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.fadilPants;
    ctx.fillRect(4 + legOffset, h - 8, 4, 8);
    ctx.fillRect(w - 8 - legOffset, h - 8, 4, 8);

    ctx.fillStyle = COLORS.fadilBody;
    ctx.fillRect(3, 8 + bob, w - 6, h - 16);

    const armSwing = state === 'run' ? Math.sin(animFrame * 12) * 4 : 0;
    ctx.fillStyle = COLORS.playerSkin;
    ctx.fillRect(2, 10 + armSwing, 4, 6);
    ctx.fillRect(w - 6, 10 - armSwing, 4, 6);

    ctx.fillStyle = COLORS.playerSkin;
    ctx.fillRect(4, 0 + bob, w - 8, 10);

    ctx.fillStyle = COLORS.fadilHair;
    ctx.fillRect(3, 0 + bob, w - 6, 4);
    ctx.fillRect(facing > 0 ? 3 : w - 7, 1 + bob, 5, 4);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(7, 4 + bob, 2, 2);
    ctx.fillRect(12, 4 + bob, 2, 2);

    ctx.restore();
  }

  /** Dünya koordinatlarında koşup kucaklaşan çift */
  drawReunionScene(ctx, playerX, loverX, y, animFrame, playerType, phase) {
    const w = 22;
    const h = 30;
    const py = y;

    if (phase === 'running') {
      this.drawCharacter(ctx, playerX, py, w, h, playerType, 1, 'run', animFrame);
      const loverChar = playerType === 'girl' ? 'fadil' : 'girl';
      this.drawCharacter(ctx, loverX, py, w, h, loverChar, -1, 'idle', animFrame);
    } else {
      const cx = (playerX + loverX + w) / 2;
      const hugT = Math.max(0, animFrame - 0.1);
      this.drawHuggingCouple(ctx, cx, py + h / 2, 1.1, hugT, playerType);
    }
  }

  /** Kucaklaşan çift — sarılma animasyonu */
  drawHuggingCouple(ctx, cx, cy, scale, animFrame, playerType = 'girl') {
    const w = 22 * scale;
    const h = 30 * scale;
    const embrace = Math.min(1, animFrame / 1.0);
    const squeeze = embrace * 8;
    const bob = Math.sin(animFrame * 2.5) * 2;

    const leftChar = playerType === 'girl' ? 'girl' : 'fadil';
    const rightChar = playerType === 'girl' ? 'fadil' : 'girl';

    const baseY = cy - h / 2 + bob;

    this.drawCharacter(ctx, cx - w - 2 + squeeze, baseY, w, h, leftChar, 1, 'idle', animFrame);
    this.drawCharacter(ctx, cx + 2 - squeeze, baseY, w, h, rightChar, -1, 'idle', animFrame);

    if (embrace > 0.35) {
      ctx.fillStyle = COLORS.playerSkin;
      ctx.fillRect(cx - 10 * scale, cy - 2 + bob, 20 * scale, 5 * scale);
      ctx.fillRect(cx - 14 * scale, cy + 2 + bob, 6 * scale, 4 * scale);
      ctx.fillRect(cx + 8 * scale, cy + 2 + bob, 6 * scale, 4 * scale);
    }

    if (embrace > 0.5) {
      for (let i = 0; i < 4; i++) {
        const hx = cx + Math.sin(animFrame * 3 + i * 1.5) * (18 + i * 4);
        const hy = baseY - 18 + Math.cos(animFrame * 2.5 + i) * 6;
        ctx.fillStyle = '#ff6b9d';
        ctx.beginPath();
        ctx.arc(hx, hy, (3 + i) * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /** UI önizlemesi — sarılma */
  drawKissingCouple(ctx, cx, cy, scale, animFrame, playerType = 'girl') {
    this.drawHuggingCouple(ctx, cx, cy, scale, animFrame, playerType);
  }

  drawLover(ctx, x, y, w, h, facing, animFrame, playerType = 'girl') {
    const loverChar = playerType === 'girl' ? 'fadil' : 'girl';
    this.drawCharacter(ctx, x, y, w, h, loverChar, facing, 'idle', animFrame);
  }

  drawEnemy(ctx, x, y, w, h, type, animFrame, extra = {}) {
    const img = this.assets?.get('enemy');
    if (img && (type === 'walker' || type === 'slime')) {
      ctx.drawImage(img, x, y, w, h);
      return;
    }

    ctx.save();
    ctx.translate(x, y);
    const bounce = Math.abs(Math.sin(animFrame * 8)) * 2;
    const { health = 1, maxHealth = 1, chargeState } = extra;

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 1, w / 2, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    if (type === 'slime') {
      ctx.fillStyle = '#6ee7b7';
      ctx.beginPath();
      ctx.moveTo(2, h);
      ctx.quadraticCurveTo(w / 2, h - 10 - bounce, w - 2, h);
      ctx.fill();
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(w / 2 - 2, h - 8 - bounce, 4, 4);
      ctx.fillRect(w / 2 + 4, h - 6 - bounce, 3, 3);
    } else if (type === 'bat') {
      const wing = Math.sin(animFrame * 15) * 5;
      ctx.fillStyle = '#4c1d95';
      ctx.beginPath();
      ctx.moveTo(w / 2, 6);
      ctx.lineTo(0, 4 + wing);
      ctx.lineTo(w / 2, 11);
      ctx.lineTo(w, 4 - wing);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#a78bfa';
      ctx.fillRect(w / 2 - 4, 7, 8, 6);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w / 2 - 2, 9, 2, 2);
      ctx.fillRect(w / 2 + 1, 9, 2, 2);
    } else if (type === 'bee') {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(w / 2, h / 2, w / 2 - 1, h / 2 - 1, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(3, h / 2 - 2, w - 6, 3);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.ellipse(w / 2 + 4, h / 2 - 4, 5, 3, 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'ghost') {
      ctx.fillStyle = '#c4b5fd';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 - 2, w / 2 - 2, Math.PI, 0);
      ctx.lineTo(w - 2, h);
      ctx.lineTo(w / 2 + 4, h - 4);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(w / 2 - 4, h - 4);
      ctx.lineTo(2, h);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#312e81';
      ctx.fillRect(w / 2 - 5, h / 2 - 4, 3, 4);
      ctx.fillRect(w / 2 + 2, h / 2 - 4, 3, 4);
    } else if (type === 'crab') {
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(2, h - 10, w - 4, 8);
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(0, h - 8, 5, 4);
      ctx.fillRect(w - 5, h - 8, 5, 4);
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(6, h - 9, 3, 3);
      ctx.fillRect(w - 9, h - 9, 3, 3);
    } else if (type === 'jumper') {
      ctx.fillStyle = '#f97316';
      ctx.fillRect(3, 5 + bounce, w - 6, h - 7);
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(2, h - 4, 5, 4);
      ctx.fillRect(w - 7, h - 4, 5, 4);
      ctx.fillStyle = '#fff';
      ctx.fillRect(6, 8 + bounce, 4, 4);
      ctx.fillRect(w - 10, 8 + bounce, 4, 4);
    } else if (type === 'charger') {
      const windup = chargeState === 'windup';
      const charging = chargeState === 'charge';
      ctx.fillStyle = charging ? '#dc2626' : windup ? '#fbbf24' : '#64748b';
      ctx.fillRect(2, 4, w - 4, h - 5);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(4, 2, w - 8, 6);
      if (charging) {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(w - 6, h / 2, 4, 2);
        ctx.fillRect(2, h / 2, 4, 2);
      }
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(6, 9, 4, 4);
      ctx.fillRect(w - 10, 9, 4, 4);
    } else if (type === 'turtle') {
      const shell = health < maxHealth;
      ctx.fillStyle = shell ? '#78716c' : '#65a30d';
      ctx.beginPath();
      ctx.ellipse(w / 2, h / 2, w / 2 - 1, h / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#3f6212';
      ctx.fillRect(4, h / 2 - 2, w - 8, 2);
      ctx.fillRect(w / 2 - 1, h / 2 - 5, 2, 8);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(2, h - 6, 5, 4);
      ctx.fillRect(w - 7, h - 6, 5, 4);
    } else {
      ctx.fillStyle = COLORS.enemyBody;
      ctx.fillRect(2, 4 + bounce, w - 4, h - 6);
      ctx.fillStyle = COLORS.enemyEye;
      ctx.fillRect(5, 8 + bounce, 3, 3);
      ctx.fillRect(w - 8, 8 + bounce, 3, 3);
    }

    ctx.restore();
  }

  drawBoss(ctx, x, y, w, h, phase, animFrame, hurtFlash) {
    ctx.save();
    ctx.translate(x, y);

    if (hurtFlash) {
      ctx.globalAlpha = 0.5 + Math.sin(animFrame * 30) * 0.3;
    }

    const pulse = Math.sin(animFrame * 3) * 2;

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 2, w / 2.2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.bossBody;
    ctx.fillRect(8, 20 + pulse, w - 16, h - 24);

    ctx.fillStyle = '#991b1b';
    ctx.fillRect(4, 10, w - 8, 16);

    ctx.fillStyle = COLORS.bossEye;
    ctx.fillRect(16, 16, 8, 6);
    ctx.fillRect(w - 24, 16, 8, 6);

    ctx.fillStyle = '#450a0a';
    ctx.fillRect(20, 18, 4, 3);
    ctx.fillRect(w - 24, 18, 4, 3);

    // Boynuzlar
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.moveTo(12, 12);
    ctx.lineTo(6, 0);
    ctx.lineTo(18, 8);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w - 12, 12);
    ctx.lineTo(w - 6, 0);
    ctx.lineTo(w - 18, 8);
    ctx.fill();

    ctx.restore();
  }

  drawHeart(ctx, x, y, size, animFrame) {
    ctx.save();
    const bob = Math.sin(animFrame * 5 + x) * 2;
    const scale = 1 + Math.sin(animFrame * 8 + x) * 0.1;
    ctx.translate(x + size / 2, y + size / 2 + bob);
    ctx.scale(scale, scale);
    ctx.fillStyle = COLORS.heart;
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❤', 0, 0);
    ctx.restore();
  }

  drawKey(ctx, x, y, size, animFrame) {
    ctx.save();
    const rot = Math.sin(animFrame * 4) * 0.15;
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(rot);
    ctx.fillStyle = COLORS.key;
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔑', 0, 0);
    ctx.restore();
  }

  drawPhotoPiece(ctx, x, y, size, index) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1;
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
    ctx.fillStyle = '#c084fc';
    ctx.font = `${size * 0.5}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`📷${index + 1}`, x + size / 2, y + size / 2);
    ctx.restore();
  }

  drawPlatform(ctx, x, y, w, h, theme = 'forest') {
    const colors = {
      forest: { top: '#4ade80', body: '#166534', detail: '#22c55e' },
      cave: { top: '#78716c', body: '#44403c', detail: '#a8a29e' },
      castle: { top: '#a78bfa', body: '#5b21b6', detail: '#8b5cf6' },
      lefkosa: { top: '#d4a574', body: '#6b5344', detail: '#c9a66b' },
      girne: { top: '#67e8f9', body: '#0e7490', detail: '#22d3ee' },
      magusa: { top: '#fbbf24', body: '#78350f', detail: '#d97706' },
      dipkarpaz: { top: '#fb923c', body: '#9a3412', detail: '#fdba74' },
      hayvanat: { top: '#86efac', body: '#166534', detail: '#4ade80' },
      iconova: { top: '#c4b5fd', body: '#5b21b6', detail: '#a78bfa' },
      petpark: { top: '#fde047', body: '#a16207', detail: '#facc15' },
      sehitkamil: { top: '#fb923c', body: '#7c2d12', detail: '#fdba74' },
      alsancak: { top: '#7dd3fc', body: '#0369a1', detail: '#38bdf8' },
      goztepe: { top: '#93c5fd', body: '#1d4ed8', detail: '#60a5fa' },
      gaziemir: { top: '#cbd5e1', body: '#475569', detail: '#94a3b8' },
      kusadasi: { top: '#67e8f9', body: '#0e7490', detail: '#22d3ee' },
      sirince: { top: '#fcd34d', body: '#92400e', detail: '#fbbf24' },
      selcuk: { top: '#e7e5e4', body: '#57534e', detail: '#a8a29e' },
      dogumgunu: { top: '#fda4af', body: '#9d174d', detail: '#fb7185' },
    };
    const c = colors[theme] || colors.forest;

    ctx.fillStyle = c.body;
    ctx.fillRect(x, y + 2, w, h - 2);

    ctx.fillStyle = c.top;
    ctx.fillRect(x, y, w, 4);

    ctx.fillStyle = c.detail;
    for (let i = 0; i < w; i += 16) {
      ctx.fillRect(x + i + 4, y + 6, 8, 2);
    }
  }

  drawSpike(ctx, x, y, w, h) {
    ctx.fillStyle = COLORS.spike;
    const spikeW = 8;
    const count = Math.floor(w / spikeW);
    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * spikeW, y + h);
      ctx.lineTo(x + i * spikeW + spikeW / 2, y);
      ctx.lineTo(x + (i + 1) * spikeW, y + h);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawDoor(ctx, x, y, w, h, open, hasKey) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = open ? 'rgba(255,255,255,0.1)' : '#92400e';
    ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

    if (!open) {
      ctx.fillStyle = COLORS.key;
      ctx.beginPath();
      ctx.arc(x + w - 8, y + h / 2, 3, 0, Math.PI * 2);
      ctx.fill();

      if (hasKey) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + w / 2, y + h / 2, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(x + w / 2, y + 4, w / 2 - 4, h - 8);
    }

    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(open ? '✨' : '🚪', x + w / 2, y - 6);
  }
}
