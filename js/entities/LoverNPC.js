import { drawPixelHeart } from '../utils/HeartDraw.js';

/** Bölüm sonunda bekleyen sevgili */
export class LoverNPC {
  constructor(x, y, options = {}) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 28;
    this.triggerX = options.triggerX ?? x - 80;
    this.visible = options.visible ?? true;
    this.active = options.active ?? true;
    this.animFrame = 0;
    this.waiting = true;
  }

  update(dt) {
    this.animFrame += dt;
  }

  getCharacterType(playerType) {
    return playerType === 'girl' ? 'fadil' : 'girl';
  }

  draw(ctx, sprites, playerType) {
    if (!this.visible) return;
    const char = this.getCharacterType(playerType);
    sprites.drawCharacter(ctx, this.x, this.y, this.width, this.height, char, -1, 'idle', this.animFrame);

    if (this.waiting) {
      const bob = Math.sin(this.animFrame * 3) * 2;
      drawPixelHeart(
        ctx,
        this.x + this.width / 2,
        this.y - 4 + bob,
        10,
        '#ff6b9d',
      );
    }
  }
}
