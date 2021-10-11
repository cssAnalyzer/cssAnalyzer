/* eslint-disable quotes */
const puppeteer = require("puppeteer");

const { OK } = require("../../constants/statusCodes");

async function findMdnLink(req, res, next) {
  try {
    if (req.query.search === "contents") {
      return next();
    } else if (req.query.search === "mdnUrl") {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(`https://developer.mozilla.org/ko/search?q=${req.query.keyword}`, { waitUntil: "networkidle2" });
      await page.waitForXPath("/html/body/div/div[1]/div/main/div[3]/ul/li[1]/h3/a");

      const hrefLinks = await page.$x("/html/body/div/div[1]/div/main/div[3]/ul/li[1]/h3/a");
      const link = await page.evaluate(element => element.href, ...hrefLinks);

      await browser.close();

      return res.status(OK).send({
        link,
      });
    } else {
      next(new Error);
    }
  } catch (err) {
    next(err);
  }
}

exports.findMdnLink = findMdnLink;
