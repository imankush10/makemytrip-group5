class QuestionPage {
  constructor(page) {
    this.page = page;
  }

  async followQuestion() {
    const followButton = this.page.locator("button.e2d88c").first();
    await followButton.waitFor({ state: "visible", timeout: 30000 });
    await followButton.click();
  }

  async openAnswerDialog() {
    const answerButton = this.page.locator("button.a4db75").first();
    await answerButton.waitFor({ state: "visible", timeout: 30000 });
    await answerButton.click();
  }

  async refresh() {
    await this.page.reload();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async isAnswerVisible(text) {
    return this.page
      .getByText(text)
      .first()
      .isVisible()
      .catch(() => false);
  }

  async openMoreOptions() {
    const moreOptionsButton = this.page.locator("button.a80819");
    await moreOptionsButton.waitFor({ state: "visible", timeout: 30000 });
    await moreOptionsButton.click();
  }

  async deleteQuestion() {
    const deleteAction = this.page.locator(".b5d6fb").nth(2);
    await deleteAction.waitFor({ state: "visible", timeout: 30000 });
    await deleteAction.click();

    const confirmModal = this.page.locator(".dialog-popup__modal").last();
    await confirmModal.waitFor({ state: "visible", timeout: 30000 });

    const confirmYes = confirmModal.locator("button.e3dd15").first();
    await confirmYes.waitFor({ state: "visible", timeout: 30000 });
    await confirmYes.click();

    await this.page.waitForLoadState("domcontentloaded");
  }

  async openDeleteConfirmationModal() {
    const deleteAction = this.page.locator(".b5d6fb").nth(2);
    await deleteAction.waitFor({ state: "visible", timeout: 30000 });
    await deleteAction.click();

    const confirmModal = this.page.locator(".dialog-popup__modal").last();
    await confirmModal.waitFor({ state: "visible", timeout: 30000 });
    return confirmModal;
  }

  async cancelDeleteConfirmation() {
    const confirmModal = this.page.locator(".dialog-popup__modal").last();
    await confirmModal.waitFor({ state: "visible", timeout: 30000 });

    const cancelButton = confirmModal
      .getByRole("button", { name: /cancel|no|close/i })
      .first();

    if ((await cancelButton.count()) > 0) {
      await cancelButton.click();
      return;
    }

    const closeButton = confirmModal
      .locator(
        ".close,.cross,.close-icon,.ico-close,button[aria-label='Close']",
      )
      .first();
    await closeButton.waitFor({ state: "visible", timeout: 30000 });
    await closeButton.click();
  }

  async isNotFoundError() {
    const notFoundMessage = this.page.locator("p.title.noMrg");
    return notFoundMessage
      .filter({ hasText: "Page not found." })
      .first()
      .isVisible()
      .catch(() => false);
  }

  async waitForNotFoundMessage() {
    const notFoundMessage = this.page
      .locator("p.title.noMrg")
      .filter({ hasText: "Page not found." })
      .first();
    await notFoundMessage.waitFor({ state: "visible", timeout: 30000 });
  }
}

module.exports = { QuestionPage };
