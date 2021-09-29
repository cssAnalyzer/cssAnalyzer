const express = require("express");
const router = express.Router();
const mainController = require("../controller/main");

router.get("/", mainController.getMain);

router.post("/", mainController.postMain);

module.exports = router;