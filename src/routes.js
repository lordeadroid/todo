const {
  serveHomePage,
  serveScripts,
  sendTodos,
  updateTodos,
  serverStaticPage,
  addTodoList,
  addTodo,
} = require("./handlers.js");

const METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
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
