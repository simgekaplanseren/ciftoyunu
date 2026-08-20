import { REUNION_MESSAGES } from '../config/assets.js';

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
