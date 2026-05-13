const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { HomePage } = require("../pages/home.page.js");
const { DiscussionsPage } = require("../pages/discussions.page.js");
const { QuestionPage } = require("../pages/question.page.js");
const { AnswerModal } = require("../pages/answer-modal.page.js");

const captureBug = async (world, name, description) => {
  const buffer = await world.page.screenshot({ fullPage: true });
  const screenshotsDir = path.resolve(process.cwd(), "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const safeName = String(name || "bug")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .slice(0, 60);
  const fileName = `${safeName}-${Date.now()}.png`;
  fs.writeFileSync(path.join(screenshotsDir, fileName), buffer);

  await world.attach(buffer, "image/png");
  await world.attach(`BUG: ${description}`, "text/plain");
};

Given("I am logged in", async function () {
  // Auth is handled via storageState.json in hooks.
});

Given("I am on the Discussions page", async function () {
  const home = new HomePage(this.page);
  await home.open();
  await expect(this.page).toHaveURL(/shiksha\.com/);

  await home.openDiscussions();
  const discussions = new DiscussionsPage(this.page);
  await discussions.waitForPage();
  await expect(this.page).toHaveURL(/discussions|ask/);
});

When("I post a question {string}", async function (text) {
  this.questionText = text;
  const discussions = new DiscussionsPage(this.page);
  await discussions.postQuestion(text);
});

Then("I should see the question text", async function () {
  await expect(this.page.getByText(this.questionText).first()).toBeVisible({
    timeout: 30000,
  });
});

When(
  "I follow the question and post an answer {string}",
  async function (text) {
    this.answerText = text;

    const question = new QuestionPage(this.page);
    await question.followQuestion();
    await question.openAnswerDialog();

    const answerModal = new AnswerModal(this.page);
    await answerModal.waitForOpen();
    await answerModal.fillAnswer(text);
    await answerModal.postAnswer();
  },
);

Then("I refresh and record if the answer is missing", async function () {
  const question = new QuestionPage(this.page);
  await question.refresh();

  const answerVisible = await question.isAnswerVisible(this.answerText);
  if (!answerVisible) {
    await captureBug(
      this,
      "answer-not-visible",
      "Answer does not appear after refresh on the question page.",
    );
  }
  expect.soft(answerVisible, "Answer not visible after refresh").toBeTruthy();
});

When("I delete the question", async function () {
  await this.page.waitForTimeout(3000);
  const question = new QuestionPage(this.page);
  await question.openMoreOptions();
  await question.deleteQuestion();
});

When("I open the Ask dialog", async function () {
  const discussions = new DiscussionsPage(this.page);
  await discussions.openAskDialog();
});

When("I navigate back to the Discussions page", async function () {
  const home = new HomePage(this.page);
  await home.open();
  await home.openDiscussions();

  const discussions = new DiscussionsPage(this.page);
  await discussions.waitForPage();
  await expect(this.page).toHaveURL(/discussions|ask/);
});

When("I post the same question again", async function () {
  const discussions = new DiscussionsPage(this.page);
  await discussions.waitForPage();
  await discussions.postQuestion(this.questionText);
});

When("I save the current question URL", async function () {
  await this.page.waitForLoadState("domcontentloaded");
  await this.page.waitForURL(
    (url) => url.hostname.includes("shiksha.com") && url.pathname !== "/",
    { timeout: 30000 },
  );
  this.savedQuestionUrl = this.page.url();
});

When("I navigate directly to the saved question URL", async function () {
  await this.page.goto(this.savedQuestionUrl);
  await this.page.waitForLoadState("domcontentloaded");
});

When("I open the delete confirmation modal", async function () {
  const question = new QuestionPage(this.page);
  await question.openMoreOptions();
  await question.openDeleteConfirmationModal();
});

When("I cancel the deletion", async function () {
  const question = new QuestionPage(this.page);
  await question.cancelDeleteConfirmation();
  await this.page
    .locator(".dialog-popup__modal")
    .last()
    .waitFor({ state: "hidden", timeout: 30000 });
});

When("I navigate to an invalid discussion URL", async function () {
  await this.page.goto("https://ask.shiksha.com/invalid-question-qna-99999999");
  await this.page.waitForLoadState("domcontentloaded");
});

Then("I record a bug if the page is not found", async function () {
  await this.page.waitForTimeout(3000);

  const question = new QuestionPage(this.page);
  const errorVisible = await question.isNotFoundError();
  if (errorVisible || /not-found|error/i.test(this.page.url())) {
    await captureBug(
      this,
      "repost-error",
      "Reposting the same question after deletion navigates to an error page.",
    );
  }
  expect
    .soft(
      !errorVisible && !/not-found|error/i.test(this.page.url()),
      "Repost navigated to error page",
    )
    .toBeTruthy();
});

Then("I should see the question required error", async function () {
  const error = this.page.locator("#qstn-input_error");
  await expect(error).toBeVisible();
  await expect(error).toHaveText("Please enter the Question.");
});

Then("I should see the page not found message", async function () {
  const primary = this.page
    .locator("p.title.noMrg")
    .filter({ hasText: "Page not found." })
    .first();
  if ((await primary.count()) > 0) {
    await expect(primary).toBeVisible({ timeout: 30000 });
    return;
  }

  const fallback = this.page.getByText(/page not found/i).first();
  await expect(fallback).toBeVisible({ timeout: 30000 });
});

Then(
  "the more options button should not be present on the page",
  async function () {
    const moreOptions = this.page.locator("button.a80819");
    const count = await moreOptions.count();
    if (count > 0) {
      await expect(moreOptions).toBeHidden();
      return;
    }
    await expect(moreOptions).toHaveCount(0);
  },
);

Then("I should see the answer required error", async function () {
  const error = this.page.locator(".shiksha-text-editor-err");
  await expect(error).toBeVisible();
  await expect(error).toHaveText("Please enter some content!");
});
