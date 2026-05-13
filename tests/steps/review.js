const { chromium } = require('@playwright/test')
const { expect }   = require('@playwright/test')
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber')

const { ReviewPage } = require('../pages/reviewpage.js')
const data           = require('../fixtures/review_data.json')

setDefaultTimeout(60000)

let browser, context, page, reviewPg


BeforeAll(async () => {
    browser = await chromium.launch({ headless: false })
    context = await browser.newContext()
    page    = await context.newPage()
})

AfterAll(async () => {
    await browser.close()
})


Given('launch shiksha home page for review', async () => {
    reviewPg = new ReviewPage(page, expect)
    await page.goto(data.url)
})


When('click on write review link', async () => {
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        reviewPg.writeReviewLink.click()
    ])
    await newPage.waitForLoadState()
    reviewPg.initNewPage(newPage)
})

When('fill email', async () => {
    await reviewPg.fillEmail(data.email)
})

When('fill full name', async () => {
    await reviewPg.fillFullName(data.fullName)
})

When('select gender', async () => {
    await reviewPg.selectGender(data.gender)
})

When('fill college name and select first suggestion', async () => {
    await reviewPg.fillCollegeAndSelectFirst(data.collegeName)
})

When('select location', async () => {
    await reviewPg.selectLocation()
})

When('fill course and select first option', async () => {
    await reviewPg.fillCourseAndSelectFirst(data.courseInput)
})

When('select graduation year', async () => {
    await reviewPg.selectGraduationYear(data.graduationYear)
})

When('fill upi', async () => {
    await reviewPg.fillUpi(data.upi)
})

When('uncheck terms and conditions', async () => {
    await reviewPg.uncheckTnc()
})

When('fill invalid mobile number', async () => {
    await reviewPg.fillMobileNumber(data.invalidMobile)
})

When('fill valid mobile number', async () => {
    await reviewPg.fillMobileNumber(data.validMobile)
})

When('click next', async () => {
    await reviewPg.clickNext()
})

When('fill review in section {string}', async (sectionIndex) => {
    await reviewPg.fillReviewSection(sectionIndex, data.review)
})

When('select 5 star rating in section {string}', async (sectionIndex) => {
    await reviewPg.selectStarRating(sectionIndex)
})

When('select 5 star rating for both inputs in section {string}', async (sectionIndex) => {
    await reviewPg.selectBothStarRatingsInSection(sectionIndex)
})

When('fill short comment in section {string}', async (sectionIndex) => {
    await reviewPg.fillShortComment(sectionIndex, data.shortComment)
})

When('fill fee amount in section {string}', async (sectionIndex) => {
    await reviewPg.fillFeeAmount(sectionIndex, data.feeAmount)
})

When('check yes for recommendation in section {string}', async (sectionIndex) => {
    await reviewPg.checkYesRecommendation(sectionIndex)
})

When('fill additional comments in section {string}', async (sectionIndex) => {
    await reviewPg.fillAdditionalComments(sectionIndex, data.additionalComment)
})

When('click submit', async () => {
    await reviewPg.clickSubmit()
})


Then('error message should contain phone number limit warning', async () => {
    await reviewPg.verifyPhoneErrorMessage(data.expectedPhoneError)
})

Then('take screenshot {string}', async (filename) => {
    await reviewPg.takeScreenshot(filename)
})