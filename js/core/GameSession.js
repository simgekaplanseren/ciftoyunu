const SESSION_KEY = 'ciftoyunu_session';

export class GameSession {
  static save(game) {
    const state = game.state;
    if (state !== 'playing' && state !== 'paused') {
      GameSession.clear();
      return;
    }

    if (!game.selectedCharacter || !game.player || !game.levelDef) {
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        state,
        levelIndex: game.levelManager.currentIndex,
        character: game.selectedCharacter,
        score: game.player.score,
        hearts: game.player.hearts,
        playerX: Math.round(game.player.x),
        playerY: Math.round(game.player.y),
        savedAt: Date.now(),
      }));
    } catch (_) {}
  }

  static load() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;

      const data = JSON.parse(raw);
      if (!data?.character || data.levelIndex == null) return null;
      if (Date.now() - (data.savedAt ?? 0) > 1000 * 60 * 60 * 6) {
        GameSession.clear();
        return null;
      }
      return data;
    } catch (_) {
      return null;
    }
  }

  static clear() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (_) {}
  }
}
