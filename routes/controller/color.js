const puppeteer = require("puppeteer");

const { OK } = require("../../constants/statusCodes");

async function getColor(req, res, next) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle2" });
    const colors = await page.evaluate(() => {
      const color = new Set();
      document.body.querySelectorAll("*").forEach(n => {
        color.add(window.getComputedStyle(n).color);
        color.add(window.getComputedStyle(n).backgroundColor);
      });

      return Array.from(color);
    });

    await browser.close();

    res.status(OK).send({
      totalNum: colors.length,
      filteredData: colors,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getColor };
