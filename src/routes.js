const { serveHomePage } = require("./handlers.js");

const METHODS = {
  get: "GET",
};

const ROUTES = [
  {
    route: "/",
    method: METHODS.get,
    handler: serveHomePage,
  },
];

module.exports = { ROUTES };
