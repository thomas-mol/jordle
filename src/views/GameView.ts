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
      (box as HTMLElement).textContent = guess[index] || "";
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
      setTimeout(() => {
        boxElement.classList.add("flip");
        boxElement.textContent = guess[index] || "";
        boxElement.classList.add(feedback[index]);
        setTimeout(() => {
          boxElement.classList.remove("flip");
        }, 500);
      }, index * 300);
    });
  }
}
