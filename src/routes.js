const {
  serveHomePage,
  serveScripts,
  sendTodos,
  addTodos,
} = require("./handlers.js");

const METHODS = {
  get: "GET",
  post: "POST",
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
    route: "^/todos$",
    method: METHODS.get,
    handler: sendTodos,
  },
  {
    route: "^/todos/add$",
    method: METHODS.post,
    handler: addTodos,
  },
  {
    route: "/favicon.ico",
    method: METHODS.get,
    handler: () => {},
  },
];

module.exports = { ROUTES };
