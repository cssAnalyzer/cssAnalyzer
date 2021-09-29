const express = require("express");
const router = express.Router();
const attributesController = require("../controller/attributes");

router.get("/", attributesController.getAttributes);

router.post("/", attributesController.postAttributes);

module.exports = router;