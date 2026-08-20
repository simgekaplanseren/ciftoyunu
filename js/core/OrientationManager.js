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
    const vv = window.visualViewport;
    const w = vv?.width ?? window.innerWidth;
    const h = vv?.height ?? window.innerHeight;
    return w < h;
  }

  isPlayingPortrait() {
    return (
      document.body.classList.contains('is-playing')
      && this.isTouchDevice()
      && this.isPortrait()
    );
  }

  update() {
    const block = document.getElementById('portrait-block');
    const playingPortrait = this.isPlayingPortrait();
    block?.classList.toggle('hidden', !playingPortrait);
    document.body.classList.toggle('portrait-blocked', playingPortrait);
  }

  async lockLandscape() {
    try {
      if (screen.orientation?.lock) {
        await screen.orientation.lock('landscape-primary');
      }
    } catch (_) {
      try {
        if (screen.orientation?.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch (_) {}
    }
  }

  unlock() {
    try {
      screen.orientation?.unlock?.();
    } catch (_) {}
  }
}
