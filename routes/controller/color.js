const puppeteer = require("puppeteer");
const getColors = require("get-image-colors");
const createError = require("http-errors");
const { ENTERED_URI_LOGIC_ERROR } = require("../../constants/messages");
const { BAD_REQUEST, OK } = require("../../constants/statusCodes");

async function getColor(req, res, next) {
  try {
    const colorOptions = {
      count: 10,
      type: "image/png",
    }

    if (!req.query.inputUrl) {
      next(createError(BAD_REQUEST, ENTERED_URI_LOGIC_ERROR));
    }

    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();

    page.on("pageerror", pageerr=> {
      next(createError(BAD_REQUEST, ENTERED_URI_LOGIC_ERROR));
    });

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle0" });
    const screenshot = await page.screenshot({ encoding: "base64" });
    const buffer = Buffer.from(screenshot, "base64");
    await browser.close();

    const colors = await getColors(buffer, colorOptions);

    res.status(OK).send({
      totalNum: 10,
      filteredData: colors,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getColor };
