const OK = 200;

function getColor(req, res, next) {
  res.status(OK).json({ result: "ok" });
}

module.exports = { getColor };
