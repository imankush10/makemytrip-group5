class JeePredictorPage {
  constructor(page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto('https://www.shiksha.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await this.page.waitForTimeout(5000);
  }

  async clickEngineeringTab() {
    await this.page.locator('//a[contains(text(),"Engineering") or contains(text(),"ENGINEERING")]').first().hover();
    await this.page.waitForTimeout(2000);
    await this.page.locator('//a[contains(text(),"Engineering") or contains(text(),"ENGINEERING")]').first().click();
    await this.page.waitForTimeout(2000);
  }

  async hoverCollegePredictors() {

    await this.page.locator('text=Engineering').first().hover();

    await this.page.waitForTimeout(3000);

    const predictor = this.page.locator('text=College Predictors').last();

    await predictor.scrollIntoViewIfNeeded();

    await predictor.hover({
        force: true
    });

    await this.page.waitForTimeout(2000);
}
// In predictor.js - Replace both methods with these:

async hoverCollegePredictors() {
  // Step 1: Hover Engineering tab to open mega menu
  const engineeringTab = this.page.locator('a').filter({ hasText: /^Engineering$/ }).first();
  await engineeringTab.waitFor({ state: 'visible', timeout: 15000 });
  await engineeringTab.hover();
  await this.page.waitForTimeout(1500);
}



async clickJeeMainPredictor() {

    await this.page.goto(
        'https://www.shiksha.com/engineering/jee-main-college-predictor',
        {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        }
    );

    await this.page.waitForTimeout(5000);
}


  async enterRank(rank) {
     await this.page.waitForTimeout(2000);
     const rankInput = this.page.locator('//input[@placeholder="Rank"]').first();
    await rankInput.waitFor({ state: 'visible', timeout: 15000 });
     await rankInput.clear();
    await rankInput.fill(String(rank));
    await this.page.waitForTimeout(1000);
   }


  async selectGender(gender) {
    await this.page.locator(`//input[@type="radio"]/following-sibling::*[contains(text(),"${gender}")] | //label[contains(text(),"${gender}")]`).first().click();
    await this.page.waitForTimeout(1000);
  }

  async selectCategory(category) {
    const categoryDropdown = this.page.locator('//select[contains(@name,"category")] | //select[option[contains(text(),"General")]]').first();
    await categoryDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await categoryDropdown.selectOption({ label: category });
    await this.page.waitForTimeout(1000);
  }

  async selectDomicileState(state) {
    const stateDropdown = this.page.locator('//select[contains(@name,"state")] | //select[option[contains(text(),"Choose Domicile State")]]').first();
    await stateDropdown.waitFor({ state: 'visible', timeout: 15000 });
    await stateDropdown.selectOption({ label: state });
    await this.page.waitForTimeout(1000);
  }

  async clickPredictResults() {
    await this.page.locator('//button[contains(text(),"Predict Results")]').first().waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('//button[contains(text(),"Predict Results")]').first().click();
    await this.page.waitForTimeout(4000);
  }

  async applyFilter(filterText) {
    const filterLocator = this.page.locator(
      `//label[contains(text(),"${filterText}")] | //span[contains(text(),"${filterText}")]`
    ).first();
    await filterLocator.waitFor({ state: 'visible', timeout: 15000 });
    await filterLocator.scrollIntoViewIfNeeded();
    await filterLocator.click();
    await this.page.waitForTimeout(3000);
    console.log(`✅ Applied filter: ${filterText}`);
  }

  async clickShortlistFirstCollege() {
    const shortlistBtn = this.page.locator(
      '//button[contains(text(),"Shortlist")] | //a[contains(text(),"Shortlist")]'
    ).first();
    await shortlistBtn.waitFor({ state: 'visible', timeout: 15000 });
    await shortlistBtn.scrollIntoViewIfNeeded();
    await shortlistBtn.click();
    await this.page.waitForTimeout(3000);
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = `screenshots/${name}_${timestamp}.png`;
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`📸 Screenshot saved: ${filePath}`);
    return filePath;
  }
}

module.exports = { JeePredictorPage };