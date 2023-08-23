const { readFile, writeFile } = require("fs");

const { Todo } = require("./todo.js");
const { TodoList } = require("./todo-list.js");
const { HEADERS, MIME_TYPES } = require("./constants.js");

const handlePageNotFound = (_, response) => {
  response.statusCode = 404;
  response.end();
};

const handleInvalidMethod = (_, response) => {
  response.statusCode = 405;
  response.end("Invalid Method");
};

const serveHomePage = (_, response) => {
  const path = "./index.html";

  readFile(path, (_, content) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.html);
    response.end(content);
  });
};

const serveScripts = (request, response) => {
  const path = `.${request.url}`;

  readFile(path, (_, content) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.js);
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

const updateTodos = (request, response, todoLists) => {
  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  const path = "./database/todos.json";

  writeFile(path, todoListsDetails, () => {
    response.statusCode = 201;
    response.end();
  });
};

const serverStaticPage = (request, response) => {
  const path = `.${request.url}`;

  readFile(path, (error, content) => {
    if (error) {
      return handlePageNotFound(request, response);
    }

    response.setHeader(HEADERS.contentType, MIME_TYPES.js);
    response.end(content);
  });
};

const updateTodoDatabase = (todoListsDetails) => {
  const path = "./database/todos.json";

  writeFile(path, todoListsDetails, () => {
    console.log("database updated");
  });
};

const addTodoList = (request, response, todoLists) => {
  const { listName } = JSON.parse(request.body);

  const listId = todoLists.getNumberOfTodoLists();
  const todoList = new TodoList(listName, listId);

  todoLists.addTodoList(todoList);
  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.statusCode = 201;
  response.end(JSON.stringify({ listId }));
};

const addTodo = (request, response, todoLists) => {
  const { todoDescription } = JSON.parse(request.body);

  const listId = +request.url.split("/").pop();
  const todoId = todoLists.getNumberOfTodos();
  const todo = new Todo(todoDescription, todoId);

  todoLists.addTodo(todo, listId);
  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.statusCode = 201;
  response.end(JSON.stringify({ todoId }));
};

const getIds = (url) => {
  const [, , listId, , todoId] = url.split("/");

  return {
    listId: +listId,
    todoId: +todoId,
  };
};

const deleteTodo = (request, response, todoLists) => {
  const { listId, todoId } = getIds(request.url);

  todoLists.deleteTodo(listId, todoId);

  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.statusCode = 204;
  response.end();
};

const toggleTodoStatus = (request, response, todoLists) => {
  const { listId, todoId } = getIds(request.url);

  todoLists.toggleTodoStatus(listId, todoId);

  const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
  updateTodoDatabase(todoListsDetails);

  response.statusCode = 204;
  response.end();
};

module.exports = {
  serveHomePage,
  handleInvalidMethod,
  serveScripts,
  sendTodos,
  updateTodos,
  serverStaticPage,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
};
