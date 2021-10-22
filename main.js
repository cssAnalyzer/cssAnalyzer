require("dotenv").config();

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./constants/statusCodes");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");

const app = express();

const main = require("./routes/api/main");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", main);

app.use(function (req, res, next) {
  next(createError(NOT_FOUND));
});

app.use(function (err, req, res, next) {
  res.status(err.status || INTERNAL_SERVER_ERROR);
  res.json(err);
});

module.exports = app;
