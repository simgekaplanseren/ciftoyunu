export class MenuManager {
  constructor(game) {
    this.game = game;
    this.levelGrid = document.getElementById('level-grid');
    this.pendingLevelIndex = 0;
    this._bindEvents();
  }

  _bindEvents() {
    document.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const char = btn.dataset.character;
        this._handleAction(btn.dataset.action, char);
      });
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
        this.pendingLevelIndex = 0;
        this.game.showCharacterSelect();
        break;
      case 'pick-character':
        this.game.selectCharacter(character);
        break;
      case 'confirm-start':
        if (this.game.selectedCharacter) {
          this.game.startGame(this.pendingLevelIndex);
        }
        break;
      case 'levels':
        this._renderLevelSelect();
        this.game.screens.show('levels');
        break;
      case 'settings':
        this.game.screens.show('settings');
        break;
      case 'back-menu':
        this.game.screens.show('menu');
        this.game.state = 'menu';
        this.game.audio.playMusic('musicMenu');
        break;
      case 'next-level':
        this.game.nextLevel();
        break;
      case 'retry':
        this.game.retryLevel();
        break;
      case 'resume':
        this.game.resume();
        break;
      case 'final-screen':
        this.game.showFinalScreen();
        break;
    }
  }

  _renderLevelSelect() {
    if (!this.levelGrid) return;
    this.levelGrid.innerHTML = '';

    const lm = this.game.levelManager;
    for (const level of lm.levels) {
      const locked = level.id > lm.unlockedLevels;
      const card = document.createElement('div');
      card.className = 'level-card' + (locked ? ' locked' : '');
      card.innerHTML = `
        <span class="level-icon">${level.emoji}</span>
        <div class="level-info">
          <h3>Bölüm ${level.id}: ${level.name}</h3>
          <p>${locked ? '🔒 Kilitli' : level.subtitle}</p>
        </div>
      `;

      if (!locked) {
        card.addEventListener('click', () => {
          this.pendingLevelIndex = level.id - 1;
          if (this.game.selectedCharacter) {
            this.game.startGame(level.id - 1);
          } else {
            this.game.showCharacterSelect();
          }
        });
      }

      this.levelGrid.appendChild(card);
    }
  }
}
