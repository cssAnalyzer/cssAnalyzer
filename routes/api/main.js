const express = require("express");
const router = express.Router();
const mainController = require("../controller/main");
const attributesController = require("../controller/attributes");
const tagsController = require("../controller/tags");
const browserController = require("../controller/browser");
const colorController = require("../controller/color");

router.get("/", mainController.getMain);

router.get("/", attributesController.getAttributes);

router.get("/", tagsController.getTags);

router.get("/", browserController.getBrowser);

router.get("/", colorController.getColor);

module.exports = router;