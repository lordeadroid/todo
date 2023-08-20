const { readFile } = require("fs");

const { HEADERS, MIME_TYPES } = require("./constants.js");

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

  readFile(path, "utf-8", (error, content) => {
    if (error) {
      console.log(error);
    }

    response.setHeader(HEADERS.contentType, MIME_TYPES.json);
    response.end(JSON.stringify(content));
  });
};

module.exports = {
  serveHomePage,
  handleInvalidMethod,
  serveScripts,
  sendTodos,
};
