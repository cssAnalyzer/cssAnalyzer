const puppeteer = require("puppeteer");

const { OK } = require("../../constants/statusCodes");

async function getAttributes(req, res, next) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle2" });
    await page.waitForXPath("//*[@*]");

    const elements = await page.$$("*");
    const elementStyles = [];

    for (const element of elements) {
      const style = await page.evaluate((e) => {
        const computedStyle = window.getComputedStyle(e);

        return [...computedStyle].reduce((elementStyles, property) =>
          ( { ...elementStyles,
            [property]: computedStyle.getPropertyValue(property) } ), {} );
      }, element);
      elementStyles.push(style);
    }
    console.log(elementStyles);

    res.status(OK).send({ data: "OK" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAttributes };
