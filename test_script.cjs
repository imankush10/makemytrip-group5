const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.shiksha.com', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    
    const moreTab = page.locator('li').filter({ hasText: /^More$/ }).first();
    const count = await moreTab.count();
    console.log('Found more:', count);
    if (count > 0) {
        await moreTab.hover();
        await page.waitForTimeout(2000);
        
        const text = await page.evaluate(() => document.body.innerText);
        console.log('Found scholarship exam text:', text.includes('All Scholarship Exams'));
        
        if (text.includes('All Scholarship Exams')) {
            const el = page.locator('a').filter({ hasText: /All Scholarship Exams/i }).first();
            await el.click();
            await page.waitForLoadState('networkidle').catch(()=>{});
            console.log('Clicked and navigated to:', page.url());
        }
    } else {
        // trying generic text
        const anyMore = page.locator('text="More"').first();
        console.log('Found any more text:', await anyMore.count());
    }
    
    await browser.close();
})();
