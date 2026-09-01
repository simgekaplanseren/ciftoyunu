import { aabbOverlap } from '../utils/Collision.js';

export class Platform {
  constructor(x, y, width, height, theme = 'forest') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.theme = theme;
    this.cliffLeft = false;
    this.cliffRight = false;
    this.active = true;
    this.vx = 0;
    this.vy = 0;
    this.type = 'static';
  }
}

export class MovingPlatform extends Platform {
  constructor(x, y, width, height, endX, endY, speed, theme = 'forest') {
    super(x, y, width, height, theme);
    this.startX = x;
    this.startY = y;
    this.endX = endX;
    this.endY = endY;
    this.speed = speed;
    this.t = 0;
    this.direction = 1;
    this.type = 'moving';
    this.prevX = x;
    this.prevY = y;
  }

  update(dt) {
    this.prevX = this.x;
    this.prevY = this.y;

    this.t += dt * this.speed * this.direction;

    if (this.t >= 1) {
      this.t = 1;
      this.direction = -1;
    } else if (this.t <= 0) {
      this.t = 0;
      this.direction = 1;
    }

    const ease = this.t;
    this.x = this.startX + (this.endX - this.startX) * ease;
    this.y = this.startY + (this.endY - this.startY) * ease;
    this.vx = (this.x - this.prevX) / dt;
    this.vy = (this.y - this.prevY) / dt;
  }
}

export function drawPlatforms(ctx, platforms, sprites) {
  for (const p of platforms) {
    sprites.drawPlatform(ctx, p.x, p.y, p.width, p.height, p.theme, {
      left: p.cliffLeft,
      right: p.cliffRight,
    });
  }
}
