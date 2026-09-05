import { resolveAssetPath } from '../utils/appShell.js';
import { ProceduralAudio } from './ProceduralAudio.js';

/**
 * Ses yönetimi — önce assets/audio/ dosyalarını dener,
 * yoksa Web Audio ile üretilen sesleri kullanır.
 */
export class AudioManager {
  constructor() {
    this.sounds = new Map();
    this.music = null;
    this.musicName = null;
    this.musicVolume = 0.7;
    this.sfxVolume = 0.8;
    this.enabled = true;
    this.initialized = false;
    this.procedural = new ProceduralAudio();
    this.useProcedural = true;
    this._unlockBound = false;
  }

  _bindUnlock() {
    if (this._unlockBound) return;
    this._unlockBound = true;

    const unlock = () => {
      this.unlock();
    };

    document.addEventListener('pointerdown', unlock, { once: true, passive: true });
    document.addEventListener('keydown', unlock, { once: true });
  }

  async unlock() {
    await this.procedural.unlock();
    if (this.musicName && this.useProcedural) {
      this.procedural.playMusic(this.musicName);
    } else if (this.music && this.music.paused) {
      this.music.play().catch(() => {});
    }
  }

  async init(assetPaths) {
    if (this.initialized) return;

    let loadedCount = 0;
    for (const [name, path] of Object.entries(assetPaths)) {
      try {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = resolveAssetPath(path);

        await new Promise((resolve) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, 800);
        });

        if (!audio.error) {
          this.sounds.set(name, audio);
          loadedCount += 1;
        }
      } catch (_) {}
    }

    this.useProcedural = loadedCount === 0;
    this.procedural.setMusicVolume(this.musicVolume);
    this.procedural.setSfxVolume(this.sfxVolume);
    this.initialized = true;
    this._bindUnlock();
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    this.procedural.setMusicVolume(v);
    if (this.music) this.music.volume = v;
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
    this.procedural.setSfxVolume(v);
  }

  playSfx(name) {
    if (!this.enabled) return;
    this.procedural.unlock();

    const sound = this.sounds.get(name);
    if (sound && !this.useProcedural) {
      const clone = sound.cloneNode();
      clone.volume = this.sfxVolume;
      clone.play().catch(() => {});
      return;
    }

    this.procedural.playSfx(name);
  }

  playMusic(name, loop = true) {
    if (!this.enabled) return;
    this.musicName = name;
    this.procedural.unlock();

    const track = this.sounds.get(name);
    if (track && !this.useProcedural) {
      if (this.music && this.music !== track) {
        this.music.pause();
        this.music.currentTime = 0;
      }
      this.music = track;
      track.loop = loop;
      track.volume = this.musicVolume;
      track.play().catch(() => {});
      return;
    }

    this.music = null;
    this.procedural.playMusic(name);
  }

  stopMusic() {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
    }
    this.procedural.stopMusic();
    this.musicName = null;
  }

  pauseMusic() {
    this.music?.pause();
    this.procedural.pauseMusic();
  }

  resumeMusic() {
    if (!this.enabled) return;
    if (this.music && !this.useProcedural) {
      this.music.play().catch(() => {});
      return;
    }
    this.procedural.resumeMusic();
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
      } catch (_) {}
    });

    await Promise.allSettled(promises);
    this.loaded = true;
  }

  get(name) {
    return this.images.get(name) || null;
  }
}
