const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler } = require("../middlewares/middlewares");
var { nanoid } = require("nanoid");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  const login = await User.findOne({
    where: {
      login: req.body.login,
    },
  });
  if (login) {
    throw new ErrorResponse("Login is already in use", 400);
  }
  const email = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (email) {
    throw new ErrorResponse("Email is already in use", 400);
  }
  const user = await User.create(req.body);
  return res.status(201).json({
    user,
  });
}

async function login(req, res) {
  const user = await User.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });
  if (!user) {
    throw new ErrorResponse("Wrong data", 400);
  }
  const token = await Token.create({
    userId: user.id,
    value: nanoid(),
  });
  return res.status(201).json({
    accessToken: token.value,
    user,
  });
}

initRoutes();

module.exports = router;
