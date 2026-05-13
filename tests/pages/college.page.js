class CollegePage {
  constructor(page) {
    this.page = page;
  }

  async waitForCollegePage() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openCoursesTab() {
    const tabBar = this.page.locator("ul.dc8420.c541ba").first();
    const coursesTab = tabBar
      .locator("li.e81df3")
      .filter({ hasText: "Courses" })
      .locator("a")
      .first();
    await coursesTab.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}

module.exports = { CollegePage };
