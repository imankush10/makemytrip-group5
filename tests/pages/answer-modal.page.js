class AnswerModal {
  constructor(page) {
    this.page = page;
    this.modal = page
      .locator(".dialog-popup__modal")
      .filter({ hasText: "Write your answer" })
      .first();
  }

  async waitForOpen() {
    await this.modal.waitFor({ state: "visible", timeout: 30000 });
  }

  async fillAnswer(text) {
    const answerFrame = this.page.frameLocator(
      "#shiksha-editor--ana-posting_ifr",
    );
    await answerFrame
      .locator("body")
      .waitFor({ state: "visible", timeout: 30000 });
    await answerFrame.locator("body").click();

    await this.page.waitForFunction(() => Boolean(window.tinymce));
    await this.page.evaluate((value) => {
      const editor = window.tinymce?.get("shiksha-editor--ana-posting");
      if (editor) {
        editor.setContent(`<p>${value}</p>`);
        editor.fire("change");
      }
    }, text);
  }

  async postAnswer() {
    const answerPostButton = this.modal.getByRole("button", { name: "Post" });
    await answerPostButton.waitFor({ state: "attached", timeout: 30000 });
    await answerPostButton.scrollIntoViewIfNeeded();
    await answerPostButton.click({ force: true });
    await this.page.waitForLoadState("domcontentloaded");
  }
}

module.exports = { AnswerModal };
