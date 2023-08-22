const {
  serveHomePage,
  serveScripts,
  sendTodos,
  updateTodos,
  serverStaticPage,
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
    route: "^/todos$",
    method: METHODS.post,
    handler: updateTodos,
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
