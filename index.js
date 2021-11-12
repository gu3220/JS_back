const express = require("express");
const http = require("http");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/middlewares");
const { initDB } = require("./dataBase");

const apiTodosRouter = require("./controllers/api-todos.controller");
const apiUsersRouter = require("./controllers/api-users.controller");
const apiAuthRouter = require("./controllers/api-auth.controller");

const app = express();

initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.origialUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("InSecure = ", req.secure);
  console.log("BODY", req.body);
  console.log("QUERY", req.query);

  next();
});

app.use("/api/todos", apiTodosRouter);
app.use("/api/users", apiUsersRouter);
app.use("/api/auth", apiAuthRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3000, () => {
  console.log("Server is working on port 3000");
});
