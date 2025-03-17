export class GameState {
  currentRow: number = 0;
  currentGuess: string = "";
  maxAttempts: number = 7;
  wordLength: number = 6;
  guesses: string[] = [];
  feedbacks: string[][] = [];
  isGameOver: boolean = false;
  isWin: boolean = false;

  resetGame(): void {
    this.currentRow = 0;
    this.currentGuess = "";
    this.guesses = [];
    this.feedbacks = [];
    this.isGameOver = false;
    this.isWin = false;
  }

  addLetter(letter: string): boolean {
    if (this.isGameOver || this.currentGuess.length >= this.wordLength)
      return false;
    this.currentGuess += letter;
    return true;
  }

  removeLetter(): boolean {
    if (this.isGameOver || this.currentGuess.length <= 0) return false;
    this.currentGuess = this.currentGuess.slice(0, -1);
    return true;
  }

  submitGuess(feedback: string[]): void {
    this.guesses.push(this.currentGuess);
    this.feedbacks.push(feedback);
    this.currentRow++;
    this.currentGuess = "";
  }

  endGame(isWin: boolean): void {
    this.isGameOver = true;
    this.isWin = isWin;
  }
}
