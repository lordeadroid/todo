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

const sendTodos = (_, response, env) => {
  const todos = env.todoStorage.getTodos();

  response.setHeader(HEADERS.contentType, MIME_TYPES.json);
  response.end(JSON.stringify(todos));
};

const createList = (listName, env) => {
  const listId = env.listId.generate();
  const todos = [];

  return { listName, listId, todos };
};

const addTodos = (request, response, env) => {
  let listName = "";

  request.on("data", (data) => {
    listName += data;
  });

  request.on("end", () => {
    const list = createList(listName, env);
    env.todoStorage.addTodos(list);
    const todos = env.todoStorage.getTodos();

    response.statusCode = 201;
    response.setHeader(HEADERS.contentType, MIME_TYPES.json);
    response.end(JSON.stringify(todos));
  });
};

module.exports = {
  serveHomePage,
  handleInvalidMethod,
  serveScripts,
  sendTodos,
  addTodos,
};
