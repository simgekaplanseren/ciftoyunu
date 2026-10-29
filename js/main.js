import { AccessGate } from './ui/AccessGate.js';
import { InstallPrompt } from './ui/InstallPrompt.js';
import { Game } from './core/Game.js';
import { OrientationManager } from './core/OrientationManager.js';
import { isNativeApp, lockScroll } from './utils/appShell.js';

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  lockScroll();

  const native = isNativeApp();
  document.body.classList.toggle('is-native', native);
  document.body.classList.toggle('is-standalone', native || InstallPrompt.isStandalone());

  try {
    if (!native) {
      await InstallPrompt.waitForInstallOrSkip();
    }

    await AccessGate.waitForAccess();

    const orientation = new OrientationManager();
    const game = new Game(canvas, orientation);

    orientation.init(() => game.resize());
    await game.init();

    window.game = game;
  } catch (error) {
    console.error('Oyun başlatılırken kritik bir hata oluştu:', error);
    alert('Oyun yüklenirken bir sorun oluştu. Lütfen sayfayı yenile!');
  }
});
