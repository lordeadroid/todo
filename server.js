const { readFile } = require("fs");
const express = require("express");

const { TodoLists } = require("./src/todo-lists.js");
const { createTodoLists } = require("./src/parser.js");

const {
  sendTodos,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} = require("./src/handlers.js");

const logRequest = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};

const setupRoutes = (app) => {
  app.use(logRequest);
  app.use(express.json());
  app.get("/todo-lists", sendTodos);
  app.post("/todo-lists", addTodoList);
  app.post("/todo-lists/:listId", addTodo);
  app.delete("/todo-lists/:listId/todos/:todoId", deleteTodo);
  app.patch("/todo-lists/:listId/todos/:todoId", toggleTodoStatus);
  app.use(express.static("public"));
};

const setupServer = (todoLists) => {
  const app = express();
  app.todoLists = todoLists;
  setupRoutes(app);

  const PORT = 9000;
  app.listen(PORT, () => {
    const TIME = new Date().toTimeString();
    console.log("Listening on PORT:", PORT, TIME);
  });
};

const main = () => {
  const path = "./database/todos.json";
  const todoLists = new TodoLists();

  readFile(path, "utf-8", (_, content) => {
    const todoListsDetails = JSON.parse(content);

    createTodoLists(todoListsDetails, todoLists);
    setupServer(todoLists);
  });
};

main();
