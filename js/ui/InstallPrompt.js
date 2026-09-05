export class InstallPrompt {
  static isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true
      || window.matchMedia('(display-mode: fullscreen)').matches
    );
  }

  static isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  static shouldShow() {
    if (InstallPrompt.isStandalone()) return false;
    if (!InstallPrompt.isIOS()) return false;
    return true;
  }

  static waitForInstallOrSkip() {
    if (!InstallPrompt.shouldShow()) return Promise.resolve();

    return new Promise((resolve) => {
      const screen = document.getElementById('screen-install');
      const btnDone = document.getElementById('btn-install-done');

      screen?.classList.add('active');
      document.getElementById('screen-menu')?.classList.remove('active');

      btnDone?.addEventListener('click', () => {
        screen?.classList.remove('active');
        resolve();
      }, { once: true });
    });
  }
}
