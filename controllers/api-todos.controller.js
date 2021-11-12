const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { requireToken, asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getToDos));
  router.get("/:id", asyncHandler(requireToken), asyncHandler(getToDoById));
  router.post("/", asyncHandler(requireToken), asyncHandler(createToDo));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(patchToDo));
  router.delete("/", asyncHandler(requireToken), asyncHandler(deleteToDos));
  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteToDoById)
  );
}

async function deleteToDoById(req, res) {
  const todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });
  if (!todo) {
    throw new ErrorResponse("todo not found", 404);
  }
  await todo.destroy();
  res.status(204).send("ok");
}

async function deleteToDos(req, res) {
  await ToDo.destroy({
    where: {
      userId: req.userId,
    },
  });
  res.status(204).json("ok");
}

async function patchToDo(req, res) {
  const todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });
  if (!todo) {
    throw new ErrorResponse("todo not found", 404);
  }
  const updated = await todo.update(req.body);
  return res.status(200).json(updated);
}

async function createToDo(req, res, next) {
  const todo = await ToDo.create({
    ...req.body,
    userId: req.userId,
  });
  return res.status(201).json({ todo });
}

async function getToDos(req, res, next) {
  const todos = await ToDo.findAll({
    where: {
      userId: req.userId,
    },
  });
  if (!todos) {
    throw new ErrorResponse("No todos found", 404);
  }
  res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
  const todo = await ToDo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
  });
  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }
  res.status(200).json(todo);
}

initRoutes();

module.exports = router;
