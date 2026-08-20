import { aabbOverlap } from '../utils/Collision.js';

export class Collectible {
  constructor(x, y, type = 'heart', value = 10) {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.type = type;
    this.value = value;
    this.collected = false;
    this.animFrame = Math.random() * 10;
    this.index = 0;
  }

  update(dt) {
    if (!this.collected) this.animFrame += dt;
  }

  tryCollect(player) {
    if (this.collected) return null;
    if (!aabbOverlap(this.getBounds(), player.getBounds())) return null;

    this.collected = true;

    switch (this.type) {
      case 'heart':
        player.addScore(this.value);
        return 'heart';
      case 'key':
        player.addKey();
        player.addScore(this.value * 2);
        return 'key';
      case 'photo':
        player.addScore(this.value * 3);
        return 'photo';
      default:
        player.addScore(this.value);
        return 'item';
    }
  }

  draw(ctx, sprites) {
    if (this.collected) return;

    switch (this.type) {
      case 'heart':
        sprites.drawHeart(ctx, this.x, this.y, 14, this.animFrame);
        break;
      case 'key':
        sprites.drawKey(ctx, this.x, this.y, 14, this.animFrame);
        break;
      case 'photo':
        sprites.drawPhotoPiece(ctx, this.x, this.y, 16, this.index);
        break;
    }
  }

  getBounds() {
    return { x: this.x - 2, y: this.y - 2, width: this.width + 4, height: this.height + 4 };
  }
}
