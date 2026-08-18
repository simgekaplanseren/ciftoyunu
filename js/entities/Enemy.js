import { aabbOverlap } from '../utils/Collision.js';

export class Enemy {
  constructor(x, y, width, height, options = {}) {
    this.x = x;
    this.y = y;
    this.width = width || 24;
    this.height = height || 20;
    this.type = options.type || 'walker';
    this.patrolMin = options.patrolMin ?? x - 60;
    this.patrolMax = options.patrolMax ?? x + 60;
    this.speed = options.speed ?? 40;
    this.health = options.health ?? 1;
    this.direction = 1;
    this.dead = false;
    this.animFrame = 0;
    this.damage = options.damage ?? 1;
    this.flyAmplitude = options.flyAmplitude ?? 30;
    this.baseY = y;
    this.hitFlash = 0;
  }

  update(dt) {
    if (this.dead) return;

    this.animFrame += dt;
    if (this.hitFlash > 0) this.hitFlash -= dt;

    if (this.type === 'walker' || this.type === 'slime') {
      this.x += this.speed * this.direction * dt;
      if (this.x <= this.patrolMin) {
        this.x = this.patrolMin;
        this.direction = 1;
      }
      if (this.x + this.width >= this.patrolMax) {
        this.x = this.patrolMax - this.width;
        this.direction = -1;
      }
    } else if (this.type === 'bat') {
      this.x += this.speed * this.direction * dt;
      this.y = this.baseY + Math.sin(this.animFrame * 3) * this.flyAmplitude;
      if (this.x <= this.patrolMin || this.x + this.width >= this.patrolMax) {
        this.direction *= -1;
      }
    }
  }

  takeHit() {
    this.health -= 1;
    this.hitFlash = 0.2;
    if (this.health <= 0) {
      this.dead = true;
      return true;
    }
    return false;
  }

  draw(ctx, sprites) {
    if (this.dead) return;
    if (this.hitFlash > 0) {
      ctx.globalAlpha = 0.5 + Math.sin(this.animFrame * 40) * 0.3;
    }
    sprites.drawEnemy(ctx, this.x, this.y, this.width, this.height, this.type, this.animFrame);
    ctx.globalAlpha = 1;
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }

  collidesWith(entity) {
    return !this.dead && aabbOverlap(this.getBounds(), entity);
  }
}
