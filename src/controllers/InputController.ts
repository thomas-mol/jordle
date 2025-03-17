export class InputController {
  private onKeyPress: (key: string) => void;
  private isEnabled: boolean = true;
  private keydownHandler: (event: KeyboardEvent) => void;

  constructor(onKeyPress: (key: string) => void) {
    this.onKeyPress = onKeyPress;
    this.keydownHandler = this.handleKeyDown.bind(this);
    this.setupKeyboardListener();
  }

  setupKeyboardListener(): void {
    document.addEventListener("keydown", this.keydownHandler);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isEnabled) return;

    const key = event.key.toLowerCase();

    if (/^[a-z]$/.test(key)) {
      this.onKeyPress(key);
    } else if (key === "enter") {
      this.onKeyPress("Enter");
    } else if (key === "backspace") {
      this.onKeyPress("Backspace");
    }
  }

  setupClickHandlers(elementSelector: string): void {
    document.querySelectorAll(elementSelector).forEach((element) => {
      element.addEventListener("click", (event) => {
        if (!this.isEnabled) return;

        const key = (event.currentTarget as HTMLElement).getAttribute(
          "data-key"
        );
        if (key) {
          this.onKeyPress(key);
        }
      });
    });
  }

  disable(): void {
    this.isEnabled = false;
  }

  enable(): void {
    this.isEnabled = true;
  }

  cleanup(): void {
    document.removeEventListener("keydown", this.keydownHandler);
  }
}
