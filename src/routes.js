const {
  serveHomePage,
  serveScripts,
  sendTodos,
  updateTodos,
  serverStaticPage,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
} = require("./handlers.js");

const METHODS = {
  get: "GET",
  put: "PUT",
  post: "POST",
  patch: "PATCH",
  delete: "DELETE",
};

const ROUTES = [
  {
    route: "^/$",
    method: METHODS.get,
    handler: serveHomePage,
  },
  {
    route: "^/scripts/",
    method: METHODS.get,
    handler: serveScripts,
  },
  {
    route: "^/todo-lists$",
    method: METHODS.get,
    handler: sendTodos,
  },
  {
    route: "^/todo-lists$",
    method: METHODS.post,
    handler: addTodoList,
  },
  {
    route: "^/todo-lists$",
    method: METHODS.put,
    handler: updateTodos,
  },
  {
    route: "^/todo-lists/\\d+$",
    method: METHODS.post,
    handler: addTodo,
  },
  {
    route: "^/todo-lists/\\d+/todos/\\d+$",
    method: METHODS.delete,
    handler: deleteTodo,
  },
  {
    route: "^/todo-lists/\\d+/todos/\\d+$",
    method: METHODS.patch,
    handler: toggleTodoStatus,
  },
  {
    route: "/favicon.ico",
    method: METHODS.get,
    handler: () => {},
  },
  {
    route: ".*",
    method: METHODS.get,
    handler: serverStaticPage,
  },
];

module.exports = { ROUTES };
