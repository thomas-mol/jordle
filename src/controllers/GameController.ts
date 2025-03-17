import { GameState } from "../models/GameState";
import { WordModel } from "../models/WordModel";
import { GameView } from "../views/GameView";
import { KeyboardView } from "../views/KeyboardView";
import { NotificationView } from "../views/NotificationView";
import { InputController } from "./InputController";

// controllers/GameController.ts
export class GameController {
  private wordModel: WordModel;
  private gameState: GameState;
  private boardView: GameView;
  private keyboardView: KeyboardView;
  private notificationView: NotificationView;
  private inputController: InputController;

  constructor(wordList: string[]) {
    this.wordModel = new WordModel(wordList);
    this.gameState = new GameState();
    this.boardView = new GameView("grid");
    this.notificationView = new NotificationView();

    // Initialize input controller
    this.inputController = new InputController(this.handleInput.bind(this));

    // Initialize board
    console.log(this.wordModel.targetWord); // For debugging
    this.boardView.renderBoard(
      this.gameState.maxAttempts,
      this.gameState.wordLength
    );

    // Setup keyboard with input controller
    this.keyboardView = new KeyboardView(
      "keyboard-container",
      this.inputController
    );
    this.keyboardView.renderKeyboard();

    // Set the first guess to "jorien"
    this.gameState.currentGuess = "jorien";
    this.handleGuess();
  }

  handleInput(key: string): void {
    if (this.gameState.isGameOver) return;

    if (
      key === "Enter" &&
      this.gameState.currentGuess.length === this.gameState.wordLength
    ) {
      this.handleGuess();
    } else if (key === "Backspace" && this.gameState.currentGuess.length > 0) {
      if (this.gameState.removeLetter()) {
        this.boardView.updateRow(
          this.gameState.currentRow,
          this.gameState.currentGuess
        );
      }
    } else if (
      /^[a-z]$/.test(key) &&
      this.gameState.currentGuess.length < this.gameState.wordLength
    ) {
      if (this.gameState.addLetter(key)) {
        this.boardView.updateRow(
          this.gameState.currentRow,
          this.gameState.currentGuess
        );
      }
    }
  }

  handleGuess(): void {
    const guess = this.gameState.currentGuess;

    // Check if word is valid, except for the first guess
    if (this.gameState.currentRow > 0 && !this.wordModel.isValidWord(guess)) {
      this.notificationView.showMessage("Not in word list!");
      return;
    }

    // Get feedback
    const feedback = this.wordModel.compareWords(
      this.wordModel.targetWord,
      guess
    );

    // Update UI
    this.boardView.updateRowWithFeedback(
      this.gameState.currentRow,
      guess,
      feedback
    );

    // Update keyboard
    for (let i = 0; i < guess.length; i++) {
      this.keyboardView.updateKeyColor(guess[i], feedback[i]);
    }

    // Check win/loss
    if (guess === this.wordModel.targetWord) {
      this.gameState.endGame(true);
      this.notificationView.showGameOver(true, this.wordModel.targetWord);
      this.keyboardView.disableKeyboard();
      return;
    }

    // Submit guess and update state
    this.gameState.submitGuess(feedback);

    // Check max attempts
    if (this.gameState.currentRow >= this.gameState.maxAttempts) {
      this.gameState.endGame(false);
      this.notificationView.showGameOver(false, this.wordModel.targetWord);
      this.keyboardView.disableKeyboard();
    }
  }

  endGame(isWin: boolean): void {
    this.gameState.endGame(isWin);
    this.notificationView.showGameOver(isWin, this.wordModel.targetWord);
    this.keyboardView.disableKeyboard();
    // InputController is disabled through keyboardView.disableKeyboard()
  }

  cleanup(): void {
    // Clean up event listeners
    this.inputController.cleanup();
  }
}
