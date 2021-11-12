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
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  res.status(200).json(user);
}

async function patchMe(req, res, next) {
  const user = await User.findByPk(req.userId);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  const updated = await user.update(req.body);
  res.status(200).json(updated);
  next();
}

async function logout(req, res) {
  await Token.destroy({
    where: {
      userId: req.userId,
    },
  });
  res.status(200).json("ok");
}

initRoutes();

module.exports = router;
