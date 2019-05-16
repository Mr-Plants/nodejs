const screenshot = require('puppeteer');

async function init() {
    const pupperteerConfig = {
        executablePath: './Chromium.app/Contents/MacOS/Chromium',
        // headless: false
    };
    const browser = await screenshot.launch(pupperteerConfig);
    const page = await browser.newPage();
    await page.goto('https://www.jianshu.com/u/40909ea33e50');
    await page.screenshot({
        path: 'puppeteer/jianshu.png',
        type: 'png',
        fullPage: true
    });
    browser.close();
}

init();
