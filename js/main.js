import { AccessGate } from './ui/AccessGate.js';
import { Game } from './core/Game.js';
import { OrientationManager } from './core/OrientationManager.js';

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  await AccessGate.waitForAccess();

  const orientation = new OrientationManager();
  const game = new Game(canvas, orientation);

  orientation.init(() => game.resize());
  await game.init();

  window.game = game;
});
