export class InputManager {
  constructor() {
    this.keys = {};
    this.touch = {
      left: false,
      right: false,
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

    this._setupTouchButtons();
    this._preventScroll();
  }

  _setupTouchButtons() {
    const bindings = [
      ['btn-left', 'left'],
      ['btn-right', 'right'],
      ['btn-jump', 'jump'],
      ['btn-attack', 'attack'],
    ];

    for (const [id, action] of bindings) {
      const btn = document.getElementById(id);
      if (!btn) continue;

      const press = (e) => {
        e.preventDefault();
        btn.classList.add('pressed');
        this.touch[action] = true;
        if (action === 'jump') this.touch.jumpPressed = true;
        if (action === 'attack') this.touch.attackPressed = true;
      };

      const release = (e) => {
        e.preventDefault();
        btn.classList.remove('pressed');
        this.touch[action] = false;
      };

      btn.addEventListener('touchstart', press, { passive: false });
      btn.addEventListener('touchend', release, { passive: false });
      btn.addEventListener('touchcancel', release, { passive: false });
      btn.addEventListener('mousedown', press);
      btn.addEventListener('mouseup', release);
      btn.addEventListener('mouseleave', release);
    }
  }

  _preventScroll() {
    document.addEventListener('touchmove', (e) => {
      if (e.target.closest('#touch-controls') || e.target.closest('.menu-btn')) return;
      e.preventDefault();
    }, { passive: false });

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
