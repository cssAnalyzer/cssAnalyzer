const OK = 200;

function getBrowser(req, res, next) {
  res.status(OK).json({ result: "ok" });
}

module.exports = { getBrowser };
