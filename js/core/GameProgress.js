const PROGRESS_KEY = 'ciftoyunu_progress';
/** Kayıt formatı değişince artır — eski test kayıtları sıfırlanır */
export const PROGRESS_VERSION = 2;

export class GameProgress {
  static save(levelManager) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        version: PROGRESS_VERSION,
        sectionProgress: levelManager.sectionProgress,
        unlockedSections: [...levelManager.unlockedSections],
        completedLevels: [...levelManager.completedLevels],
      }));
    } catch (_) {}
  }

  static load(levelManager) {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (data.version !== PROGRESS_VERSION) {
        localStorage.removeItem(PROGRESS_KEY);
        return false;
      }

      if (data.sectionProgress) {
        levelManager.sectionProgress = { ...data.sectionProgress };
      }
      if (Array.isArray(data.unlockedSections)) {
        levelManager.unlockedSections = new Set(data.unlockedSections);
      }
      if (Array.isArray(data.completedLevels)) {
        levelManager.completedLevels = new Set(data.completedLevels);
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  static clear() {
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch (_) {}
  }
}
