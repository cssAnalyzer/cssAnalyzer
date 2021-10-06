const express = require("express");
const router = express.Router();
const mainController = require("../controller/main");
const attributesController = require("../controller/attributes");
const tagsController = require("../controller/tags");
const browserController = require("../controller/browser");
const colorController = require("../controller/color");

router.get("/", mainController.getMain);

router.get("/attributes", attributesController.getAttributes);

router.get("/tags", tagsController.getTags);

router.get("/browser", browserController.getBrowser);

router.get("/color", colorController.getColor);

module.exports = router;