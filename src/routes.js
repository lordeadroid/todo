const { serveHomePage, serveScripts, sendTodos } = require("./handlers.js");

const METHODS = {
  get: "GET",
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
    route: "/favicon.ico",
    method: METHODS.get,
    handler: () => {},
  },
];

module.exports = { ROUTES };
