const puppeteer = require("puppeteer");
const createError = require("http-errors");
const { ENTERED_URI_LOGIC_ERROR } = require("../../constants/messages");
const { BAD_REQUEST, OK } = require("../../constants/statusCodes");

async function getTags(req, res, next) {
  try {
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

    const nodeList = await page.$x("//*[@*]");
    const organizedTagInfo = await page.evaluate((...nodeList) => {
      const result = {};

      nodeList.forEach(elem => {
        if (!Object.keys(result).includes(elem.tagName)) {
          result[elem.tagName] = 1;
        } else {
          result[elem.tagName] += 1;
        }
      });

      return result;
    }, ...nodeList);

    const tagData = [];

    Object.keys(organizedTagInfo).forEach(tag => {
      tagData.push({
        name: tag,
        radius: organizedTagInfo[tag],
      });
    });

    await browser.close();

    res.status(OK).send({
      totalNum: nodeList.length,
      filteredData: tagData,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTags };
