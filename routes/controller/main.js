const OK = 200;

function getMain(req, res, next) {
  //
}

function postMain(req, res, next) {
  res.status(OK).json({ result: "ok" });
}

module.exports = { getMain, postMain };
