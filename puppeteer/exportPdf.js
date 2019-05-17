const screenshot = require('puppeteer');

async function init() {
    const pupperteerConfig = {
        executablePath: './node_modules/Chromium.app/Contents/MacOS/Chromium'
    };
    const browser = await screenshot.launch(pupperteerConfig);
    const page = await browser.newPage();
    await page.goto('https://www.jianshu.com/u/40909ea33e50');
    await page.pdf({
        path: 'puppeteer/jianshu.pdf',
        format: 'A4'
    });
    browser.close();
}

init();
