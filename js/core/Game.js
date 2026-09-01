import { GAME_CONFIG, COLORS, CHARACTERS } from '../config/assets.js';
import { Camera } from './Camera.js';
import { InputManager } from './InputManager.js';
import { AudioManager, AssetLoader } from './AudioManager.js';
import { ParticleSystem } from './ParticleSystem.js';
import { SpriteRenderer } from '../utils/SpriteRenderer.js';
import { Player } from '../entities/Player.js';
import { drawPlatforms } from '../entities/Platform.js';
import { LevelManager } from '../levels/LevelManager.js';
import { HUD } from '../ui/HUD.js';
import { ScreenManager } from '../ui/ScreenManager.js';
import { MenuManager } from '../ui/MenuManager.js';
import { aabbOverlap } from '../utils/Collision.js';
import { drawZoneBackground } from '../levels/CyprusAtmosphere.js';
import { getSectionById } from '../config/GameSections.js';
import { LEVEL } from '../levels/levelUtils.js';
import { isMobileDevice } from '../utils/appShell.js';

export class Game {
  constructor(canvas, orientation = null) {
    this.canvas = canvas;
    this.orientation = orientation;
    this.ctx = canvas.getContext('2d');
    this.config = GAME_CONFIG;

    this.input = new InputManager();
    this.camera = new Camera(this.config.width, this.config.height);
    this.audio = new AudioManager();
    this.assetLoader = new AssetLoader();
    this.sprites = null;
    this.particles = new ParticleSystem();

    this.levelManager = new LevelManager();
    this.hud = new HUD();
    this.screens = new ScreenManager();
    this.menu = null;

    this.state = 'menu';
    this.selectedCharacter = null;
    this.levelDef = null;
    this.levelData = null;
    this.player = null;

    this.scale = 1;
    this.lastTime = 0;
    this.reunionPhase = 'none'; // none | running | hugging
    this.reunionAnim = 0;
    this.reunionNext = null;
    this.charPreviewAnim = 0;
    this.victoryAnim = 0;

    this._resizeHandler = () => this.resize();
  }

  async init() {
    const { ASSETS } = await import('../config/assets.js');
    await this.assetLoader.load(ASSETS.images, ASSETS.useCustomSprites);
    await this.audio.init(ASSETS.audio);

    this.sprites = new SpriteRenderer(this.assetLoader);
    this.menu = new MenuManager(this);

    document.body.classList.add('in-menu');

    this.input.init();
    this.resize();
    window.addEventListener('resize', this._resizeHandler);
    window.addEventListener('orientationchange', this._resizeHandler);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this._resizeHandler);
      window.visualViewport.addEventListener('scroll', this._resizeHandler);
    }

    this._drawCharacterPreviews();
    this.audio.playMusic('musicMenu');
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  _drawCharacterPreviews() {
    const previews = [
      ['preview-girl', 'girl'],
      ['preview-fadil', 'fadil'],
    ];
    const scale = 3;
    const charW = LEVEL.PLAYER_W;
    const charH = LEVEL.PLAYER_H;

    for (const [id, char] of previews) {
      const c = document.getElementById(id);
      if (!c) continue;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'rgba(45, 27, 78, 0.5)';
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.imageSmoothingEnabled = false;
      ctx.save();
      ctx.translate(
        (c.width - charW * scale) / 2,
        (c.height - charH * scale) / 2
      );
      ctx.scale(scale, scale);
      this.sprites?.drawCharacter(ctx, 0, 0, charW, charH, char, 1, 'idle', this.charPreviewAnim);
      ctx.restore();
    }
  }

  showCharacterSelect() {
    this.state = 'characterSelect';
    this.screens.showCharacterSelect();
    this._drawCharacterPreviews();
    if (this.selectedCharacter) {
      this._updateCharacterSelectionUI();
    }
  }

  selectCharacter(character) {
    this.selectedCharacter = character;
    this._updateCharacterSelectionUI();
  }

  _updateCharacterSelectionUI() {
    document.querySelectorAll('.char-card').forEach((card) => {
      card.classList.toggle('selected', card.dataset.character === this.selectedCharacter);
    });
    const btn = document.getElementById('btn-confirm-start');
    if (btn) btn.disabled = !this.selectedCharacter;
  }

  _isTouchDevice() {
    return isMobileDevice();
  }

  resize() {
    const vv = window.visualViewport;
    let cw = vv?.width ?? window.innerWidth;
    let ch = vv?.height ?? window.innerHeight;

    const aspect = this.config.width / this.config.height;
    const landscape = cw > ch;

    let w, h;
    if (landscape) {
      w = cw;
      h = w / aspect;
      if (h > ch) {
        h = ch;
        w = h * aspect;
      }
    } else if (cw / ch > aspect) {
      h = ch;
      w = h * aspect;
    } else {
      w = cw;
      h = w / aspect;
    }

    this.scale = w / this.config.width;
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;
    this.canvas.style.width = `${Math.floor(w)}px`;
    this.canvas.style.height = `${Math.floor(h)}px`;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = `${Math.floor((cw - w) / 2)}px`;
    this.canvas.style.top = `${Math.floor((ch - h) / 2)}px`;
    this.canvas.style.maxWidth = 'none';
    this.canvas.style.maxHeight = 'none';
  }

  _createPlayer(x, y, carryStats = null) {
    const p = new Player(x, y, this.sprites, this.selectedCharacter || 'girl');
    p.hearts = p.maxHearts;
    if (carryStats?.score != null) {
      p.score = carryStats.score;
    }
    return p;
  }

  async startGame(levelIndex = 0) {
    if (!this.selectedCharacter) {
      this.menu.pendingLevelIndex = levelIndex;
      this.showCharacterSelect();
      return;
    }

    this.levelManager.currentIndex = levelIndex;
    await this._loadCurrentLevel();
    this.screens.hideAll();
    this.hud.show();
    this._showTouchControls();
    this.state = 'playing';
    document.body.classList.add('is-playing');
    document.body.classList.remove('in-menu');
    this.orientation?.lockLandscape();
    this.orientation?.update();
    this.resize();
    this.audio.playMusic(this.levelDef.music);
  }

  async _loadCurrentLevel(carryStats = null) {
    const { def, data } = this.levelManager.loadLevel(this.levelManager.currentIndex);
    this.levelData = data;
    this.reunionPhase = 'none';
    this.reunionAnim = 0;
    this.reunionNext = null;

    this.player = this._createPlayer(def.spawn.x, def.spawn.y, carryStats);
    const levelWidth = data.actualWidth ?? def.width;
    this.levelDef = { ...def, width: levelWidth };
    this.camera.setLevelBounds(levelWidth, def.height);
    this.camera.x = 0;
    this.camera.y = 0;
    this.particles.clear();
  }

  async nextLevel() {
    if (this.state !== 'levelComplete' && this.state !== 'victory') return;

    const savedStats = {
      score: this.player?.score ?? 0,
    };

    this.screens.hideAll();

    if (!this.levelManager.hasNextLevel()) {
      this.showVictory();
      return;
    }

    const crossingSection = this.levelManager.willCrossSectionBoundary();
    const nextSectionId = crossingSection
      ? this.levelManager.getNextSectionId(this.levelDef.sectionId)
      : null;
    const nextSection = nextSectionId ? getSectionById(nextSectionId) : null;

    const next = this.levelManager.nextLevel();

    if (crossingSection && nextSection) {
      await this.screens.playTransition(
        `${nextSection.emoji} ${nextSection.name}`,
        2400
      );
    }

    await this.screens.playTransition(
      `${next.def.emoji} ${next.def.name}`,
      1800
    );

    this.levelDef = next.def;
    this.levelData = next.data;
    const levelWidth = next.data.actualWidth ?? next.def.width;
    this.levelDef = { ...next.def, width: levelWidth };
    this.player = this._createPlayer(next.def.spawn.x, next.def.spawn.y, savedStats);
    this.camera.setLevelBounds(levelWidth, next.def.height);
    this.camera.x = 0;
    this.reunionPhase = 'none';
    this.particles.clear();
    this.state = 'playing';
    this.hud.show();
    this._showTouchControls();
    this.audio.playMusic(next.def.music);
  }

  async retryLevel() {
    const savedScore = this.player?.score ?? 0;
    await this._loadCurrentLevel({ score: savedScore });
    this.screens.hideAll();
    this.hud.show();
    this._showTouchControls();
    this.state = 'playing';
  }

  pause() {
    if (this.state !== 'playing' || this.reunionPhase !== 'none') return;
    this.state = 'paused';
    this.audio.pauseMusic();
    this.screens.showPause();
    this._hideTouchControls();
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.audio.resumeMusic();
    this.screens.hideAll();
    this._showTouchControls();
  }

  returnToMainMenu() {
    this.state = 'menu';
    document.body.classList.remove('is-playing');
    document.body.classList.add('in-menu');
    this.orientation?.unlock();
    this.orientation?.update();
    this.reunionPhase = 'none';
    this.reunionAnim = 0;
    this.reunionNext = null;
    this.hud.hide();
    this._hideTouchControls();
    this.screens.hideAll();
    this.screens.show('menu');
    this.audio.playMusic('musicMenu');
    this.resize();
  }

  showVictory() {
    this.state = 'victory';
    document.body.classList.remove('is-playing');
    document.body.classList.add('in-menu');
    this.orientation?.unlock();
    this.orientation?.update();
    this.hud.hide();
    this._hideTouchControls();
    this.audio.playMusic('musicMenu');
    this.audio.playSfx('sfxVictory');
    this.victoryAnim = 0;
    this.screens.showVictory();
    this.resize();
  }

  showFinalScreen() {
    this.state = 'final';
    this.screens.showFinal();
  }

  _completeGame() {
    this.showVictory();
  }

  _showTouchControls() {
    const el = document.getElementById('touch-controls');
    if (!el) return;
    if (this._isTouchDevice()) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
    this.orientation?.update();
    this.resize();
  }

  _hideTouchControls() {
    document.getElementById('touch-controls')?.classList.add('hidden');
  }

  _loop(timestamp) {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    this.update(dt);
    this.render();

    requestAnimationFrame(this._loop);
  }

  update(dt) {
    if (this.state === 'playing') {
      if (this.reunionPhase === 'none') {
        this._updateGameplay(dt);
      } else {
        this._updateReunion(dt);
      }
    } else if (this.state === 'characterSelect') {
      this.charPreviewAnim += dt;
      this._drawCharacterPreviews();
    } else if (this.state === 'levelComplete' || this.state === 'victory') {
      this.victoryAnim += dt;
      this._drawReunionCanvas('reunion-canvas', 160, 70, 1.4);
      if (this.state === 'victory') {
        this._drawReunionCanvas('victory-canvas', 240, 60, 1.6);
      }
    }
  }

  _updateReunion(dt) {
    const lover = this.levelData?.lover;
    if (!lover) return;

    this.reunionAnim += dt;
    lover.update(dt);

    const py = lover.y;
    const stopX = lover.x - 26;

    if (this.reunionPhase === 'running') {
      const dx = stopX - this.player.x;
      if (Math.abs(dx) > 3) {
        this.player.x += Math.sign(dx) * 160 * dt;
        this.player.facing = 1;
        this.player.state = 'run';
        this.player.y = py;
        this.player.vy = 0;
        this.player.animFrame += dt;
      } else {
        this.player.x = stopX;
        this.player.y = py;
        this.reunionPhase = 'hugging';
        this.reunionAnim = 0;
        lover.waiting = false;
        this.particles.emitHearts(lover.x, py, 10);
        this.audio.playSfx('sfxVictory');
      }
      this.camera.follow(this.player, dt);
    } else if (this.reunionPhase === 'hugging') {
      this.player.state = 'idle';
      this.player.animFrame += dt;
      if (Math.floor(this.reunionAnim * 3) % 2 === 0) {
        this.particles.emitHearts((this.player.x + lover.x) / 2, py - 5, 1);
      }
      this.particles.update(dt);
      this.camera.follow(
        { x: (this.player.x + lover.x) / 2 - 10, y: py, width: 20, height: 28 },
        dt
      );

      if (this.reunionAnim >= 2.8) {
        this._finishAfterKiss();
      }
    }
  }

  _startReunionRun() {
    if (this.reunionPhase !== 'none') return;
    if (!this.reunionNext) {
      this.reunionNext = this.levelManager.hasNextLevel() ? 'levelComplete' : 'victory';
    }
    this.reunionPhase = 'running';
    this.reunionAnim = 0;
    this.hud.hide();
    this._hideTouchControls();
    this.player.vx = 0;
    this.player.vy = 0;
  }

  _finishAfterKiss() {
    this.reunionPhase = 'none';
    this.levelManager.completeLevel();
    this.victoryAnim = 0;

    const next = this.reunionNext;
    this.reunionNext = null;

    if (next === 'victory') {
      this.showVictory();
    } else {
      let completeMsg = null;
      if (this.levelManager.isLastLevelInSection(this.levelDef)) {
        const nextSectionId = this.levelManager.getNextSectionId(this.levelDef.sectionId);
        const nextSection = nextSectionId ? getSectionById(nextSectionId) : null;
        if (nextSection) {
          completeMsg = `Sırada ${nextSection.name}! Devam Et'e bas. ${nextSection.emoji}`;
        }
      }

      this.state = 'levelComplete';
      this.screens.showLevelComplete(
        this.player.score,
        this.levelDef.name,
        this.levelManager.currentIndex,
        completeMsg
      );
    }
  }

  getLevelDisplayName() {
    if (!this.levelDef) return '';
    return `${this.levelDef.emoji} ${this.levelDef.name}`;
  }

  _updateGameplay(dt) {
    if (this.input.wasPausePressed()) {
      this.pause();
      return;
    }

    const { platforms, traps, enemies, collectibles, lover } = this.levelData;

    for (const p of platforms) {
      if (p.type === 'moving') p.update(dt);
    }

    this.player.update(dt, this.input, platforms);

    if (this.player.didJump) {
      this.audio.playSfx('sfxJump');
      this.player.didJump = false;
    }
    if (this.player.didAttack) {
      this.audio.playSfx('sfxAttack');
      this.player.didAttack = false;
    }

    for (const trap of traps) {
      trap.update(dt);
      if (trap.check(this.player)) {
        this.audio.playSfx('sfxHurt');
        this.input.vibrate(100);
        this.particles.emitHit(this.player.x + 10, this.player.y + 10);
        this.camera.addShake(3, 0.2);
      }
    }

    for (const enemy of enemies) {
      enemy.update(dt);

      if (enemy.collidesWith(this.player.getBounds()) && this.player.invincible <= 0) {
        if (this.player.takeDamage(enemy.damage)) {
          this.audio.playSfx('sfxHurt');
          this.input.vibrate(100);
          this.camera.addShake(4, 0.25);
          this.player.vx = (this.player.x < enemy.x ? -1 : 1) * 100;
        }
      }

      if (this.player.attackHitbox && aabbOverlap(enemy.getBounds(), this.player.attackHitbox)) {
        if (enemy.takeHit()) {
          this.player.addScore(25);
          this.audio.playSfx('sfxEnemyHit');
          this.particles.emitHit(enemy.x + 12, enemy.y + 10);
          this.particles.emitHearts(enemy.x + 12, enemy.y, 2);
        }
      }
    }

    for (const item of collectibles) {
      item.update(dt);
      const result = item.tryCollect(this.player);
      if (result) {
        this.audio.playSfx('sfxCollect');
        this.particles.emitHearts(item.x, item.y, 3);
        if (result === 'key') this.input.vibrate(50);
      }
    }

    if (lover && lover.active && lover.visible && this.reunionPhase === 'none') {
      lover.update(dt);
      if (this.player.x >= lover.triggerX) {
        this._startReunionRun();
      }
    }

    if (this.player.dead) {
      this.state = 'gameover';
      this.hud.hide();
      this._hideTouchControls();
      this.screens.showGameOver();
      return;
    }

    this.camera.follow(this.player, dt);
    this.particles.update(dt);
    this.hud.update(this.player, this.getLevelDisplayName());
  }

  _completeLevel() {
    // Artık kullanılmıyor — _startReunionRun + _finishAfterKiss kullanılıyor
  }

  _drawReunionCanvas(canvasId, cx, cy, scale) {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.imageSmoothingEnabled = false;

    const grad = ctx.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, '#2d1b4e');
    grad.addColorStop(1, '#1a0f2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);

    this.sprites.drawKissingCouple(
      ctx, cx, cy, scale, this.victoryAnim || this.reunionAnim,
      this.selectedCharacter || 'girl'
    );
  }

  render() {
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    this.camera.reset(ctx);

    if (this.state === 'menu' || this.state === 'final' || this.state === 'characterSelect') {
      this._drawMenuBackground(ctx);
      return;
    }

    if (this.state === 'playing' || this.state === 'paused' || this.state === 'gameover') {
      this._renderLevel(ctx);
    } else if (this.state === 'levelComplete' || this.state === 'victory') {
      this._drawMenuBackground(ctx);
    }
  }

  _drawBackground(ctx, theme) {
    if (this.levelDef?.atmosphere && this.levelDef?.sectionId) {
      drawZoneBackground(
        ctx,
        this.levelDef.atmosphere,
        this.levelDef.width,
        this.config.height,
      );
      return;
    }

    const colors = {
      forest: COLORS.skyForest,
      cave: COLORS.skyCave,
      castle: COLORS.skyCastle,
    };
    const sky = colors[theme] || colors.forest;
    const grad = ctx.createLinearGradient(0, 0, 0, this.config.height);
    grad.addColorStop(0, sky[0]);
    grad.addColorStop(0.5, sky[1]);
    grad.addColorStop(1, sky[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.levelDef?.width || this.config.width, this.config.height);

    if (theme === 'forest') {
      ctx.fillStyle = 'rgba(74, 25, 66, 0.3)';
      for (let i = 0; i < 20; i++) {
        const tx = (i * 137) % (this.levelDef?.width || 800);
        ctx.beginPath();
        ctx.moveTo(tx, this.config.height);
        ctx.lineTo(tx + 20, this.config.height - 60 - (i % 3) * 20);
        ctx.lineTo(tx + 40, this.config.height);
        ctx.fill();
      }
    } else if (theme === 'cave') {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      for (let i = 0; i < 15; i++) {
        const sx = (i * 173) % (this.levelDef?.width || 800);
        ctx.beginPath();
        ctx.arc(sx, 30 + (i % 4) * 10, 8 + i % 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme === 'castle') {
      ctx.fillStyle = 'rgba(49, 46, 129, 0.4)';
      for (let i = 0; i < 8; i++) {
        const bx = i * 300 + 100;
        ctx.fillRect(bx, 40, 40, 80);
        ctx.fillRect(bx - 10, 30, 60, 15);
      }
    }
  }

  _renderLevel(ctx) {
    if (!this.levelDef || !this.levelData) return;

    ctx.save();
    this.camera.apply(ctx);

    this._drawBackground(ctx, this.levelDef.background);

    drawPlatforms(ctx, this.levelData.platforms, this.sprites);

    if (this.reunionPhase === 'none') {
      for (const trap of this.levelData.traps) {
        trap.draw(ctx, this.sprites);
      }

      for (const item of this.levelData.collectibles) {
        item.draw(ctx, this.sprites);
      }

      for (const enemy of this.levelData.enemies) {
        enemy.draw(ctx, this.sprites);
      }
    }

    const lover = this.levelData.lover;
    const char = this.selectedCharacter || 'girl';

    if (this.reunionPhase === 'running' || this.reunionPhase === 'hugging') {
      this.sprites.drawReunionScene(
        ctx,
        this.player.x,
        lover.x,
        lover.y,
        this.reunionAnim,
        char,
        this.reunionPhase === 'running' ? 'running' : 'hugging'
      );
    } else {
      if (lover && lover.visible) {
        lover.draw(ctx, this.sprites, char);
      }
      this.player.draw(ctx);
    }

    this.particles.draw(ctx);
    ctx.restore();

    if (this.reunionPhase !== 'none') {
      const loverName = CHARACTERS[char]?.loverName || 'Sevgili';
      ctx.fillStyle = 'rgba(26, 15, 46, 0.6)';
      ctx.fillRect(0, 0, this.config.width, 36);
      ctx.fillStyle = '#ff6b9d';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      const msg = this.reunionPhase === 'running'
        ? `${loverName}'e koş`
        : 'Sevgiline kavuştun ❤️';
      ctx.fillText(msg, this.config.width / 2, 22);
    }
  }

  _drawMenuBackground(ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, this.config.height);
    grad.addColorStop(0, COLORS.skyForest[0]);
    grad.addColorStop(0.5, COLORS.skyForest[1]);
    grad.addColorStop(1, COLORS.skyForest[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.config.width, this.config.height);
  }
}
