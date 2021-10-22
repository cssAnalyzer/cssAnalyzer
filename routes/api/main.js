const express = require("express");
const router = express.Router();
const mainController = require("../controller/main");
const attributesController = require("../controller/attributes");
const compatibilityController = require("../controller/compatibility");
const colorController = require("../controller/color");
const tagsController = require("../controller/tags");

router.get("/tags", tagsController.getTags);

router.get("/color", colorController.getColor);

router.get("/compatibility", compatibilityController.getCompatibility);

router.get("/attributes", attributesController.getAttributes);

router.get("/", mainController.getMain);

module.exports = router;
