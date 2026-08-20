import { Platform, MovingPlatform } from '../entities/Platform.js';
import { Enemy } from '../entities/Enemy.js';
import { Collectible } from '../entities/Collectible.js';
import { Trap } from '../entities/Trap.js';
import { platformY, trapPoint } from './levelUtils.js';

/** Seviye kurulum yardımcısı — doğru Y konumları ve çeşitli parçalar */
export class LevelBuilder {
  constructor(theme) {
    this.theme = theme;
    this.platforms = [];
    this.traps = [];
    this.enemies = [];
    this.collectibles = [];
    this._maxX = 0;
  }

  _track(x, width = 0) {
    this._maxX = Math.max(this._maxX, x + width);
    return this;
  }

  ground(x, width, theme = this.theme) {
    this.platforms.push(new Platform(x, platformY(0), width, 40, theme));
    this._track(x, width);
    return this;
  }

  plat(x, elevation, width, theme = this.theme) {
    this.platforms.push(new Platform(x, platformY(elevation), width, 14, theme));
    this._track(x, width);
    return this;
  }

  movingPlat(x, elevation, width, endElevation, speed = 0.35, theme = this.theme) {
    const y = platformY(elevation);
    const endY = platformY(endElevation);
    this.platforms.push(new MovingPlatform(x, y, width, 14, x, endY, speed, theme));
    this._track(x, width);
    return this;
  }

  movingPlatH(x, y, width, endX, speed = 0.4, theme = this.theme) {
    this.platforms.push(new MovingPlatform(x, y, width, 14, endX, y, speed, theme));
    this._track(x, width);
    this._track(endX, width);
    return this;
  }

  spikes(x, width) {
    const t = trapPoint(x, width);
    this.traps.push(new Trap(t.x, t.y, t.width, t.height));
    this._track(x, width);
    return this;
  }

  heart(x, elevation = 0, value = 10) {
    this.collectibles.push(new Collectible(x, platformY(elevation) - 16, 'heart', value));
    this._track(x, 16);
    return this;
  }

  /** Zeminde veya platformda düşman — Y otomatik hizalanır */
  enemy(x, elevation, options = {}) {
    const h = options.height ?? (options.type === 'crab' ? 14 : options.type === 'bee' ? 14 : 20);
    const w = options.width ?? (options.type === 'crab' ? 28 : options.type === 'bee' ? 18 : 24);
    const top = platformY(elevation);
    const y = options.flying ? top - h - (options.flyOffset ?? 20) : top - h;
    const e = new Enemy(x, y, w, h, options);
    if (options.flying) e.baseY = y;
    this.enemies.push(e);
    this._track(x, w);
    if (options.patrolMax != null) this._track(options.patrolMax, w);
    return this;
  }

  /** Zeminde devriye düşman */
  groundEnemy(x, options = {}) {
    return this.enemy(x, 0, options);
  }

  /** Boşluk üstünde uçan düşman — zemin yol açık kalır */
  flyOver(x, elevation, options = {}) {
    return this.enemy(x, elevation, {
      ...options,
      flying: true,
      flyOffset: options.flyOffset ?? 22,
    });
  }

  gap(x, width = 56) {
    return this.spikes(x, Math.min(width, 56));
  }

  /** Parkur sonuna zemin + kavuşma noktası */
  finish(extraGround = 80) {
    const start = this._maxX;
    this.ground(start, extraGround);
    const finishX = start + extraGround - 56;
    this._finishX = finishX;
    return this;
  }

  build() {
    const finishX = this._finishX ?? Math.max(240, this._maxX - 56);
    return {
      platforms: this.platforms,
      traps: this.traps,
      enemies: this.enemies,
      collectibles: this.collectibles,
      boss: null,
      bossTriggerX: null,
      finishX,
      actualWidth: Math.max(this._maxX, finishX + 80),
    };
  }
}
