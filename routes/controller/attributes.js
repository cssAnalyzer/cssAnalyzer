const OK = 200;

function getAttributes(req, res, next) {
  res.status(OK).json({ result: "ok" });
}

module.exports = { getAttributes };