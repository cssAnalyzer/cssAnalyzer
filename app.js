require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");

const app = express();

const main = require("./routes/api/main");
const attributes = require("./routes/api/attributes");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", main);
app.use("/attributes", attributes);

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
