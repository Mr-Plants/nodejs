const puppeteer = require('puppeteer');

async function init() {
    const puppeteerConfig = {
        executablePath: './node_modules/Chromium.app/Contents/MacOS/Chromium'
    };
    const browser = await puppeteer.launch(puppeteerConfig);

    const browserWSEndpoint = browser.wsEndpoint();

    browser.disconnect();

    const browser2 = await puppeteer.connect({browserWSEndpoint});

    browser2.close();
}

init();

/**
 * 重新连接demo
 */
