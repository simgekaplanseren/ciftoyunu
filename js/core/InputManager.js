export class InputManager {
  constructor() {
    this.keys = {};
    this.touch = {
      left: false,
      right: false,
      down: false,
      jump: false,
      attack: false,
      jumpPressed: false,
      attackPressed: false,
    };
    this.pausePressed = false;
    this._bound = false;
  }

  init() {
    if (this._bound) return;
    this._bound = true;

    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Escape' || e.code === 'KeyP') {
        this.pausePressed = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    window.addEventListener('blur', () => this.reset());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.reset();
    });

    this._setupTouchButtons();
    this._preventScroll();
  }

  /** Takılı kalan tuş/dokunma durumunu sıfırla */
  reset() {
    this.keys = {};
    this.touch.left = false;
    this.touch.right = false;
    this.touch.down = false;
    this.touch.jump = false;
    this.touch.attack = false;
    this.touch.jumpPressed = false;
    this.touch.attackPressed = false;
    this.pausePressed = false;
    for (const btn of document.querySelectorAll('.ctrl-btn.pressed')) {
      btn.classList.remove('pressed');
    }
  }

  _bindButton(btn, action) {
    const release = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      btn.classList.remove('pressed');
      this.touch[action] = false;
    };

    const press = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      btn.classList.add('pressed');
      this.touch[action] = true;
      if (action === 'jump') this.touch.jumpPressed = true;
      if (action === 'attack') this.touch.attackPressed = true;
      try {
        btn.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    btn.addEventListener('pointerdown', press);
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
    btn.addEventListener('lostpointercapture', release);
  }

  _setupTouchButtons() {
    const bindings = [
      ['btn-left', 'left'],
      ['btn-right', 'right'],
      ['btn-jump', 'jump'],
    ];

    for (const [id, action] of bindings) {
      const btn = document.getElementById(id);
      if (!btn) continue;
      this._bindButton(btn, action);
    }

    const pauseBtn = document.getElementById('btn-pause');
    pauseBtn?.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
    pauseBtn?.addEventListener('pointerdown', (e) => e.stopPropagation());
  }

  _preventScroll() {
    document.addEventListener('gesturestart', (e) => e.preventDefault());
  }

  isLeft() {
    return this.keys['ArrowLeft'] || this.keys['KeyA'] || this.touch.left;
  }

  isRight() {
    return this.keys['ArrowRight'] || this.keys['KeyD'] || this.touch.right;
  }

  isJump() {
    return this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['Space'] || this.touch.jump;
  }

  isDown() {
    return this.keys['ArrowDown'] || this.keys['KeyS'] || this.touch.down;
  }

  wasJumpPressed() {
    const pressed = this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['Space'] || this.touch.jumpPressed;
    this.touch.jumpPressed = false;
    return pressed;
  }

  wasAttackPressed() {
    const pressed = this.keys['KeyX'] || this.keys['KeyJ'] || this.keys['KeyZ'] || this.touch.attackPressed;
    this.touch.attackPressed = false;
    return pressed;
  }

  wasPausePressed() {
    const p = this.pausePressed;
    this.pausePressed = false;
    return p;
  }

  vibrate(pattern) {
    if (navigator.vibrate && document.getElementById('vibration-toggle')?.checked) {
      navigator.vibrate(pattern);
    }
  }
}
