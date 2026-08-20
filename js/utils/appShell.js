export function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';

  document.addEventListener(
    'touchmove',
    (event) => {
      const scrollable = event.target.closest('.screen-panel, .screen, .access-input');
      if (!scrollable) event.preventDefault();
    },
    { passive: false }
  );
}

export function isNativeApp() {
  return window.Capacitor?.isNativePlatform?.() === true;
}
