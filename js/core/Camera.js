import { clamp, lerp } from '../utils/Collision.js';

export class Camera {
  constructor(viewWidth, viewHeight) {
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.x = 0;
    this.y = 0;
    this.shake = 0;
    this.shakeIntensity = 0;
    this.levelWidth = viewWidth;
    this.levelHeight = viewHeight;
  }

  setLevelBounds(width, height) {
    this.levelWidth = width;
    this.levelHeight = height;
  }

  follow(target, dt) {
    const targetX = target.x + target.width / 2 - this.viewWidth / 2;
    const targetY = target.y + target.height / 2 - this.viewHeight / 2;

    this.x = lerp(this.x, clamp(targetX, 0, Math.max(0, this.levelWidth - this.viewWidth)), dt * 5);
    this.y = lerp(this.y, clamp(targetY, 0, Math.max(0, this.levelHeight - this.viewHeight)), dt * 5);

    if (this.shake > 0) {
      this.shake -= dt;
    }
  }

  addShake(intensity = 4, duration = 0.3) {
    this.shake = duration;
    this.shakeIntensity = intensity;
  }

  apply(ctx) {
    let sx = 0;
    let sy = 0;
    if (this.shake > 0) {
      sx = (Math.random() - 0.5) * this.shakeIntensity;
      sy = (Math.random() - 0.5) * this.shakeIntensity;
    }
    ctx.translate(-Math.floor(this.x + sx), -Math.floor(this.y + sy));
  }

  reset(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
