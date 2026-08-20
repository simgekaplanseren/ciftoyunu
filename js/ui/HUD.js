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
      const span = document.createElement('span');
      span.className = 'heart-icon' + (i >= player.hearts ? ' lost' : '');
      span.textContent = i < player.hearts ? '❤️' : '🖤';
      this.heartsEl.appendChild(span);
    }

    this.scoreEl.textContent = `💎 ${player.score}`;
    this.levelEl.textContent = levelName;

    if (player.keys > 0) {
      this.keysEl.classList.remove('hidden');
      this.keysEl.textContent = `🔑 ${player.keys}`;
    } else {
      this.keysEl.classList.add('hidden');
    }
  }
}
