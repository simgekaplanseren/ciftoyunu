import {
  LEVEL_LEFKOSA,
  LEVEL_GIRNE,
  LEVEL_MAGUSA,
  LEVEL_DIPKARPAZ,
} from './CyprusLevels.js';
import {
  LEVEL_HAYVANAT,
  LEVEL_ICONOVA,
  LEVEL_PETPARK,
  LEVEL_SEHITKAMIL,
} from './GaziantepLevels.js';
import {
  LEVEL_ALSANCAK,
  LEVEL_KUSADASI,
  LEVEL_SIRINCE,
  LEVEL_SELCUK,
} from './IzmirLevels.js';
import { LEVEL_DOGUMGUNU } from './IstanbulLevels.js';
import { GAME_SECTIONS, getDefaultUnlockedSections, UNLOCK_ALL_LEVELS } from '../config/GameSections.js';
import { GameProgress } from '../core/GameProgress.js';
import { KeyProgress } from '../core/KeyProgress.js';

const SECTION_UNLOCK_CHAIN = {
  cyprus: 'gaziantep',
  gaziantep: 'izmir',
  izmir: 'istanbul',
};

function defaultSectionProgress() {
  if (UNLOCK_ALL_LEVELS) {
    return Object.fromEntries(GAME_SECTIONS.map((s) => [s.id, 99]));
  }
  const progress = {};
  for (const section of GAME_SECTIONS) {
    progress[section.id] = section.defaultUnlocked ? 1 : 0;
  }
  return progress;
}

export class LevelManager {
  constructor() {
    this.levels = [
      LEVEL_LEFKOSA,
      LEVEL_GIRNE,
      LEVEL_MAGUSA,
      LEVEL_DIPKARPAZ,
      LEVEL_HAYVANAT,
      LEVEL_ICONOVA,
      LEVEL_PETPARK,
      LEVEL_SEHITKAMIL,
      LEVEL_ALSANCAK,
      LEVEL_KUSADASI,
      LEVEL_SIRINCE,
      LEVEL_SELCUK,
      LEVEL_DOGUMGUNU,
    ];
    this.currentIndex = 0;
    this.completedLevels = new Set();
    this.unlockedSections = getDefaultUnlockedSections();
    this.sectionProgress = defaultSectionProgress();
    const loaded = GameProgress.load(this);
    if (!loaded) {
      KeyProgress.clear();
      GameProgress.save(this);
    }
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
    KeyProgress.removeCollected(data);
    return { def, data };
  }

  completeLevel() {
    const level = this.levels[this.currentIndex];
    this.completedLevels.add(level.id);
    if (!level.sectionId) {
      GameProgress.save(this);
      return;
    }

    const sectionLevels = this.getLevelsForSection(level.sectionId);
    const idx = sectionLevels.findIndex((l) => l.id === level.id);
    if (idx < 0) return;

    this.sectionProgress[level.sectionId] = Math.max(
      this.sectionProgress[level.sectionId] ?? 0,
      idx + 2,
    );

    if (idx === sectionLevels.length - 1) {
      const nextSection = SECTION_UNLOCK_CHAIN[level.sectionId];
      if (nextSection) {
        this.unlockSection(nextSection);
        this.sectionProgress[nextSection] = Math.max(
          this.sectionProgress[nextSection] ?? 0,
          1,
        );
      }
    }

    GameProgress.save(this);
  }

  isLastLevelInSection(level = this.levels[this.currentIndex]) {
    if (!level?.sectionId) return false;
    const sectionLevels = this.getLevelsForSection(level.sectionId);
    return sectionLevels[sectionLevels.length - 1]?.id === level.id;
  }

  getNextSectionId(sectionId) {
    return SECTION_UNLOCK_CHAIN[sectionId] ?? null;
  }

  willCrossSectionBoundary() {
    if (!this.hasNextLevel()) return false;
    const current = this.levels[this.currentIndex];
    const next = this.levels[this.currentIndex + 1];
    return current.sectionId !== next.sectionId;
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

  isSectionUnlocked(sectionId) {
    return this.unlockedSections.has(sectionId);
  }

  unlockSection(sectionId) {
    this.unlockedSections.add(sectionId);
  }

  getLevelsForSection(sectionId) {
    return this.levels.filter((l) => l.sectionId === sectionId);
  }

  isLevelUnlocked(level) {
    if (!level.sectionId || !this.isSectionUnlocked(level.sectionId)) return false;
    const sectionLevels = this.getLevelsForSection(level.sectionId);
    const idx = sectionLevels.findIndex((l) => l.id === level.id);
    if (idx < 0) return false;
    return idx < (this.sectionProgress[level.sectionId] ?? 0);
  }

  resetProgress() {
    this.currentIndex = 0;
    this.completedLevels.clear();
    this.unlockedSections = getDefaultUnlockedSections();
    this.sectionProgress = defaultSectionProgress();
  }
}
