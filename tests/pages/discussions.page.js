class DiscussionsPage {
  constructor(page) {
    this.page = page;
  }

  async waitForPage() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openAskDialog() {
    const askButton = this.page.locator(
      "a[ga-page='gnb'][ga-attr='GNB_OPEN_STATE'][ga-optlabel='ASK_GNB']",
    );
    await askButton.waitFor({ state: "visible", timeout: 30000 });
    await askButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");
  }

  async postQuestion(text) {
    await this.openAskDialog();
    const questionInput = this.page.getByPlaceholder("Type Your Question");
    await questionInput.waitFor({ state: "visible", timeout: 30000 });
    await questionInput.fill(text);

    const nextButton = this.page.locator("#nextButtonPosting");
    await nextButton.waitFor({ state: "visible", timeout: 30000 });
    await nextButton.scrollIntoViewIfNeeded();
    await nextButton.click({ force: true });
    if (!text || text.trim() === "") {
      return;
    }
    await nextButton.waitFor({ state: "hidden", timeout: 30000 });

    const postButton = this.page.locator("#finalButtonPosting");
    await postButton.waitFor({ state: "visible", timeout: 30000 });
    await postButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}

module.exports = { DiscussionsPage };
