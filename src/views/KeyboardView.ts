import { InputController } from "../controllers/InputController";

// views/KeyboardView.ts
export class KeyboardView {
  private container: HTMLElement;
  private inputController: InputController;

  constructor(containerId: string, inputController: InputController) {
    this.container = document.getElementById(containerId) as HTMLElement;
    if (!this.container) {
      throw new Error("Keyboard container not found!");
    }
    this.inputController = inputController;
  }

  renderKeyboard(): void {
    this.container.innerHTML = "";
    const rowLetters = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    rowLetters.forEach((letters, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("keyboard-row");

      // Add special Enter key to the start of the bottom row
      if (rowIndex === 2) {
        const enterKey = document.createElement("div");
        enterKey.classList.add("letter", "enter-key");
        enterKey.id = "key-enter";
        enterKey.innerText = "Enter";
        enterKey.setAttribute("data-key", "Enter");
        rowElement.appendChild(enterKey);
      }

      // Add letter keys
      letters.split("").forEach((letter) => {
        const letterElement = document.createElement("div");
        letterElement.classList.add("letter");
        letterElement.id = `letter-${letter}`;
        letterElement.innerText = letter;
        letterElement.setAttribute("data-key", letter);
        rowElement.appendChild(letterElement);
      });

      // Add special Backspace key to the end of the bottom row
      if (rowIndex === 2) {
        const backspaceKey = document.createElement("div");
        backspaceKey.classList.add("letter", "special-key");
        backspaceKey.id = "key-backspace";
        backspaceKey.innerText = "⌫";
        backspaceKey.setAttribute("data-key", "Backspace");
        rowElement.appendChild(backspaceKey);
      }

      this.container.appendChild(rowElement);
    });

    // Set up click handlers for keyboard keys
    this.inputController.setupClickHandlers(".letter");
  }

  updateKeyColor(letter: string, state: string): void {
    const keyElement = document.getElementById(`letter-${letter}`);
    if (!keyElement) return;

    const currentState = keyElement.classList.contains("correct")
      ? "correct"
      : keyElement.classList.contains("almost")
      ? "almost"
      : "wrong";

    const shouldUpdate =
      state === "correct" ||
      (state === "almost" && currentState !== "correct") ||
      (state === "wrong" &&
        currentState !== "correct" &&
        currentState !== "almost");

    if (shouldUpdate) {
      keyElement.classList.remove("correct", "almost", "wrong");
      keyElement.classList.add(state);
    }
  }

  disableKeyboard(): void {
    const keys = document.querySelectorAll(".letter");
    keys.forEach((key) => {
      key.classList.add("disabled");
    });
    this.inputController.disable();
  }

  enableKeyboard(): void {
    const keys = document.querySelectorAll(".letter");
    keys.forEach((key) => {
      key.classList.remove("disabled");
    });
    this.inputController.enable();
  }
}
