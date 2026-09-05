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
    this.health = options.health ?? (this.type === 'turtle' ? 2 : 1);
    this.maxHealth = this.health;
    this.direction = options.direction ?? 1;
    this.dead = false;
    this.animFrame = 0;
    this.damage = options.damage ?? 1;
    this.flyAmplitude = options.flyAmplitude ?? 24;
    this.baseY = y;
    this.hitFlash = 0;

    this.jumpCooldown = options.jumpInterval ?? 2.2;
    this.jumping = false;
    this.jumpT = 0;

    this.chargeState = 'patrol';
    this.chargeTimer = options.chargeInterval ?? 2.5;
    this.chargeSpeed = options.chargeSpeed ?? 120;
  }

  update(dt) {
    if (this.dead) return;

    this.animFrame += dt;
    if (this.hitFlash > 0) this.hitFlash -= dt;

    switch (this.type) {
      case 'slime':
      case 'walker':
        this._patrol(dt);
        break;
      case 'bat':
        this._patrol(dt);
        this.y = this.baseY + Math.sin(this.animFrame * 4) * this.flyAmplitude;
        break;
      case 'bee':
        this._patrol(dt, this.speed * 1.2);
        this.y = this.baseY + Math.sin(this.animFrame * 10) * (this.flyAmplitude * 0.6);
        break;
      case 'bird':
        if (this.speed > 0) this._patrol(dt, this.speed);
        this.y = this.baseY + Math.sin(this.animFrame * 1.9) * this.flyAmplitude;
        break;
      case 'ghost':
        this.x += this.speed * this.direction * dt * 0.7;
        this.y = this.baseY + Math.sin(this.animFrame * 2.5) * this.flyAmplitude;
        this._bouncePatrol();
        break;
      case 'crab':
        this._patrol(dt, this.speed * 1.15);
        break;
      case 'jumper':
        this._patrol(dt, this.speed * 0.85);
        this._updateJumper(dt);
        break;
      case 'charger':
        this._updateCharger(dt);
        break;
      case 'turtle':
        this._patrol(dt, this.health < this.maxHealth ? this.speed * 1.4 : this.speed * 0.65);
        break;
      default:
        this._patrol(dt);
    }
  }

  _patrol(dt, speed = this.speed) {
    this.x += speed * this.direction * dt;
    this._bouncePatrol();
  }

  _bouncePatrol() {
    if (this.x <= this.patrolMin) {
      this.x = this.patrolMin;
      this.direction = 1;
    }
    if (this.x + this.width >= this.patrolMax) {
      this.x = this.patrolMax - this.width;
      this.direction = -1;
    }
  }

  _updateJumper(dt) {
    this.jumpCooldown -= dt;
    if (!this.jumping && this.jumpCooldown <= 0) {
      this.jumping = true;
      this.jumpT = 0;
    }
    if (this.jumping) {
      this.jumpT += dt;
      const p = Math.min(this.jumpT / 0.55, 1);
      this.y = this.baseY - Math.sin(p * Math.PI) * 40;
      if (this.jumpT >= 0.55) {
        this.jumping = false;
        this.y = this.baseY;
        this.jumpCooldown = 2 + Math.random() * 0.8;
      }
    }
  }

  _updateCharger(dt) {
    if (this.chargeState === 'patrol') {
      this._patrol(dt, this.speed * 0.6);
      this.chargeTimer -= dt;
      if (this.chargeTimer <= 0) {
        this.chargeState = 'windup';
        this.chargeTimer = 0.45;
      }
    } else if (this.chargeState === 'windup') {
      this.chargeTimer -= dt;
      if (this.chargeTimer <= 0) {
        this.chargeState = 'charge';
        this.chargeTimer = 0.65;
      }
    } else if (this.chargeState === 'charge') {
      this.x += this.chargeSpeed * this.direction * dt;
      this.chargeTimer -= dt;
      this._bouncePatrol();
      if (this.chargeTimer <= 0) {
        this.chargeState = 'patrol';
        this.chargeTimer = 2.8;
      }
    }
  }

  takeHit() {
    this.health -= 1;
    this.hitFlash = 0.2;
    if (this.type === 'turtle' && this.health === 1) {
      this.speed *= 1.3;
    }
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
    if (this.type === 'ghost') {
      ctx.globalAlpha = (ctx.globalAlpha === 1 ? 0.72 : ctx.globalAlpha) + Math.sin(this.animFrame * 3) * 0.08;
    }
    sprites.drawEnemy(ctx, this.x, this.y, this.width, this.height, this.type, this.animFrame, {
      health: this.health,
      maxHealth: this.maxHealth,
      chargeState: this.chargeState,
    });
    ctx.globalAlpha = 1;
  }

  getBounds() {
    if (this.type === 'bird') {
      return {
        x: this.x + 5,
        y: this.y + 4,
        width: this.width - 10,
        height: this.height - 8,
      };
    }
    const pad = this.type === 'ghost' ? 4 : 2;
    return {
      x: this.x + pad,
      y: this.y + pad,
      width: this.width - pad * 2,
      height: this.height - pad,
    };
  }

  collidesWith(entity) {
    return !this.dead && aabbOverlap(this.getBounds(), entity);
  }
}
