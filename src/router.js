const { ROUTES } = require("./routes.js");

const getHandler = (request) => {
  return (
    ROUTES.find(({ route, method }) => {
      const regExp = new RegExp(route);
      return regExp.test(request.url) && method === request.method;
    }) || { handler: handleInvalidMethod }
  );
};

const route = (request, response) => {
  const { handler } = getHandler(request);
  handler(request, response);
};

module.exports = { route };
