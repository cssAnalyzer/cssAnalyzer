const puppeteer = require("puppeteer");

const { OK } = require("../../constants/statusCodes");

async function getTags(req, res, next) {
  try {
    const result = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle2" });
    await page.waitForXPath("//*[@*]");

    const nodeList = await page.$x("//*[@*]");
    const tags = await page.evaluate((...nodeList) => {
      return nodeList.map(elem => elem.tagName);
    }, ...nodeList);

    tags.forEach(element => {
      if (!Object.keys(result).includes(element)) {
        result[element] = 1;
      } else {
        result[element] += 1;
      }
    });

    await browser.close();

    res.status(OK).send({ data: result });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTags };
