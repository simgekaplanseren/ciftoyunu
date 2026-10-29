/** MP3 dosyası yoksa Web Audio ile üretilen sesler */
export class ProceduralAudio {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.musicOscs = [];
    this.musicVolume = 0.7;
    this.sfxVolume = 0.8;
    this.currentMusic = null;
    this.enabled = true;
  }

  _getCtx() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
    }
    return this.ctx;
  }

  async unlock() {
    const ctx = this._getCtx();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch (_) {
        return false;
      }
    }
    return ctx.state === 'running';
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    if (this.musicGain) {
      this.musicGain.gain.value = v * 0.22;
    }
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
  }

  _musicProfile(name) {
    const profiles = {
      musicMenu: { base: 196, harmony: 247, lfo: 0.08 },
      musicForest: { base: 174, harmony: 220, lfo: 0.12 },
      musicCave: { base: 155, harmony: 196, lfo: 0.06 },
      musicCastle: { base: 220, harmony: 277, lfo: 0.1 },
      musicBoss: { base: 130, harmony: 164, lfo: 0.18 },
    };
    return profiles[name] ?? profiles.musicMenu;
  }

  playMusic(name) {
    if (!this.enabled) return;
    const ctx = this._getCtx();
    if (!ctx) return;

    this.stopMusic();
    this.currentMusic = name;

    const { base, harmony, lfo } = this._musicProfile(name);
    const gain = ctx.createGain();
    gain.gain.value = this.musicVolume * 0.22;
    gain.connect(ctx.destination);
    this.musicGain = gain;

    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    oscA.type = 'sine';
    oscB.type = 'triangle';
    oscA.frequency.value = base;
    oscB.frequency.value = harmony;

    const lfoNode = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfoNode.frequency.value = lfo;
    lfoGain.gain.value = 4;
    lfoNode.connect(lfoGain);
    lfoGain.connect(oscA.frequency);

    oscA.connect(gain);
    oscB.connect(gain);
    oscA.start();
    oscB.start();
    lfoNode.start();
    this.musicOscs = [oscA, oscB, lfoNode];
  }

  stopMusic() {
    for (const node of this.musicOscs) {
      try {
        node.stop();
        node.disconnect();
      } catch (_) {}
    }
    this.musicOscs = [];
    if (this.musicGain) {
      try { this.musicGain.disconnect(); } catch (_) {}
    }
    this.musicGain = null;
    this.currentMusic = null;
  }

  pauseMusic() {
    const ctx = this._getCtx();
    if (ctx?.state === 'running') {
      ctx.suspend().catch(() => {});
    }
  }

  async resumeMusic() {
    if (!this.enabled || !this.currentMusic) return;
    await this.unlock();
    if (this.musicOscs.length === 0) {
      this.playMusic(this.currentMusic);
    }
  }

  _tone(freq, duration, type = 'sine', vol = 1, slideTo = null) {
    const ctx = this._getCtx();
    if (!ctx || !this.enabled) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo != null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(slideTo, 1), t + duration);
    }
    const peak = this.sfxVolume * vol * 0.35;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  playSfx(name) {
    if (!this.enabled) return;
    switch (name) {
      case 'sfxJump':
        this._tone(280, 0.12, 'square', 0.7, 520);
        break;
      case 'sfxAttack':
        this._tone(180, 0.07, 'square', 0.55, 90);
        break;
      case 'sfxCollect':
        this._tone(660, 0.08, 'sine', 0.8);
        setTimeout(() => this._tone(880, 0.1, 'sine', 0.75), 60);
        break;
      case 'sfxHurt':
        this._tone(140, 0.18, 'sawtooth', 0.85, 70);
        break;
      case 'sfxEnemyHit':
        this._tone(110, 0.1, 'triangle', 0.65, 55);
        break;
      case 'sfxVictory':
        [523, 659, 784, 1047].forEach((f, i) => {
          setTimeout(() => this._tone(f, 0.14, 'sine', 0.7), i * 90);
        });
        break;
      case 'sfxDoor':
        this._tone(330, 0.12, 'triangle', 0.5, 440);
        break;
      case 'sfxBossHit':
        this._tone(90, 0.16, 'sawtooth', 0.9, 45);
        break;
      default:
        this._tone(440, 0.06, 'sine', 0.4);
        break;
    }
  }
}
