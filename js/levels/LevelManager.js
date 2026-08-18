import { LEVEL1 } from './Level1.js';
import { LEVEL2 } from './Level2.js';
import { LEVEL3 } from './Level3.js';

export class LevelManager {
  constructor() {
    this.levels = [LEVEL1, LEVEL2, LEVEL3];
    this.currentIndex = 0;
    this.unlockedLevels = 1;
    this.completedLevels = new Set();
  }

  getCurrentLevel() {
    return this.levels[this.currentIndex];
  }

  getLevel(id) {
    return this.levels.find((l) => l.id === id);
  }

  loadLevel(index) {
    this.currentIndex = index;
    const def = this.levels[index];
    const data = def.build();
    return { def, data };
  }

  completeLevel() {
    this.completedLevels.add(this.levels[this.currentIndex].id);
    if (this.currentIndex + 1 < this.levels.length) {
      this.unlockedLevels = Math.max(this.unlockedLevels, this.currentIndex + 2);
    }
  }

  hasNextLevel() {
    return this.currentIndex < this.levels.length - 1;
  }

  nextLevel() {
    if (this.hasNextLevel()) {
      this.currentIndex += 1;
      return this.loadLevel(this.currentIndex);
    }
    return null;
  }

  isBossLevel() {
    return false;
  }

  resetProgress() {
    this.currentIndex = 0;
    this.unlockedLevels = 1;
    this.completedLevels.clear();
  }
}
