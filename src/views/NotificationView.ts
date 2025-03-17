export class NotificationView {
  showMessage(message: string): void {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  showGameOver(isWin: boolean, word: string): void {
    const message = isWin ? "You win!" : `Game Over! The word was: ${word}`;
    this.showMessage(message);

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const replayButton = document.createElement("button");
    replayButton.textContent = "Play Again?";
    replayButton.classList.add("replay-button");
    replayButton.addEventListener("click", () => {
      location.reload();
    });

    overlay.appendChild(replayButton);
    document.body.appendChild(overlay);
  }
}
