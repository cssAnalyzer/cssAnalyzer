const express = require("express");
const router = express.Router();
const mainController = require("../controller/main");
const attributesController = require("../controller/attributes");
const tagsController = require("../controller/tags");
const compatibilityController = require("../controller/compatibility");
const colorController = require("../controller/color");

router.get("/", mainController.getMain);

router.get("/attributes", attributesController.getAttributes);

router.get("/tags", tagsController.getTags);

router.get("/compatibility", compatibilityController.getCompatibility);

router.get("/color", colorController.getColor);

module.exports = router;