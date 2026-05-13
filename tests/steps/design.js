const { chromium, expect, firefox }  = require('@playwright/test')
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber')

const { Design } = require('../pages/designpage.js')
const testData = require('../fixtures/design_data.json')

setDefaultTimeout(60000)

let browser, context, page, designPg


BeforeAll(async () => {
    browser = await chromium.launch({headless : false})
    context = await browser.newContext()
    page    = await context.newPage()
})

AfterAll(async () => {
    await browser.close()
})


Given('launch shiksha home page', async () => {
    designPg = new Design(page, expect)
    await designPg.launch(testData.url)
})


When('click on design tab', async () => {
    await designPg.clickDesignTab()
})

When('open popular specializations', async () => {
    await designPg.clickPopularSpecializations()
})

When('click on game design', async () => {
    await designPg.clickGameDesignLink()
})

When('scroll and click programs in trending widget', async () => {
    await designPg.scrollAndClickTrendingPrograms(testData.scrollWaitMs)
})

When('click trending widget dropdown', async () => {
    await designPg.clickTrendingDropdown()
})

When('select UG from dropdown', async () => {
    await designPg.selectUGFromDropdown()
})

When('click next page in trending widget', async () => {
    await designPg.clickTrendingNextPage()
})

When('click view all exams button', async () => {
    await designPg.clickViewAllExams()
})

When('close the exam popup', async () => {
    await designPg.closeExamPopup()
})

When('click on all comments link', async () => {
    await designPg.clickAllComments()
})

When('navigate back', async () => {
    await page.goBack()
})

When('open exams section', async () => {
    await designPg.clickExamsSection()
})

When('click all design exams link', async () => {
    await designPg.clickAllDesignExamsLink()
})

When('click last pagination button', async () => {
    await designPg.clickLastPaginationButton()
})

When('navigate back twice', async () => {
    await page.goBack()
    await page.goBack()
})


Then('page heading should contain {string}', async (expectedText) => {
    await designPg.verifyHeadingContains(expectedText)
})

Then('last percentage value should be {string}', async (expectedValue) => {
    await designPg.verifyLastPercentageIs(expectedValue)
})

Then('exam popup second last entry should contain {string}', async (examName) => {
    await designPg.verifyExamPopupSecondLastContains(examName)
})

Then('at least one popular course should have rating above {string}', async (minRatingStr) => {
    await designPg.verifyAtLeastOneRatingAbove(parseFloat(minRatingStr))
})

Then('last exam on page should contain {string}', async (examName) => {
    await designPg.verifyLastExamContains(examName)
})

Then('take a screenshot desg {string}', async (filename) => {
    await designPg.takeScreenshot(filename)
})