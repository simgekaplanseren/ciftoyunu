import { ACCESS } from '../config/access.js';

export class AccessGate {
  static hasAccess() {
    if (!ACCESS.enabled) return true;

    const urlCode = new URLSearchParams(window.location.search).get('k');
    if (urlCode && urlCode === ACCESS.code) {
      localStorage.setItem(ACCESS.storageKey, ACCESS.code);
      return true;
    }

    return localStorage.getItem(ACCESS.storageKey) === ACCESS.code;
  }

  static stripCodeFromUrl() {
    if (!window.location.search) return;
    window.history.replaceState({}, '', window.location.pathname);
  }

  static waitForAccess() {
    if (AccessGate.hasAccess()) {
      AccessGate.stripCodeFromUrl();
      document.getElementById('screen-menu')?.classList.add('active');
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const screen = document.getElementById('screen-access');
      const input = document.getElementById('access-code-input');
      const error = document.getElementById('access-error');
      const button = document.getElementById('btn-access-enter');
      const menu = document.getElementById('screen-menu');

      screen?.classList.add('active');
      menu?.classList.remove('active');

      const tryEnter = () => {
        const value = input?.value.trim();
        if (value === ACCESS.code) {
          localStorage.setItem(ACCESS.storageKey, ACCESS.code);
          error.textContent = '';
          screen?.classList.remove('active');
          menu?.classList.add('active');
          AccessGate.stripCodeFromUrl();
          resolve();
          return;
        }
        error.textContent = 'Davetiye kodu hatalı. Sadece sana gönderilen kodu gir.';
        input?.focus();
      };

      button?.addEventListener('click', tryEnter);
      input?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') tryEnter();
      });
      input?.focus();
    });
  }
}
