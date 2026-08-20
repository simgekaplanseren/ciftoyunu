import { aabbOverlap } from '../utils/Collision.js';

export class Trap {
  constructor(x, y, width, height, type = 'spike') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.damage = 1;
    this.active = true;
    this.cooldown = 0;
  }

  check(player) {
    if (!this.active || this.cooldown > 0) return false;

    if (aabbOverlap(this.getBounds(), player.getBounds())) {
      const hit = player.takeDamage(this.damage);
      if (hit) this.cooldown = 0.5;
      return hit;
    }
    return false;
  }

  update(dt) {
    if (this.cooldown > 0) this.cooldown -= dt;
  }

  draw(ctx, sprites) {
    if (this.type === 'spike') {
      sprites.drawSpike(ctx, this.x, this.y, this.width, this.height);
    }
  }

  getBounds() {
    return { x: this.x + 2, y: this.y + 2, width: this.width - 4, height: this.height - 4 };
  }
}
