class MedicalRankingPage {
  constructor(page) {
    this.page = page;
  }

  async waitForRankingPage() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async applyRankingFilters() {
    const applyRankingFilter = async (selector) => {
      const filterCheckbox = this.page.locator(selector).first();
      await filterCheckbox.waitFor({ state: "visible", timeout: 30000 });
      await Promise.all([
        this.page.waitForLoadState("domcontentloaded"),
        filterCheckbox.check(),
      ]);
    };

    await applyRankingFilter("#chck-city-278");
    await applyRankingFilter("#chck-fees-f5");
    await applyRankingFilter("#chck-review-r4");
    await applyRankingFilter("#chck-college_ownership-private");
    await applyRankingFilter("#chck-exam-13600");
  }

  async applyCityFilter(city) {
    const selector = this.getCitySelector(city);
    await this.applyRankingFilter(selector);
  }

  async applyMultipleRankingFilters(fees, reviews, ownership, exam) {
    await this.applyRankingFilter(this.getFeesSelector(fees));
    await this.applyReviewFilter(reviews);
    await this.applyRankingFilter(this.getOwnershipSelector(ownership));
    await this.applyRankingFilter(this.getExamSelector(exam));
  }

  async applyHighlyRestrictiveFilters(fees, reviews) {
    await this.applyRankingFilter(this.getFeesSelector(fees));
    await this.applyReviewFilter(reviews);
  }

  async clearOwnershipFilter(ownership) {
    const selector = this.getOwnershipSelector(ownership);
    const filterCheckbox = this.page.locator(selector).first();
    await filterCheckbox.waitFor({ state: "visible", timeout: 30000 });
    if (await filterCheckbox.isChecked()) {
      await Promise.all([
        this.page.waitForLoadState("domcontentloaded"),
        filterCheckbox.uncheck(),
      ]);
    }
  }

  async waitForResults() {
    const firstResultLink = this.page
      .locator(".tuple-inst-info")
      .first()
      .locator(":scope > a");
    await firstResultLink.waitFor({ state: "visible", timeout: 30000 });
  }

  async waitForNoResultsMessage() {
    const emptyState = this.page.locator(
      "text=/no colleges found|no results|0 results/i",
    );
    await emptyState.first().waitFor({ state: "visible", timeout: 30000 });
  }

  async applyRankingFilter(selectorOrLocator) {
    const filterCheckbox =
      typeof selectorOrLocator === "string"
        ? this.page.locator(selectorOrLocator).first()
        : selectorOrLocator.first
          ? selectorOrLocator.first()
          : selectorOrLocator;
    await filterCheckbox.waitFor({ state: "visible", timeout: 30000 });
    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      filterCheckbox.check(),
    ]);
  }

  async applyReviewFilter(reviews) {
    const normalized = String(reviews).toLowerCase();
    if (normalized === "r4") {
      await this.applyRankingFilter("#chck-review-r4");
      return;
    }

    if (normalized === "r5") {
      const byId = this.page.locator("#chck-review-r5").first();
      if ((await byId.count()) > 0) {
        await this.applyRankingFilter(byId);
        return;
      }

      const byLabel = this.page
        .getByLabel(/5\s*-?\s*5?\s*Star|5\s*Star/i)
        .first();
      if ((await byLabel.count()) > 0) {
        await this.applyRankingFilter(byLabel);
        return;
      }
    }

    await this.applyRankingFilter(this.getReviewSelector(reviews));
  }

  getCitySelector(city) {
    if (/bangalore/i.test(city)) {
      return "#chck-city-278";
    }
    throw new Error(`Unsupported city filter: ${city}`);
  }

  getFeesSelector(fees) {
    const normalized = String(fees).toLowerCase();
    if (normalized === "f5") {
      return "#chck-fees-f5";
    }
    if (normalized === "f1") {
      return "#chck-fees-f1";
    }
    throw new Error(`Unsupported fees filter: ${fees}`);
  }

  getReviewSelector(reviews) {
    const normalized = String(reviews).toLowerCase();
    if (normalized === "r4") {
      return "#chck-review-r4";
    }
    if (normalized === "r5") {
      return "#chck-review-r5";
    }
    throw new Error(`Unsupported reviews filter: ${reviews}`);
  }

  getOwnershipSelector(ownership) {
    if (/private/i.test(ownership)) {
      return "#chck-college_ownership-private";
    }
    throw new Error(`Unsupported ownership filter: ${ownership}`);
  }

  getExamSelector(exam) {
    if (/neet/i.test(exam)) {
      return "#chck-exam-13600";
    }
    throw new Error(`Unsupported exam filter: ${exam}`);
  }

  async openFirstCollege() {
    const firstResultLink = this.page
      .locator(".tuple-inst-info")
      .first()
      .locator(":scope > a");
    await firstResultLink.waitFor({ state: "visible", timeout: 30000 });
    const rawCollegeName = (await firstResultLink.textContent())?.trim();
    const collegeName = rawCollegeName?.replace(/^\d+\.?\s*/, "");
    await firstResultLink.click();
    return collegeName;
  }
}

module.exports = { MedicalRankingPage };
