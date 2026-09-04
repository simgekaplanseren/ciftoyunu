import { REUNION_MESSAGES, FINAL_SCREEN } from '../config/assets.js';
import { SECRET_LOCK } from '../config/SecretLock.js';
import { resolveAssetPath } from '../utils/appShell.js';

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
    this.finalPhotoIndex = 0;
    this._bindFinalPhotoNav();
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
    this.finalPhotoIndex = 0;
    this._populateFinalScreen();
    this._showFinalPhoto(0);
    this.show('final');
  }

  showSecretLock() {
    const msg = document.getElementById('secret-lock-message');
    if (msg) msg.textContent = SECRET_LOCK.unlockMessage;
    this.show('secret');
  }

  _bindFinalPhotoNav() {
    document.getElementById('btn-photo-next')?.addEventListener('click', () => {
      this._nextFinalPhoto();
    });
    document.getElementById('btn-photo-prev')?.addEventListener('click', () => {
      this._prevFinalPhoto();
    });
  }

  _populateFinalScreen() {
    const title = document.querySelector('#screen-final h2');
    const message = document.querySelector('#screen-final .final-message');
    if (title) title.textContent = FINAL_SCREEN.title;
    if (message) message.textContent = FINAL_SCREEN.message;
  }

  _showFinalPhoto(index) {
    const photos = FINAL_SCREEN.photos;
    if (!photos.length) return;

    this.finalPhotoIndex = Math.max(0, Math.min(index, photos.length - 1));
    const photo = photos[this.finalPhotoIndex];

    const img = document.getElementById('final-photo');
    const status = document.getElementById('final-photo-status');
    const prevBtn = document.getElementById('btn-photo-prev');
    const nextBtn = document.getElementById('btn-photo-next');
    const frame = document.getElementById('photo-frame');

    if (status) {
      status.textContent = `${this.finalPhotoIndex + 1} / ${photos.length}`;
    }
    if (prevBtn) prevBtn.disabled = this.finalPhotoIndex <= 0;
    if (nextBtn) {
      const isLast = this.finalPhotoIndex >= photos.length - 1;
      nextBtn.disabled = isLast;
      nextBtn.textContent = isLast ? 'SON FOTOĞRAF ✓' : 'SONRAKİ FOTOĞRAF →';
    }

    if (!img) return;

    img.alt = photo.label;
    img.classList.remove('loaded', 'error');
    img.classList.add('loading');
    frame?.classList.remove('has-error');

    const src = resolveAssetPath(photo.src);
    img.onload = () => {
      img.classList.remove('loading');
      img.classList.add('loaded');
    };
    img.onerror = () => {
      img.classList.remove('loading');
      img.classList.add('error');
      frame?.classList.add('has-error');
      if (status) {
        status.textContent = `${this.finalPhotoIndex + 1} / ${photos.length} — yüklenemedi`;
      }
    };
    img.src = src;
  }

  _nextFinalPhoto() {
    if (this.finalPhotoIndex < FINAL_SCREEN.photos.length - 1) {
      this._showFinalPhoto(this.finalPhotoIndex + 1);
    }
  }

  _prevFinalPhoto() {
    if (this.finalPhotoIndex > 0) {
      this._showFinalPhoto(this.finalPhotoIndex - 1);
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
