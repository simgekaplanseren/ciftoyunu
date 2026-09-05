import { KeyProgress } from '../core/KeyProgress.js';
import { SECRET_LOCK } from '../config/SecretLock.js';
import { createHudHeart } from '../utils/HeartDraw.js';

export class HUD {
  constructor() {
    this.el = document.getElementById('hud');
    this.heartsEl = document.getElementById('hearts-display');
    this.scoreEl = document.getElementById('score-display');
    this.levelEl = document.getElementById('level-display');
    this.keysEl = document.getElementById('keys-display');
  }

  show() {
    this.el?.classList.remove('hidden');
  }

  hide() {
    this.el?.classList.add('hidden');
  }

  update(player, levelName) {
    if (!this.heartsEl) return;

    this.heartsEl.innerHTML = '';
    for (let i = 0; i < player.maxHearts; i++) {
      this.heartsEl.appendChild(createHudHeart(i < player.hearts));
    }

    this.scoreEl.textContent = String(player.score);
    this.levelEl.textContent = levelName;

    const totalKeys = KeyProgress.count();
    if (totalKeys > 0) {
      this.keysEl.classList.remove('hidden');
      this.keysEl.textContent = `${totalKeys}/${SECRET_LOCK.totalKeys}`;
    } else {
      this.keysEl.classList.add('hidden');
    }
  }
}
