import { GameController } from "./controllers/GameController";

document.addEventListener("DOMContentLoaded", async () => {
  async function loadWordList(): Promise<string[]> {
    const response = await fetch("src/data/woorden.txt");
    const text = await response.text();
    return text
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length === 6);
  }

  const wordList = await loadWordList();

  if (wordList.length === 0) {
    throw new Error("Wordlist is empty!");
  }

  new GameController(wordList);
});
