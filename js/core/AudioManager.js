/**
 * Ses yönetimi — ses dosyalarını assets/audio/ klasörüne ekledikten sonra otomatik yüklenir.
 * Dosya yoksa sessizce atlanır.
 */
export class AudioManager {
  constructor() {
    this.sounds = new Map();
    this.music = null;
    this.musicVolume = 0.7;
    this.sfxVolume = 0.8;
    this.enabled = true;
    this.initialized = false;
  }

  async init(assetPaths) {
    if (this.initialized) return;

    for (const [name, path] of Object.entries(assetPaths)) {
      try {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = path;

        await new Promise((resolve) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 500);
        });

        if (!audio.error) {
          this.sounds.set(name, audio);
        }
      } catch {
        // Ses dosyası yok — placeholder mod
      }
    }

    this.initialized = true;
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    if (this.music) this.music.volume = v;
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
  }

  playSfx(name) {
    if (!this.enabled) return;
    const sound = this.sounds.get(name);
    if (!sound) return;

    const clone = sound.cloneNode();
    clone.volume = this.sfxVolume;
    clone.play().catch(() => {});
  }

  playMusic(name, loop = true) {
    if (!this.enabled) return;
    const track = this.sounds.get(name);
    if (!track) return;

    if (this.music && this.music !== track) {
      this.music.pause();
      this.music.currentTime = 0;
    }

    this.music = track;
    track.loop = loop;
    track.volume = this.musicVolume;
    track.play().catch(() => {});
  }

  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
    }
  }

  pauseMusic() {
    this.music?.pause();
  }

  resumeMusic() {
    if (this.enabled && this.music) {
      this.music.play().catch(() => {});
    }
  }
}

export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.loaded = false;
  }

  async load(imagePaths, useCustom) {
    if (!useCustom) {
      this.loaded = true;
      return;
    }

    const promises = Object.entries(imagePaths).map(async ([name, path]) => {
      try {
        const img = new Image();
        img.src = path;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        this.images.set(name, img);
      } catch {
        // Placeholder kullanılacak
      }
    });

    await Promise.allSettled(promises);
    this.loaded = true;
  }

  get(name) {
    return this.images.get(name) || null;
  }
}
