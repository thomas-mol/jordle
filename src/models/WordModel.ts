import _ from "lodash";

export class WordModel {
  wordList: string[];
  targetWord: string;

  constructor(wordList: string[]) {
    this.wordList = wordList;
    this.targetWord = this.selectRandomWord();
  }

  selectRandomWord(): string {
    return this.wordList[_.random(0, this.wordList.length - 1)];
  }

  isValidWord(word: string): boolean {
    return this.wordList.includes(word);
  }

  compareWords(target: string, guess: string): string[] {
    const feedback: string[] = Array(target.length).fill("wrong");
    const targetLetters = target.split("");

    for (let i = 0; i < target.length; i++) {
      if (guess[i] === targetLetters[i]) {
        feedback[i] = "correct";
        targetLetters[i] = "_";
      }
    }
    for (let i = 0; i < target.length; i++) {
      if (feedback[i] !== "correct") {
        const index = targetLetters.indexOf(guess[i]);
        if (index !== -1) {
          feedback[i] = "almost";
          targetLetters[index] = "_";
        }
      }
    }
    return feedback;
  }
}
