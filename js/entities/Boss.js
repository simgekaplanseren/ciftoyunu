import { aabbOverlap } from '../utils/Collision.js';

export class Boss {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 56;
    this.maxHealth = 10;
    this.health = 10;
    this.phase = 0;
    this.animFrame = 0;
    this.hurtFlash = 0;
    this.dead = false;
    this.vx = 0;
    this.direction = -1;
    this.attackTimer = 1;
    this.attackCooldown = 2;
    this.chargeTimer = 0;
    this.chargeDuration = 0.8;
    this.chargeSpeed = 120;
    this.patrolMin = x - 100;
    this.patrolMax = x + 100;
    this.state = 'idle';
    this.defeated = false;
    this.defeatTimer = 0;
  }

  update(dt, player) {
    if (this.defeated) {
      this.defeatTimer += dt;
      this.animFrame += dt;
      return;
    }

    if (this.dead) return;

    this.animFrame += dt;
    if (this.hurtFlash > 0) this.hurtFlash -= dt;

    this.attackTimer -= dt;

    const dist = player.x - this.x;
    this.direction = dist > 0 ? 1 : -1;

    if (this.state === 'charge') {
      this.chargeTimer -= dt;
      this.vx = this.chargeSpeed * this.direction;
      this.x += this.vx * dt;

      if (this.chargeTimer <= 0) {
        this.state = 'idle';
        this.attackTimer = this.attackCooldown;
      }
    } else {
      this.vx = 30 * this.direction;
      this.x += this.vx * dt;

      if (this.x <= this.patrolMin) {
        this.x = this.patrolMin;
        this.direction = 1;
      }
      if (this.x + this.width >= this.patrolMax) {
        this.x = this.patrolMax - this.width;
        this.direction = -1;
      }

      if (this.attackTimer <= 0) {
        this.state = 'charge';
        this.chargeTimer = this.chargeDuration;
      }
    }

    if (aabbOverlap(this.getBounds(), player.getBounds()) && player.invincible <= 0) {
      player.takeDamage(2);
    }
  }

  takeHit(attackBox) {
    if (this.dead || this.defeated || !attackBox) return false;
    if (!aabbOverlap(this.getBounds(), attackBox)) return false;

    this.health -= 1;
    this.hurtFlash = 0.3;

    if (this.health <= 0) {
      this.dead = true;
      this.defeated = true;
      this.defeatTimer = 0;
      return true;
    }
    return false;
  }

  draw(ctx, sprites) {
    if (this.dead && !this.defeated) return;

    if (this.defeated) {
      const alpha = Math.max(0, 1 - this.defeatTimer / 2);
      ctx.globalAlpha = alpha;
      sprites.drawBoss(ctx, this.x, this.y - this.defeatTimer * 20, this.width, this.height, this.phase, this.animFrame, false);
      ctx.globalAlpha = 1;
      return;
    }

    sprites.drawBoss(ctx, this.x, this.y, this.width, this.height, this.phase, this.animFrame, this.hurtFlash > 0);
  }

  drawHealthBar(ctx, canvasWidth) {
    const barW = 200;
    const barH = 10;
    const x = (canvasWidth - barW) / 2;
    const y = 12;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x - 2, y - 2, barW + 4, barH + 4);

    ctx.fillStyle = '#450a0a';
    ctx.fillRect(x, y, barW, barH);

    const ratio = this.health / this.maxHealth;
    ctx.fillStyle = ratio > 0.3 ? '#ef4444' : '#991b1b';
    ctx.fillRect(x, y, barW * ratio, barH);

    ctx.fillStyle = '#fff';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('👹 BOSS', x + barW / 2, y - 2);
  }

  getBounds() {
    return { x: this.x + 4, y: this.y + 8, width: this.width - 8, height: this.height - 8 };
  }

  isDefeatComplete() {
    return this.defeated && this.defeatTimer > 2;
  }
}
