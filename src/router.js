const { ROUTES } = require("./routes.js");
const { handleInvalidMethod } = require("./handlers.js");

const getHandler = (request) => {
  return (
    ROUTES.find(({ route, method }) => {
      const regExp = new RegExp(route);
      return regExp.test(request.url) && method === request.method;
    }) || { handler: handleInvalidMethod }
  );
};

const route = (request, response, env) => {
  const { handler } = getHandler(request);
  handler(request, response, env);
};

module.exports = { route };
