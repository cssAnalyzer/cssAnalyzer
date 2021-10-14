const puppeteer = require("puppeteer");
const mdnCompatData = require("@mdn/browser-compat-data");
const { OK } = require("../../constants/statusCodes");

async function getCompatibility(req, res, next) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.query.inputUrl, { waitUntil: "networkidle2" });
    await page.waitForXPath("//*[@*]");

    const styleRawData = [];
    const filteredStyleData = [];
    const attrElemList = await page.$$("*");

    for (const element of attrElemList) {
      const styles = await page.evaluate((element) => {
        const styleList = element.style;

        return [...styleList].reduce((elementStyles, property) =>
          ( { ...elementStyles,
            [property]: styleList.getPropertyValue(property) } ), {} );
      }, element);

      styleRawData.push(Object.keys(styles));
      styleRawData.forEach(style => {
        if (Object.keys(style).length !== 0) {
          for (const [key, value] of Object.entries(style)) {
            if (value.endsWith("-x") || value.endsWith("-y")) {
              filteredStyleData.push(value.substr(0, (value.length - 1 - 1)));
            } else {
              filteredStyleData.push(value);
            }
          }
        }
      });
    }

    const styleData = Array.from(new Set(filteredStyleData));

    await browser.close();

    const types = [
      "chrome",
      "chrome_android",
      "edge",
      "firefox",
      "firefox_android",
      "ie",
      "opera",
      "opera_android",
      "safari",
      "safari_ios",
      "samsunginternet_android",
      "webview_android",
    ];

    const categories = {
      notAvailable: [],
      ver: [],
      elements: {},
    };
    const browsers = {};

    types.forEach(type => {
      browsers[type] = categories;
    });

    const browserDeprecated = [];

    for (let i = 0; i < styleData.length - 1; i++) {
      const style = styleData[i];
      const data = mdnCompatData.css.properties[style].__compat;

      if (data.status.deprecated) {
        browserDeprecated.push(style);
      } else {
        for (const [key, value] of Object.entries(data.support)) {
          const regEx = /^(?:[1-9]\|0)\.\d+/;
          const regEx2 = /^[^0-9]/;
          if (value) {
            const input = "ver" + (value.version_added || value[0].version_added)
              .replace(regEx, "")
              .replace(regEx2, "");
            if (!browsers[key].ver.includes(input)) {
              browsers[key].ver.push(input);
              browsers[key].elements[input] = new Array(style);
            }
            browsers[key].elements[input].push(style);
          } else {
            browsers[key].notAvailable.push(key);
          }
        }
      }
    }

    const pieData = [];

    for (const [key, value] of Object.entries(browsers)) {
      const input = {
        name: key,
        children: [],
      };

      value.ver.forEach(v => {
        const filteredVersion
          = Array.from(new Set(value.elements[v]));
        const newInput = [];

        filteredVersion.forEach(v => {
          newInput.push({
            name: v,
            value: 100,
          })
        });

        input.children.push({
          name: v,
          children: newInput,
        });
      });

      pieData.push(input);
    }

    res.status(OK).send({
      totalNum: styleData.length,
      filteredData: {
        name: "pieData",
        children: pieData,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCompatibility };
