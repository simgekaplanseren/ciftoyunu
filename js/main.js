import { Game } from './core/Game.js';

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  const game = new Game(canvas);
  await game.init();

  window.game = game;
});
