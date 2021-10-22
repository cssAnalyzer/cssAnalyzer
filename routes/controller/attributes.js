const puppeteer = require("puppeteer");
const createError = require("http-errors");
const { ENTERED_URI_LOGIC_ERROR, NO_URI, INTERNAL_PUPPETEER_ERROR } = require("../../constants/messages");
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require("../../constants/statusCodes");

async function getAttributes(req, res, next) {
  try {
    if (!req.query.inputUrl) {
      next(createError(BAD_REQUEST, NO_URI));
    }
    const result = {};
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", req => {
      (req.resourceType() === "image" || req.resourceType() == "font") ? req.abort() : req.continue();
    });

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle2" });
    await page.waitForXPath("//*[@*]");

    const elements = await page.$$("*");
    const elementStyles = [];

    for (const element of elements) {
      const styles = await page.evaluate(`element => {
        const styleList = element.style;

        return [...styleList].reduce((elementStyles, property) =>
          ( { ...elementStyles,
            [property]: styleList.getPropertyValue(property) } ), {} );
      }, element`);
      elementStyles.push(styles);
    }

    // const filteredStyles = elementStyles.filter(
    //   item => Object.keys(item).length !== 0);

    // filteredStyles.forEach(attribute => {
    //   for (const [key, value] of Object.entries(attribute)) {
    //     if (!Object.keys(result).includes(key)) {
    //       result[key] = new Array();
    //     }
    //     result[key].push(value);
    //   }
    // });
    // const propertiesData = [];

    await browser.close();

    // for (const [key, value] of Object.entries(result)) {
    //   propertiesData.push({
    //     name: key,
    //     radius: value.length,
    //     props: value,
    //   });
    // }

    res.status(OK).send({
      totalNum: 50,
      filteredData: [
        {
          name: "HTML",
          radius: 1,
        },
        {
          name: "META",
          radius: 15,
        },
        {
          name: "LINK",
          radius: 6,
        },
      ],
    });
  } catch (err) {
    next(createError(INTERNAL_SERVER_ERROR, INTERNAL_PUPPETEER_ERROR));
  }
}

module.exports = { getAttributes };
