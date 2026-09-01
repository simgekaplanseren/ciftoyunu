import { GAME_SECTIONS, getSectionById } from '../config/GameSections.js';
import { KeyProgress } from '../core/KeyProgress.js';
import { SECRET_LOCK } from '../config/SecretLock.js';

export class MenuManager {
  constructor(game) {
    this.game = game;
    this.sectionGrid = document.getElementById('section-grid');
    this.levelGrid = document.getElementById('level-grid');
    this.levelSelectTitle = document.getElementById('level-select-title');
    this.pendingLevelIndex = 0;
    this.settingsReturnTo = 'menu';
    this.navReturn = 'menu';
    this.activeSectionId = null;

    this._bindEvents();
    this.refreshLockPanel();
  }

  _bindEvents() {
    document.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const char = btn.dataset.character;
        this._handleAction(btn.dataset.action, char);
      });
    });

    document.getElementById('btn-pause')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.game.pause();
    });

    const musicVol = document.getElementById('music-volume');
    const sfxVol = document.getElementById('sfx-volume');

    musicVol?.addEventListener('input', (e) => {
      this.game.audio.setMusicVolume(e.target.value / 100);
    });

    sfxVol?.addEventListener('input', (e) => {
      this.game.audio.setSfxVolume(e.target.value / 100);
    });
  }

  _handleAction(action, character) {
    switch (action) {
      case 'start':
      case 'levels':
        this._showSections();
        break;
      case 'pick-character':
        this.game.selectCharacter(character);
        break;
      case 'confirm-start':
        if (this.game.selectedCharacter) {
          this.game.startGame(this.pendingLevelIndex);
        }
        break;
      case 'settings':
        this.settingsReturnTo = 'menu';
        this.game.screens.show('settings');
        break;
      case 'pause-settings':
        this.settingsReturnTo = 'pause';
        this.game.screens.show('settings');
        break;
      case 'settings-back':
        if (this.settingsReturnTo === 'pause') {
          this.game.screens.showPause();
        } else {
          this.game.screens.show('menu');
        }
        break;
      case 'back-menu':
        this.game.returnToMainMenu();
        break;
      case 'back-sections':
        this._showSections();
        break;
      case 'back-nav':
        if (this.navReturn === 'section-levels') {
          this._showSectionLevels(this.activeSectionId);
        } else if (this.navReturn === 'sections') {
          this._showSections();
        } else {
          this.game.returnToMainMenu();
        }
        break;
      case 'pause-menu':
        this.game.returnToMainMenu();
        break;
      case 'next-level':
        this.game.nextLevel();
        break;
      case 'retry':
        this.game.retryLevel();
        break;
      case 'final-screen':
        this.game.showFinalScreen();
        break;
      case 'unlock-secret':
        this._openSecretLock();
        break;
      case 'resume':
        this.game.resume();
        break;
    }
  }

  refreshLockPanel() {
    const countEl = document.getElementById('lock-key-count');
    const btn = document.getElementById('btn-unlock-secret');
    const hint = document.getElementById('lock-hint');
    const icon = document.getElementById('lock-icon');
    if (!countEl) return;

    const count = KeyProgress.count();
    const unlocked = KeyProgress.isUnlocked();

    countEl.textContent = `${count} / ${SECRET_LOCK.totalKeys} anahtar`;
    if (icon) icon.textContent = unlocked ? '🔓' : '🔒';
    if (hint) {
      hint.textContent = unlocked
        ? 'Kilit açıldı!'
        : count >= SECRET_LOCK.requiredKeys
          ? 'Yeterli anahtar topladın — kilidi aç!'
          : `${SECRET_LOCK.requiredKeys} anahtar topla, kilidi aç`;
    }
    if (btn) {
      btn.disabled = !unlocked && count < SECRET_LOCK.requiredKeys;
      btn.textContent = unlocked ? 'MESAJI GÖR 🔓' : 'KİLİDİ AÇ';
    }
  }

  _openSecretLock() {
    if (!KeyProgress.canUnlock() && !KeyProgress.isUnlocked()) return;
    if (!KeyProgress.isUnlocked()) KeyProgress.markUnlocked();
    this.refreshLockPanel();
    this.game.screens.showSecretLock();
  }

  _showSections() {
    this.game.state = 'menu';
    this._renderSectionSelect();
    this.game.screens.showSections();
  }

  _renderSectionSelect() {
    if (!this.sectionGrid) return;
    this.sectionGrid.innerHTML = '';
    const lm = this.game.levelManager;

    for (const section of GAME_SECTIONS) {
      const locked = !lm.isSectionUnlocked(section.id);
      const card = document.createElement('div');
      card.className = 'level-card' + (locked ? ' locked' : '');
      card.innerHTML = `
        <span class="level-icon">${locked ? '🔒' : section.emoji}</span>
        <div class="level-info">
          <h3>${section.name}</h3>
        </div>
      `;

      if (!locked) {
        card.addEventListener('click', () => this._onSectionSelected(section.id));
      }

      this.sectionGrid.appendChild(card);
    }
  }

  _onSectionSelected(sectionId) {
    const section = getSectionById(sectionId);
    if (!section || !this.game.levelManager.isSectionUnlocked(sectionId)) return;

    const levels = this.game.levelManager.getLevelsForSection(sectionId);
    if (levels.length === 0) return;

    this._showSectionLevels(sectionId);
  }

  _showSectionLevels(sectionId) {
    const section = getSectionById(sectionId);
    if (!section) return;

    this.activeSectionId = sectionId;
    this.navReturn = 'sections';

    if (this.levelSelectTitle) {
      this.levelSelectTitle.textContent = `${section.emoji} ${section.name}`;
    }

    this._renderSectionLevelSelect(sectionId);
    this.game.screens.show('levels');
  }

  _appendLevelCard(level, locked) {
    const card = document.createElement('div');
    card.className = 'level-card' + (locked ? ' locked' : '');
    card.innerHTML = `
      <span class="level-icon">${level.emoji}</span>
      <div class="level-info">
        <h3>${level.name}</h3>
      </div>
    `;

    if (!locked) {
      card.addEventListener('click', () => {
        this.pendingLevelIndex = level.id - 1;
        this.navReturn = 'section-levels';
        if (this.game.selectedCharacter) {
          this.game.startGame(level.id - 1);
        } else {
          this.game.showCharacterSelect();
        }
      });
    }

    this.levelGrid.appendChild(card);
  }

  _renderSectionLevelSelect(sectionId) {
    if (!this.levelGrid) return;
    this.levelGrid.innerHTML = '';

    const lm = this.game.levelManager;
    const levels = lm.getLevelsForSection(sectionId);

    for (const level of levels) {
      const locked = !lm.isLevelUnlocked(level);
      this._appendLevelCard(level, locked);
    }
  }
}
