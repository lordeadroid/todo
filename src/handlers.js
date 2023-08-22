const fs = require("fs");

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

  fs.readFile(path, (_, content) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.html);
    response.end(content);
  });
};

const serveScripts = (request, response) => {
  const path = `.${request.url}`;

  fs.readFile(path, (_, content) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.js);
    response.end(content);
  });
};

const sendTodos = (_, response) => {
  const path = "./database/todos.json";

  fs.readFile(path, (_, todosDetails) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.json);
    response.end(todosDetails);
  });
};

const updateTodos = (request, response) => {
  let todoListsDetails = "";

  request.on("data", (chunk) => (todoListsDetails += chunk));

  request.on("end", () => {
    const path = "./database/todos.json";

    fs.writeFile(path, todoListsDetails, () => {
      response.statusCode = 201;
      response.end();
    });
  });
};

const serverStaticPage = (request, response) => {
  const path = `.${request.url}`;

  fs.readFile(path, (error, content) => {
    if (error) {
      return handlePageNotFound(request, response);
    }

    response.setHeader(HEADERS.contentType, MIME_TYPES.js);
    response.end(content);
  });
};

module.exports = {
  serveHomePage,
  handleInvalidMethod,
  serveScripts,
  sendTodos,
  updateTodos,
  serverStaticPage,
};
