const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { requireToken, asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getMe));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(patchMe));
}

async function getMe(req, res) {
  const user = await User.findByPk(req.userId);
  res.status(200).json(user);
}

async function patchMe(req, res) {
  const user = await User.findByPk(req.userId);
  const updated = await user.update(req.body);
  res.status(200).json(updated);
}

async function logout(req, res) {
  await Token.destroy({
    where: {
      value: req.headers["x-access-token"],
    },
  });
  res.status(200).json({ message: "ok" });
}

initRoutes();

module.exports = router;
