import { aabbOverlap } from '../utils/Collision.js';

export class Door {
  constructor(x, y, width, height, options = {}) {
    this.x = x;
    this.y = y;
    this.width = width || 28;
    this.height = height || 44;
    this.requiresKey = options.requiresKey ?? false;
    this.isOpen = false;
    this.openAnim = 0;
    this.triggerTimer = 0;
    this.triggerDelay = 0.6;
  }

  update(dt, player) {
    if (this.isOpen) {
      this.openAnim = Math.min(1, this.openAnim + dt * 3);
      return false;
    }

    const near = aabbOverlap(this.getTriggerBounds(), player.getBounds());

    if (!near) {
      this.triggerTimer = 0;
      return false;
    }

    if (this.requiresKey && player.keys <= 0) return false;

    this.triggerTimer += dt;
    if (this.triggerTimer < this.triggerDelay) return false;

    this.isOpen = true;
    if (this.requiresKey) player.keys -= 1;
    return true;
  }

  draw(ctx, sprites, player) {
    const hasKey = !this.requiresKey || player.keys > 0;
    sprites.drawDoor(ctx, this.x, this.y, this.width, this.height, this.isOpen, hasKey);

    if (!this.isOpen && this.triggerTimer > 0 && hasKey) {
      ctx.fillStyle = 'rgba(255, 107, 157, 0.6)';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('...', this.x + this.width / 2, this.y - 4);
    }
  }

  getBounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }

  getTriggerBounds() {
    return {
      x: this.x - 8,
      y: this.y - 4,
      width: this.width + 16,
      height: this.height + 8,
    };
  }
}
