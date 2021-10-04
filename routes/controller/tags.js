const OK = 200;

function getTags(req, res, next) {
  res.status(OK).json({ result: "ok" });
}

module.exports = { getTags };
