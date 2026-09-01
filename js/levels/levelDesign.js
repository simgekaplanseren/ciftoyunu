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
    this._groundEnd = 0;
    this._nextCliffLeft = false;
    this._lastGapX = 0;
    this._lastGapW = 56;
  }

  _track(x, width = 0) {
    this._maxX = Math.max(this._maxX, x + width);
    return this;
  }

  ground(x, width, theme = this.theme) {
    const platform = new Platform(x, platformY(0), width, 40, theme);
    if (this._nextCliffLeft) {
      platform.cliffLeft = true;
      this._nextCliffLeft = false;
    }
    this.platforms.push(platform);
    this._groundEnd = x + width;
    this._track(x, width);
    return this;
  }

  /** Boşluktan sonra zemin — otomatik konumlanır */
  nextGround(width, theme = this.theme) {
    return this.ground(this._groundEnd + 56, width, theme);
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

  spikes(x, width, type = 'spike') {
    const t = trapPoint(x, width, type);
    this.traps.push(new Trap(t.x, t.y, t.width, t.height, type));
    this._track(x, width);
    return this;
  }

  heart(x, elevation = 0, value = 10) {
    this.collectibles.push(new Collectible(x, platformY(elevation) - 16, 'heart', value));
    this._track(x, 16);
    return this;
  }

  /** Gizli anahtar — bir kez toplanır, kayıtta kalır */
  secretKey(keyId, x, elevation = 0) {
    const item = new Collectible(x, platformY(elevation) - 16, 'key', 50);
    item.keyId = keyId;
    this.collectibles.push(item);
    this._track(x, 16);
    return this;
  }

  /** Zeminde veya platformda düşman — Y otomatik hizalanır */
  enemy(x, elevation, options = {}) {
    const h = options.height ?? (
      options.type === 'crab' ? 14
        : options.type === 'bee' ? 14
          : options.type === 'bird' ? 16
            : 20
    );
    const w = options.width ?? (
      options.type === 'crab' ? 28
        : options.type === 'bee' ? 18
          : options.type === 'bird' ? 22
            : 24
    );
    const top = platformY(elevation);
    const y = options.flying ? top - h - (options.flyOffset ?? 20) : top - h;
    const e = new Enemy(x, y, w, h, options);
    if (options.flying) e.baseY = y;
    this.enemies.push(e);
    this._track(x, w);
    if (options.patrolMax != null) this._track(options.patrolMax, w);
    return this;
  }

  /** Zeminde devriye — devriye uçuruma taşmaz */
  groundEnemy(x, options = {}) {
    const segmentEnd = this._groundEnd;
    const margin = 28;
    const maxPatrol = Math.max(x + 40, segmentEnd - margin);
    const patrolMax = Math.min(options.patrolMax ?? maxPatrol, maxPatrol);
    const patrolMin = Math.max(
      options.patrolMin ?? x - 48,
      x - 48,
    );
    return this.enemy(x, 0, {
      ...options,
      patrolMin: Math.min(patrolMin, patrolMax - 36),
      patrolMax,
    });
  }

  /** Boşluk üstünde uçan düşman — zemin yolu açık kalır */
  flyOver(x, elevation, options = {}) {
    return this.enemy(x, elevation, {
      ...options,
      flying: true,
      flyOffset: options.flyOffset ?? 22,
    });
  }

  /** Gökyüzünde süs kuşu — zeminin üstünde yatay uçar */
  skyBird(x, elevation = 50, options = {}) {
    const margin = 32;
    const patrolMin = options.patrolMin ?? Math.max(margin, x - 90);
    const patrolMax = options.patrolMax ?? Math.min(this._groundEnd - margin, x + 90);
    return this.flyOver(x, elevation, {
      type: 'bird',
      speed: options.speed ?? 16,
      flyAmplitude: options.flyAmplitude ?? 9,
      flyOffset: options.flyOffset ?? 12,
      damage: 0,
      patrolMin,
      patrolMax,
      ...options,
    });
  }

  /** Son zemin parçasına birkaç süs kuşu serpiştir */
  skyBirdFill(count = 2) {
    const grounds = this.platforms.filter((p) => p.height >= 40);
    const g = grounds[grounds.length - 1];
    if (!g) return this;

    const elevations = [46, 54, 40];
    const speeds = [14, 18, 12];
    for (let i = 0; i < count; i++) {
      const t = (i + 1) / (count + 1);
      const x = g.x + Math.floor(g.width * t);
      this.skyBird(x, elevations[i % elevations.length], {
        patrolMin: g.x + 24,
        patrolMax: g.x + g.width - 24,
        speed: speeds[i % speeds.length],
        flyAmplitude: 8 + (i % 2) * 4,
      });
    }
    return this;
  }

  /** Son boşluğun üzerinde eğilip kalkan kuş — zamanla zıpla */
  gapBird(options = {}) {
    const gapX = this._lastGapX ?? this._groundEnd;
    const gapW = this._lastGapW ?? 56;
    const cx = gapX + Math.floor(gapW / 2) - 11;
    return this.flyOver(cx, options.elevation ?? 80, {
      type: 'bird',
      speed: options.speed ?? 14,
      flyAmplitude: options.flyAmplitude ?? 10,
      flyOffset: options.flyOffset ?? 14,
      patrolMin: gapX + 4,
      patrolMax: gapX + gapW - 24,
      ...options,
    });
  }

  /** @deprecated gapBird kullan */
  gapFlyer(type = 'bird', options = {}) {
    if (type === 'bird' || options.useBird !== false) {
      return this.gapBird(options);
    }
    const gapX = this._lastGapX ?? this._groundEnd;
    const gapW = this._lastGapW ?? 56;
    const cx = gapX + gapW / 2 - 10;
    return this.flyOver(cx, options.elevation ?? 34, {
      type,
      speed: options.speed ?? 18,
      flyAmplitude: options.flyAmplitude ?? 7,
      flyOffset: options.flyOffset ?? 14,
      patrolMin: gapX + 6,
      patrolMax: gapX + gapW - 22,
      ...options,
    });
  }

  /** Boşluk — sadece zıplanır, diken/deniz yok */
  jumpGap(width = 56) {
    const lastGround = this.platforms[this.platforms.length - 1];
    if (lastGround?.height >= 40) {
      lastGround.cliffRight = true;
    }
    this._nextCliffLeft = true;
    const gapW = Math.min(width, 56);
    this._lastGapX = this._groundEnd;
    this._lastGapW = gapW;
    this.pit(this._groundEnd, gapW);
    this._track(this._groundEnd, gapW);
    return this;
  }

  /** Zıplama boşluğunda görünür uçurum */
  pit(x, width) {
    const t = trapPoint(x, width, 'pit');
    this.traps.push(new Trap(t.x, t.y, t.width, t.height, 'pit'));
    this._track(x, width);
    return this;
  }

  /** Son boşluğun ortasında dikey hareketli platform */
  gapMovingPlat(elevation = 16, endElevation = 32, width = 50, speed = 0.38, theme = this.theme) {
    const gapX = this._lastGapX ?? this._groundEnd;
    const gapW = this._lastGapW ?? 56;
    const x = gapX + Math.max(2, Math.floor((gapW - width) / 2));
    return this.movingPlat(x, elevation, width, endElevation, speed, theme);
  }

  /** Boşluk — son zemin parçasının hemen ucuna yerleşir (varsayılan: kırmızı diken) */
  gap(width = 56, type = 'spike') {
    const lastGround = this.platforms[this.platforms.length - 1];
    if (type === 'water' && lastGround?.height >= 40) {
      lastGround.cliffRight = true;
    }
    if (type === 'water') {
      this._nextCliffLeft = true;
    }
    const gapW = Math.min(width, 56);
    this._lastGapX = this._groundEnd;
    this._lastGapW = gapW;
    return this.spikes(this._groundEnd, gapW, type);
  }

  /** Parkur sonuna zemin + kavuşma noktası */
  finish(extraGround = 160) {
    const start = this._groundEnd;
    this.ground(start, extraGround);
    this._finishX = start + extraGround - 64;
    return this;
  }

  build() {
    const finishX = this._finishX ?? Math.max(240, this._maxX - 64);
    return {
      platforms: this.platforms,
      traps: this.traps,
      enemies: this.enemies,
      collectibles: this.collectibles,
      boss: null,
      bossTriggerX: null,
      finishX,
      actualWidth: this._maxX,
    };
  }
}
