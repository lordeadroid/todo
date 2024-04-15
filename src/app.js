import express from "express";
import logRequest from "./middlewares/logger.js";
import {
  sendTodos,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
  getListsName,
} from "./handlers/todo-handlers.js";

const createApp = (todoLists) => {
  const app = express();

  app.todoLists = todoLists;
  app.use(logRequest);
  app.use(express.json());
  app.get("/todo-lists", sendTodos);
  app.get("/lists-name", getListsName);
  app.post("/todo-lists", addTodoList);
  app.post("/todo-lists/:listId", addTodo);
  app.delete("/todo-lists/:listId/todos/:todoId", deleteTodo);
  app.patch("/todo-lists/:listId/todos/:todoId", toggleTodoStatus);
  app.use(express.static("public"));

  return app;
};

export default createApp;
