const { readFile, writeFile } = require("fs");

const { Todo } = require("./todo.js");
const { TodoList } = require("./todo-list.js");
const { HEADERS, MIME_TYPES } = require("./constants.js");

const handleInvalidMethod = (_, response) => {
  response.status = 405;
  response.send("Invalid Method");
};

const serveHomePage = (_, response) => {
  const path = "./index.html";

  readFile(path, (_, content) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.html);
    response.end(content);
  });
};

const sendTodos = (_, response) => {
  const path = "./database/todos.json";

  readFile(path, (_, todosListsDetails) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.json);
    response.end(todosListsDetails);
  });
};

const updateTodos = (request, response) => {
  const todoLists = request.app.todoLists;
  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  const path = "./database/todos.json";

  writeFile(path, todoListsDetails, () => {
    response.status = 201;
    response.end();
  });
};

const updateTodoDatabase = (todoListsDetails) => {
  const path = "./database/todos.json";

  writeFile(path, todoListsDetails, () => {
    console.log("database updated");
  });
};

const addTodoList = (request, response) => {
  console.log(request.body);

  const todoLists = request.app.todoLists;
  const { listName } = request.body;
  const listId = todoLists.getNumberOfTodoLists();
  const todoList = new TodoList(listName, listId);

  todoLists.addTodoList(todoList);
  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.statusCode = 201;
  response.end(JSON.stringify({ listId }));
};

const addTodo = (request, response) => {
  const todoLists = request.app.todoLists;
  const { todoDescription } = request.body;

  const listId = +request.params.listId;
  const todoId = todoLists.getNumberOfTodos();
  const todo = new Todo(todoDescription, todoId);

  todoLists.addTodo(todo, listId);
  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.status = 201;
  response.end(JSON.stringify({ todoId }));
};

const deleteTodo = (request, response) => {
  const todoLists = request.app.todoLists;
  const { listId, todoId } = request.params;
  todoLists.deleteTodo(+listId, +todoId);

  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.status = 204;
  response.end();
};

const toggleTodoStatus = (request, response) => {
  const todoLists = request.app.todoLists;
  const { listId, todoId } = request.params;
  todoLists.toggleTodoStatus(+listId, +todoId);

  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.status = 204;
  response.end();
};

module.exports = {
  serveHomePage,
  handleInvalidMethod,
  sendTodos,
  updateTodos,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
};
