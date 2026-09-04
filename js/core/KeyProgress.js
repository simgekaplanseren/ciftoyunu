import { SECRET_LOCK } from '../config/SecretLock.js';

const STORAGE_KEY = 'ciftoyunu_secret_keys';

export class KeyProgress {
  static _read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { collected: [], unlocked: false };
      const data = JSON.parse(raw);
      return {
        collected: Array.isArray(data.collected) ? data.collected : [],
        unlocked: Boolean(data.unlocked),
      };
    } catch (_) {
      return { collected: [], unlocked: false };
    }
  }

  static _write(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  static has(keyId) {
    return this._read().collected.includes(keyId);
  }

  static collect(keyId) {
    if (!keyId || this.has(keyId)) return false;
    const data = this._read();
    data.collected.push(keyId);
    this._write(data);
    return true;
  }

  static count() {
    return this._read().collected.length;
  }

  static canUnlock() {
    return this.count() >= SECRET_LOCK.requiredKeys;
  }

  static isUnlocked() {
    return this._read().unlocked;
  }

  static markUnlocked() {
    const data = this._read();
    data.unlocked = true;
    this._write(data);
  }

  static clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }

  static removeCollected(levelData) {
    if (!levelData?.collectibles) return;
    levelData.collectibles = levelData.collectibles.filter((c) => {
      if (c.type === 'key' && c.keyId) return !this.has(c.keyId);
      return true;
    });
  }
}
