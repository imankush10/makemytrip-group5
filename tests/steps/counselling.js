const { chromium } = require('@playwright/test')
const { expect }   = require('@playwright/test')
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber')

const { CounsellingPage } = require('../pages/counsellingpage.js')
const data                = require('../fixtures/counselling_data.json')

setDefaultTimeout(60000)

let browser, context, page, counsellingPg

// ── Hooks ─────────────────────────────────────────────────────────────────────

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false })
    context = await browser.newContext()
    page    = await context.newPage()
})

AfterAll(async () => {
    await browser.close()
})

// ── Given ─────────────────────────────────────────────────────────────────────

Given('launch shiksha home page for counselling', async () => {
    counsellingPg = new CounsellingPage(page, expect)
    await counsellingPg.launch(data.url)
})

// ── When ──────────────────────────────────────────────────────────────────────

When('click on counselling tab', async () => {
    await counsellingPg.clickCounsellingTab()
})

When('open careers after 12th section', async () => {
    await counsellingPg.clickCareersAfter12th()
})

When('click on science link', async () => {
    await counsellingPg.clickScienceLink()
})

When('select max allowed choices', async () => {
    await counsellingPg.selectMaxAllowedChoices()
})

When('click continue', async () => {
    await counsellingPg.clickContinue()
})

When('go back to choices', async () => {
    await page.goBack()
})

When('close the selection popup', async () => {
    await counsellingPg.closePopup()
})

When('click continue again', async () => {
    await counsellingPg.clickContinue()
})

// ── Then ──────────────────────────────────────────────────────────────────────

Then('stream heading should contain {string}', async (text) => {
    await counsellingPg.verifyStreamHeading(text)
})

Then('remaining choices should be disabled', async () => {
    await counsellingPg.verifyRemainingChoicesDisabled()
})

Then('selected choices should appear in selection list', async () => {
    await counsellingPg.verifySelectedChoicesInList()
})

Then('careers found count should be valid', async () => {
    await counsellingPg.verifyCareersFoundCount(data.careersFoundPrefix)
})
Then('take a screenshot couns {string}', async (filename) => {
    await counsellingPg.takeScreenshot(filename)
})