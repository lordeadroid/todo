const express = require('express');

const {
  sendTodos,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} = require('./handlers/handlers');

const logRequest = (req, _, next) => {
  console.log(req.method, req.path);
  next();
};

const createApp = () => {
  const app = express();

  app.use(logRequest);
  app.use(express.json());
  app.get('/todo-lists', sendTodos);
  app.post('/todo-lists', addTodoList);
  app.post('/todo-lists/:listId', addTodo);
  app.delete('/todo-lists/:listId/todos/:todoId', deleteTodo);
  app.patch('/todo-lists/:listId/todos/:todoId', toggleTodoStatus);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
