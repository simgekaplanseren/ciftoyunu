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

  /** Dünya koordinatlarında koşup öpüşen çift */
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
      const kissT = Math.max(0, animFrame - 0.1);
      this.drawKissingCouple(ctx, cx, py + h / 2, 1.1, kissT, playerType);
    }
  }

  /** Öpüşen çift — UI / yakın plan animasyonu */
  drawKissingCouple(ctx, cx, cy, scale, animFrame, playerType = 'girl') {
    const w = 22 * scale;
    const h = 30 * scale;
    const approach = Math.min(1, animFrame / 1.2);
    const kiss = Math.min(1, Math.max(0, (animFrame - 1.2) / 0.8));
    const lean = approach * 4 + kiss * 3;
    const bob = Math.sin(animFrame * 3) * 1.5;

    const leftChar = playerType === 'girl' ? 'girl' : 'fadil';
    const rightChar = playerType === 'girl' ? 'fadil' : 'girl';

    this.drawCharacter(ctx, cx - w - 4 + lean, cy + bob, w, h, leftChar, 1, 'idle', animFrame);
    this.drawCharacter(ctx, cx + 4 - lean, cy + bob, w, h, rightChar, -1, 'idle', animFrame);

    if (kiss > 0.3) {
      ctx.font = `${14 * scale}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('💋', cx, cy - 4 + bob);
      for (let i = 0; i < 3; i++) {
        const hx = cx + (Math.sin(animFrame * 4 + i * 2) * 20);
        const hy = cy - 20 + (Math.cos(animFrame * 3 + i) * 8);
        ctx.font = `${(8 + i * 2) * scale}px sans-serif`;
        ctx.fillText('❤', hx, hy);
      }
    }
  }

  drawLover(ctx, x, y, w, h, facing, animFrame, playerType = 'girl') {
    const loverChar = playerType === 'girl' ? 'fadil' : 'girl';
    this.drawCharacter(ctx, x, y, w, h, loverChar, facing, 'idle', animFrame);
  }

  drawEnemy(ctx, x, y, w, h, type, animFrame) {
    const img = this.assets?.get('enemy');
    if (img) {
      ctx.drawImage(img, x, y, w, h);
      return;
    }

    ctx.save();
    ctx.translate(x, y);
    const bounce = Math.abs(Math.sin(animFrame * 8)) * 2;

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 1, w / 2, 2, 0, 0, Math.PI * 2);
    ctx.fill();

    const bodyColor = type === 'slime' ? '#6ee7b7' : type === 'bat' ? '#4c1d95' : COLORS.enemyBody;
    ctx.fillStyle = bodyColor;

    if (type === 'slime') {
      ctx.beginPath();
      ctx.moveTo(2, h);
      ctx.quadraticCurveTo(w / 2, h - 10 - bounce, w - 2, h);
      ctx.fill();
    } else if (type === 'bat') {
      const wingFlap = Math.sin(animFrame * 15) * 4;
      ctx.fillStyle = '#4c1d95';
      ctx.beginPath();
      ctx.moveTo(w / 2, 6);
      ctx.lineTo(0, 4 + wingFlap);
      ctx.lineTo(w / 2, 10);
      ctx.lineTo(w, 4 - wingFlap);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(w / 2 - 4, 6, 8, 6);
    } else {
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
