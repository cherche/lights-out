export class Keyboard {
  constructor() {
    this.keystates = new Map();
    this.keybinds = new Map();

    addEventListener('keydown', (e) => {
      if (this.keystates.has(e.code)) {
        e.preventDefault();
        this.keystates.set(e.code, true);
      }

      if (this.keybinds.has(e.code)) {
        this.keybinds.get(e.code).forEach((fn) => {
          fn();
        })
      }
    });

    addEventListener('keyup', ({code}) => {
      if (this.keystates.has(code)) {
        this.keystates.set(code, false);
      }
    });
  }

  bind(code, fns) {
    this.keybinds.set(code, fns);
  }

  unbind(code) {
    this.keybinds.delete(code);
  }
}

export class Mouse {
  constructor() {
    this.mousestates = new Map();
  }
}
