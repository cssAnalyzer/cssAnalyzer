const { OK } = require("../../constants/statusCodes");

function getMain(req, res, next) {
  try {
    res.status(OK).json({ result: "ok" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMain };
