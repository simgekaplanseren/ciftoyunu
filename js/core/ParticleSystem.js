import { drawPixelHeart } from '../utils/HeartDraw.js';

export class Particle {
  constructor(x, y, vx, vy, life, color, size, type = 'dot') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.color = color;
    this.size = size;
    this.type = type;
    this.gravity = type === 'heart' ? 30 : 120;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.life -= dt;
    return this.life > 0;
  }

  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;

    if (this.type === 'heart') {
      drawPixelHeart(ctx, this.x, this.y, this.size * 1.6, this.color);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    ctx.globalAlpha = 1;
  }
}

export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, count, options = {}) {
    const {
      color = '#ff6b9d',
      speed = 80,
      life = 0.6,
      size = 3,
      type = 'dot',
      spread = Math.PI * 2,
      angle = -Math.PI / 2,
    } = options;

    for (let i = 0; i < count; i++) {
      const a = angle + (Math.random() - 0.5) * spread;
      const s = speed * (0.5 + Math.random() * 0.5);
      this.particles.push(new Particle(
        x, y,
        Math.cos(a) * s,
        Math.sin(a) * s,
        life * (0.7 + Math.random() * 0.3),
        color,
        size * (0.7 + Math.random() * 0.6),
        type
      ));
    }
  }

  emitHearts(x, y, count = 5) {
    this.emit(x, y, count, { type: 'heart', color: '#ff6b9d', size: 8, speed: 60, life: 0.8, spread: Math.PI });
  }

  emitHit(x, y) {
    this.emit(x, y, 6, { color: '#fbbf24', speed: 100, size: 2, life: 0.4 });
  }

  emitDust(x, y) {
    this.emit(x, y, 4, { color: '#a78bfa', speed: 40, size: 2, life: 0.5, angle: -Math.PI / 2, spread: Math.PI / 3 });
  }

  update(dt) {
    this.particles = this.particles.filter((p) => p.update(dt));
  }

  draw(ctx) {
    for (const p of this.particles) {
      p.draw(ctx);
    }
  }

  clear() {
    this.particles = [];
  }
}
