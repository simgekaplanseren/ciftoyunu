import { GAME_CONFIG } from '../config/assets.js';
import { resolvePlatformCollision } from '../utils/Collision.js';

export class Player {
  constructor(x, y, sprites, character = 'girl') {
    this.x = x;
    this.y = y;
    this.character = character;
    this.prevX = x;
    this.prevY = y;
    this.width = 20;
    this.height = 28;
    this.vx = 0;
    this.vy = 0;
    this.speed = 150;
    this.jumpForce = -340;
    this.facing = 1;
    this.grounded = false;
    this.onPlatform = null;
    this.hearts = 3;
    this.maxHearts = GAME_CONFIG.maxHearts;
    this.score = 0;
    this.keys = 0;
    this.invincible = 0;
    this.state = 'idle';
    this.animFrame = 0;
    this.attackTimer = 0;
    this.attackCooldown = 0;
    this.attackHitbox = null;
    this.sprites = sprites;
    this.dead = false;
    this.wasGrounded = true;
    this.didJump = false;
    this.didAttack = false;
    this.coyoteTimer = 0;
    this.jumpBuffer = 0;
    this.crouching = false;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.vx = 0;
    this.vy = 0;
    this.hearts = 3;
    this.score = 0;
    this.keys = 0;
    this.invincible = 0;
    this.dead = false;
    this.attackTimer = 0;
    this.attackHitbox = null;
    this.wasGrounded = true;
    this.grounded = true;
  }

  update(dt, input, platforms) {
    if (this.dead) return;

    this.prevX = this.x;
    this.prevY = this.y;

    if (this.grounded || this.wasGrounded) {
      this.coyoteTimer = 0.12;
    } else {
      this.coyoteTimer -= dt;
    }

    if (input.isJump()) {
      this.jumpBuffer = 0.12;
    } else {
      this.jumpBuffer -= dt;
    }

    const canJump = this.coyoteTimer > 0;

    this.grounded = false;
    this.onPlatform = null;

    if (this.invincible > 0) this.invincible -= dt;
    if (this.attackCooldown > 0) this.attackCooldown -= dt;

    if (this.attackTimer > 0) {
      this.attackTimer -= dt;
      this._updateAttackHitbox();
      if (this.attackTimer <= 0) {
        this.attackHitbox = null;
      }
    }

    let moveX = 0;
    if (input.isLeft()) moveX -= 1;
    if (input.isRight()) moveX += 1;

    this.vx = moveX * this.speed;
    if (moveX !== 0) this.facing = moveX;

    if (this.jumpBuffer > 0 && canJump) {
      this.vy = this.jumpForce;
      this.grounded = false;
      this.coyoteTimer = 0;
      this.jumpBuffer = 0;
      this.didJump = true;
    }

    if (input.wasAttackPressed() && this.attackCooldown <= 0 && this.attackTimer <= 0) {
      this.attackTimer = GAME_CONFIG.attackDuration;
      this.attackCooldown = GAME_CONFIG.attackCooldown;
      this.didAttack = true;
      this._updateAttackHitbox();
    }

    this.vy += GAME_CONFIG.gravity * dt;
    if (this.vy > 500) this.vy = 500;

    this.x += this.vx * dt;
    this._resolveCollisions(platforms);

    this.y += this.vy * dt;
    this._resolveCollisions(platforms);

    if (this.onPlatform) {
      this.x += this.onPlatform.vx * dt;
      this.y += this.onPlatform.vy * dt;
    }

    this._updateCrouch(input);

    if (this.y > 400) {
      this.takeDamage(3);
    }

    if (Math.abs(this.vx) > 10 && this.grounded && !this.crouching) {
      this.state = 'run';
    } else if (!this.grounded) {
      this.state = 'jump';
    } else if (this.crouching) {
      this.state = 'crouch';
    } else if (this.attackTimer > 0) {
      this.state = 'attack';
    } else {
      this.state = 'idle';
    }

    this.wasGrounded = this.grounded;
    this.animFrame += dt;
  }

  _updateCrouch(input) {
    const onFerry = this.grounded
      && (this.onPlatform?.bobAmplitude > 0 || this.onPlatform?.ferryRiseDrop > 0);
    const ferryDipping = onFerry && this.onPlatform.vy > 12;
    const wantCrouch = ferryDipping || (onFerry && input.isDown());

    if (wantCrouch && !this.crouching) {
      this.crouching = true;
      this.height = 18;
      this.y += 10;
    } else if (!wantCrouch && this.crouching) {
      this.crouching = false;
      this.height = 28;
      this.y -= 10;
    }
  }

  _updateAttackHitbox() {
    const hbW = 24;
    const hbH = 18;
    this.attackHitbox = {
      x: this.facing > 0 ? this.x + this.width - 2 : this.x - hbW + 2,
      y: this.y + 6,
      width: hbW,
      height: hbH,
    };
  }

  _resolveCollisions(platforms) {
    for (let i = 0; i < 3; i++) {
      for (const plat of platforms) {
        if (!plat.active) continue;
        resolvePlatformCollision(this, plat);
      }
    }
  }

  takeDamage(amount = 1) {
    if (this.invincible > 0 || this.dead) return false;
    this.hearts -= amount;
    this.invincible = GAME_CONFIG.invincibilityTime;
    this.vy = -120;
    if (this.hearts <= 0) {
      this.hearts = 0;
      this.dead = true;
    }
    return true;
  }

  heal(amount = 1) {
    this.hearts = Math.min(this.maxHearts, this.hearts + amount);
  }

  addScore(points) {
    this.score += points;
  }

  addKey() {
    this.keys += 1;
  }

  draw(ctx) {
    if (this.invincible > 0 && Math.floor(this.animFrame * 20) % 2 === 0) return;

    this.sprites.drawPlayer(
      ctx, this.x, this.y, this.width, this.height,
      this.facing, this.state, this.animFrame, this.character
    );
  }

  getBounds() {
    return { x: this.x + 2, y: this.y + 2, width: this.width - 4, height: this.height - 2 };
  }
}
