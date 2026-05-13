const { Given, When } = require('@cucumber/cucumber');

Given('I navigate to the Shiksha homepage', async function () {
    await this.page.goto('https://www.shiksha.com', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
});

When('I click Compare Now', async function () {
    const compareBtn = this.page.locator('text=/Compare [Nn]ow/').first();
    if (await compareBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await compareBtn.click({ force: true });
        await this.page.waitForTimeout(4000);
    } else {
        const backupBtn = this.page.locator('button, a').filter({ hasText: /^Compare$/i }).last();
        if (await backupBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
            await backupBtn.click({ force: true });
            await this.page.waitForTimeout(4000);
        }
    }
});
