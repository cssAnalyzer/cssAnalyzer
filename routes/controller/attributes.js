const puppeteer = require("puppeteer");
const createError = require("http-errors");
const { ENTERED_URI_LOGIC_ERROR } = require("../../constants/messages");
const { BAD_REQUEST, OK } = require("../../constants/statusCodes");

async function getAttributes(req, res, next) {
  try {
    if (!req.query.inputUrl) {
      next(createError(BAD_REQUEST, ENTERED_URI_LOGIC_ERROR));
    }

    const result = {};
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });

    const page = await browser.newPage();

    page.on("pageerror", pageerr=> {
      next(createError(BAD_REQUEST, ENTERED_URI_LOGIC_ERROR));
    });

    await page.setRequestInterception(true);
    page.on("request", req => {
      (req.resourceType() === "image" || req.resourceType() == "font") ? req.abort() : req.continue();
    });

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle2" });
    await page.waitForXPath("//*[@*]");

    const elements = await page.$$("*");
    const elementStyles = [];

    for (const element of elements) {
      const styles = await page.evaluate((element) => {
        const styleList = element.style;

        return [...styleList].reduce((elementStyles, property) =>
          ( { ...elementStyles,
            [property]: styleList.getPropertyValue(property) } ), {} );
      }, element);
      elementStyles.push(styles);
    }

    const filteredStyles = elementStyles.filter(
      item => Object.keys(item).length !== 0);

    filteredStyles.forEach(attribute => {
      for (const [key, value] of Object.entries(attribute)) {
        if (!Object.keys(result).includes(key)) {
          result[key] = new Array();
        }
        result[key].push(value);
      }
    });

    const propertiesData = [];

    for (const [key, value] of Object.entries(result)) {
      propertiesData.push({
        name: key,
        radius: value.length,
        props: value,
      });
    }

    await browser.close();

    res.status(OK).send({
      totalNum: filteredStyles.length,
      filteredData: propertiesData,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAttributes };
