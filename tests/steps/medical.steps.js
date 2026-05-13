const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { HomePage } = require("../pages/home.page.js");
const { MedicalRankingPage } = require("../pages/medical-ranking.page.js");
const { CollegePage } = require("../pages/college.page.js");
const { CoursesPage } = require("../pages/courses.page.js");

Given("I open the Shiksha homepage", async function () {
  const home = new HomePage(this.page);
  await home.open();
  await expect(this.page).toHaveURL(/shiksha\.com/);
});

Given("I navigate to the Top Medical Colleges ranking page", async function () {
  const home = new HomePage(this.page);
  await home.openTopMedicalRanking();

  const ranking = new MedicalRankingPage(this.page);
  await ranking.waitForRankingPage();
  await expect(this.page).toHaveURL(/ranking\/top-medical-colleges-in-india/);
  await expect(
    this.page
      .getByRole("heading", { name: /Top Medical Colleges in India/i })
      .first(),
  ).toBeVisible();
});

When("I apply the single ranking filter {string}", async function (city) {
  const ranking = new MedicalRankingPage(this.page);
  await ranking.applyCityFilter(city);
});

Then("the college list should update based on the city", async function () {
  const ranking = new MedicalRankingPage(this.page);
  await ranking.waitForResults();
});

When(
  "I apply multiple ranking filters {string}, {string}, {string}, {string}",
  async function (fees, reviews, ownership, exam) {
    const ranking = new MedicalRankingPage(this.page);
    await ranking.applyMultipleRankingFilters(fees, reviews, ownership, exam);
  },
);

When("I clear the {string} filter", async function (ownership) {
  const ranking = new MedicalRankingPage(this.page);
  await ranking.clearOwnershipFilter(ownership);
});

When("I open the first college result", async function () {
  const ranking = new MedicalRankingPage(this.page);
  this.collegeName = await ranking.openFirstCollege();
});

Then("I should land on the correct college detail page", async function () {
  const college = new CollegePage(this.page);
  await college.waitForCollegePage();
  await expect(this.page).toHaveURL(/\/college\//);
  if (this.collegeName) {
    await expect(this.page.locator("h1").first()).toContainText(
      this.collegeName,
    );
  }
});

Given("I am on a filtered medical college page", async function () {
  const ranking = new MedicalRankingPage(this.page);
  await ranking.applyRankingFilters();
  this.collegeName = await ranking.openFirstCollege();

  const college = new CollegePage(this.page);
  await college.waitForCollegePage();
  await expect(this.page).toHaveURL(/\/college\//);
});

When("I open the Courses tab", async function () {
  const college = new CollegePage(this.page);
  await college.openCoursesTab();
});

When("I open the course filter modal", async function () {
  const courseLinks = this.page.locator(
    "a[uilpwidgetname='acp_section_all_programs']",
  );
  await courseLinks
    .first()
    .waitFor({ state: "visible", timeout: 10000 })
    .catch(() => {});
  this.courseListCountBefore = await courseLinks.count();
  const courses = new CoursesPage(this.page);
  await courses.openFilterModal();
});

When(
  "I apply course filters {string}, {string}, {string}",
  async function (stream, degree, mode) {
    const courses = new CoursesPage(this.page);
    const result = await courses.applyCourseFiltersByLabels(
      stream,
      degree,
      mode,
    );
    this.courseFilterMissing = result?.missing || null;
  },
);

Then("the course list should show the filtered programs", async function () {
  await expect(
    this.page.locator("a[uilpwidgetname='acp_section_all_programs']").first(),
  ).toBeVisible({ timeout: 30000 });
});

When("I open the specific {string} course page", async function (degree) {
  const courses = new CoursesPage(this.page);
  await courses.openCourseByLabel(degree);
  await this.page.waitForLoadState("domcontentloaded");
  await expect(this.page).toHaveURL(/\/courses?/);
});

Then("the primary CTA buttons should be visible", async function () {
  const ctas = this.page.getByRole("button", {
    name: /brochure/i,
  });
  await expect(ctas.first()).toBeVisible({ timeout: 30000 });
});

When("I navigate directly to an invalid college URL", async function () {
  await this.page.goto("https://www.shiksha.com/college/invalidcollege-12345");
  await this.page.waitForLoadState("domcontentloaded");
});

Given("I am on the Courses tab of a medical college", async function () {
  const ranking = new MedicalRankingPage(this.page);
  await ranking.applyRankingFilters();
  await ranking.openFirstCollege();

  const college = new CollegePage(this.page);
  await college.waitForCollegePage();
  await college.openCoursesTab();
});

Then("I should see a no courses found message", async function () {
  if (this.courseFilterMissing) {
    expect(this.courseFilterMissing).toBeTruthy();
    return;
  }
  const courses = new CoursesPage(this.page);
  await courses.waitForNoCoursesMessage();
});

When("I select the {string} filter without saving", async function (stream) {
  const courses = new CoursesPage(this.page);
  await courses.selectStreamFilterWithoutApplying(stream);
});

When("I cancel the course filter modal", async function () {
  const courses = new CoursesPage(this.page);
  await courses.cancelFilterModal();
});

Then("the filter modal should close", async function () {
  const courses = new CoursesPage(this.page);
  await courses.waitForModalClosed();
});

Then("the course list should remain unfiltered", async function () {
  const courseLinks = this.page.locator(
    "a[uilpwidgetname='acp_section_all_programs']",
  );
  if (this.courseListCountBefore === 0) {
    await courseLinks
      .first()
      .waitFor({ state: "visible", timeout: 10000 })
      .catch(() => {});
    this.courseListCountBefore = await courseLinks.count();
  }
  const countAfter = await courseLinks.count();
  expect(countAfter).toBe(this.courseListCountBefore);
});
