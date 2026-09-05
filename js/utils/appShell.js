export function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';

  document.addEventListener(
    'touchmove',
    (event) => {
      if (event.target.closest(
        '#touch-controls, .ctrl-btn, .hud-pause-btn, .screen-panel, .screen.active, .access-input, .menu-btn'
      )) {
        return;
      }
      event.preventDefault();
    },
    { passive: false }
  );
}

export function isNativeApp() {
  return window.Capacitor?.isNativePlatform?.() === true;
}

export function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    || window.matchMedia('(pointer: coarse)').matches
    || 'ontouchstart' in window;
}

/** GitHub Pages alt yolu dahil doğru asset URL’si */
export function resolveAssetPath(relativePath) {
  const clean = relativePath.replace(/^\//, '');
  let base = window.location.pathname;
  if (!base.endsWith('/')) {
    base = base.slice(0, base.lastIndexOf('/') + 1);
  }
  return `${base}${clean}`;
}
