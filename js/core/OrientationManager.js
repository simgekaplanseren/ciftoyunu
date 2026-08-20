export class OrientationManager {
  constructor() {
    this.onChange = null;
    this._handleChange = () => {
      this.update();
      this.onChange?.();
    };
  }

  init(onChange) {
    this.onChange = onChange;
    this.update();
    window.addEventListener('resize', this._handleChange);
    window.addEventListener('orientationchange', this._handleChange);
    window.visualViewport?.addEventListener('resize', this._handleChange);
  }

  isTouchDevice() {
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  }

  isPortrait() {
    return window.matchMedia('(orientation: portrait)').matches;
  }

  shouldForceLandscape() {
    return (
      this.isTouchDevice()
      && this.isPortrait()
      && window.innerWidth < 900
      && document.body.classList.contains('is-playing')
    );
  }

  update() {
    const forceLandscape = this.shouldForceLandscape();
    document.body.classList.toggle('mobile-portrait', forceLandscape);

    const hint = document.getElementById('rotate-hint');
    if (hint) {
      hint.classList.toggle('visible', forceLandscape);
    }
  }

  async lockLandscape() {
    try {
      if (screen.orientation?.lock) {
        await screen.orientation.lock('landscape');
      }
    } catch (_) {}
  }

  unlock() {
    try {
      screen.orientation?.unlock?.();
    } catch (_) {}
  }
}
