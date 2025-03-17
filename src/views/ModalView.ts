export class ModalView {
  private modal: HTMLDialogElement;
  private openButton: HTMLElement | null;
  private closeButton: HTMLElement | null;

  constructor(modalId: string, openButtonId: string, closeButtonId: string) {
    this.modal = document.getElementById(modalId) as HTMLDialogElement;
    this.openButton = document.getElementById(openButtonId);
    this.closeButton = document.getElementById(closeButtonId);

    if (this.modal) {
      this.setupEventListeners();
    } else {
      console.error(`Modal with ID "${modalId}" not found`);
    }
  }

  private setupEventListeners(): void {
    if (this.openButton) {
      this.openButton.addEventListener("click", () => {
        this.showModal();
      });
    }

    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => {
        this.hideModal();
      });
    }
  }

  showModal(): void {
    this.modal.showModal();
  }

  hideModal(): void {
    this.modal.close();
  }
}
