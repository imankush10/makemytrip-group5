class HomePage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("https://www.shiksha.com/");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async hoverNavIndex(index) {
    await this.page.locator(".g_lev1").nth(index).hover();
  }

  async openTopMedicalRanking() {
    await this.hoverNavIndex(2);
    const medicalLink = this.page.locator(
      "a[href='/medicine-health-sciences/ranking/top-medical-colleges-in-india/100-2-0-0-0']",
    );
    await medicalLink
      .filter({ hasText: "Top Medical Colleges in India" })
      .first()
      .waitFor({ state: "visible", timeout: 30000 });
    await medicalLink.first().click();
  }

  async openDiscussions() {
    await this.hoverNavIndex(6);
    const discussionsLink = this.page
      .getByRole("link", { name: "Discussions" })
      .first();
    await discussionsLink.waitFor({ state: "visible", timeout: 30000 });
    await discussionsLink.click();
  }
}

module.exports = { HomePage };
