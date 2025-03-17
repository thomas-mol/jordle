export class GameView {
  private grid: HTMLElement;

  constructor(gridId: string = "grid") {
    this.grid = document.getElementById(gridId) as HTMLElement;
    if (!this.grid) {
      throw new Error("Grid element not found!");
    }
  }

  renderBoard(rows: number, cols: number): void {
    this.grid.innerHTML = "";

    for (let row = 0; row < rows; row++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
      rowElement.id = `row-${row}`;

      for (let col = 0; col < cols; col++) {
        const boxElement = document.createElement("div");
        boxElement.classList.add("box");
        boxElement.id = `box-${row}-${col}`;
        rowElement.appendChild(boxElement);
      }

      this.grid.appendChild(rowElement);
    }
  }

  updateRow(rowIndex: number, guess: string): void {
    const rowElement = document.querySelector(`#row-${rowIndex}`);
    if (!rowElement) return;

    const boxes = rowElement.querySelectorAll(".box");
    boxes.forEach((box, index) => {
      const boxElement = box as HTMLElement;
      const letter = guess[index] || "";

      if (letter !== boxElement.textContent) {
        if (letter) {
          boxElement.textContent = letter;
          this.animateBox(boxElement, "pop");
        } else {
          boxElement.textContent = "";
        }
      }
    });
  }

  updateRowWithFeedback(
    rowIndex: number,
    guess: string,
    feedback: string[]
  ): void {
    const rowElement = document.querySelector(`#row-${rowIndex}`);
    if (!rowElement) return;

    const boxes = rowElement.querySelectorAll(".box");
    boxes.forEach((box, index) => {
      const boxElement = box as HTMLElement;
      boxElement.textContent = guess[index] || "";

      setTimeout(() => {
        this.animateBox(boxElement, "flip");

        setTimeout(() => {
          boxElement.classList.add(feedback[index]);
        }, 250);
      }, index * 200);
    });
  }

  animateInvalidGuess(rowIndex: number): void {
    const rowElement = document.querySelector(`#row-${rowIndex}`);
    if (!rowElement) return;

    const boxes = rowElement.querySelectorAll(".box");

    boxes.forEach((box) => {
      const boxElement = box as HTMLElement;
      this.animateBox(boxElement, "shake");
    });
  }

  private animateBox(boxElement: HTMLElement, animationType: string): void {
    boxElement.classList.remove("pop", "flip", "shake");

    // void boxElement.offsetWidth;

    boxElement.classList.add(animationType);

    if (animationType !== "flip") {
      const animationDuration = animationType === "pop" ? 150 : 500;
      setTimeout(() => {
        boxElement.classList.remove(animationType);
      }, animationDuration);
    }
  }
}
