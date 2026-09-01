import { REUNION_MESSAGES, FINAL_SCREEN } from '../config/assets.js';
import { SECRET_LOCK } from '../config/SecretLock.js';

export class ScreenManager {
  constructor() {
    this.screens = {
      menu: document.getElementById('screen-menu'),
      sections: document.getElementById('screen-sections'),
      character: document.getElementById('screen-character'),
      levels: document.getElementById('screen-levels'),
      settings: document.getElementById('screen-settings'),
      levelComplete: document.getElementById('screen-level-complete'),
      gameOver: document.getElementById('screen-game-over'),
      victory: document.getElementById('screen-victory'),
      final: document.getElementById('screen-final'),
      secret: document.getElementById('screen-secret'),
      pause: document.getElementById('screen-pause'),
    };
    this.current = 'menu';
    this.transitionEl = document.getElementById('level-transition');
    this.transitionText = document.getElementById('transition-text');
  }

  show(name) {
    for (const [key, el] of Object.entries(this.screens)) {
      el?.classList.toggle('active', key === name);
    }
    this.current = name;
  }

  hideAll() {
    for (const el of Object.values(this.screens)) {
      el?.classList.remove('active');
    }
    this.current = null;
  }

  showLevelComplete(score, levelName, levelIndex, customMsg = null) {
    const title = document.getElementById('level-complete-title');
    const scoreEl = document.getElementById('level-complete-score');
    const msgEl = document.getElementById('level-complete-msg');
    if (title) title.textContent = `${levelName} Tamamlandı!`;
    if (scoreEl) scoreEl.textContent = `Puan: ${score}`;
    if (msgEl) {
      msgEl.textContent = customMsg
        ?? REUNION_MESSAGES[levelIndex % REUNION_MESSAGES.length];
    }
    this.show('levelComplete');
  }

  showGameOver() {
    this.show('gameOver');
  }

  showVictory() {
    this.show('victory');
  }

  showFinal() {
    this._populateFinalScreen();
    this.show('final');
  }

  showSecretLock() {
    const msg = document.getElementById('secret-lock-message');
    if (msg) msg.textContent = SECRET_LOCK.unlockMessage;
    this.show('secret');
  }

  _populateFinalScreen() {
    const title = document.querySelector('#screen-final h2');
    const message = document.querySelector('#screen-final .final-message');
    if (title) title.textContent = FINAL_SCREEN.title;
    if (message) message.textContent = FINAL_SCREEN.message;

    for (const photo of FINAL_SCREEN.photos) {
      const slot = document.querySelector(`#photo-gallery .photo-slot[data-slot="${photo.slot}"]`);
      if (!slot) continue;

      const img = new Image();
      img.alt = photo.label;
      img.onload = () => {
        slot.innerHTML = '';
        slot.appendChild(img);
      };
      img.onerror = () => {
        slot.innerHTML = `<span class="photo-placeholder">${photo.label}</span>`;
      };
      img.src = photo.src;
    }

    const msgBox = document.getElementById('birthday-message');
    if (msgBox) {
      msgBox.innerHTML = `<p>${FINAL_SCREEN.message}</p>`;
    }
  }

  showPause() {
    this.show('pause');
  }

  showSections() {
    this.show('sections');
  }

  showCharacterSelect() {
    this.show('character');
  }

  async playTransition(text, duration = 2000) {
    if (!this.transitionEl) return;
    this.transitionText.textContent = text;
    this.transitionEl.classList.remove('hidden');

    await new Promise((r) => setTimeout(r, duration));

    this.transitionEl.classList.add('hidden');
  }
}
