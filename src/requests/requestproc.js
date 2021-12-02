const puppeteer = require('puppeteer');
const constants = require('../util/constants');
const parser = require('../util/parser');

const request = async function (url) {
    //const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        args: ['--no-sandbox',  '--disable-dev-shm-usage'],
      });
    
    var pageContent;

    try {
        const page = await browser.newPage();
        await page.goto(url);

        pageContent = await page.evaluate(parser.parsePageContent, { target: url, targets: constants.targets, types: constants.types });
    } catch (ex) {
        console.error("inner", ex.message);
    } finally {
        await browser.close();
    }
    
    return pageContent;
}

module.exports = {
    request: request
};
