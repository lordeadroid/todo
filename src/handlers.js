const fs = require("fs");
const { HEADERS, MIME_TYPES } = require("./constants.js");
const { TodoList } = require("./todo-list.js");

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

  fs.readFile(path, (_, todosListsDetails) => {
    response.setHeader(HEADERS.contentType, MIME_TYPES.json);
    response.end(todosListsDetails);
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

const updateTodoDatabase = (todoListsDetails) => {
  const path = "./database/todos.json";

  fs.writeFile(path, todoListsDetails, () => {
    console.log("database updated");
  });
};

const addTodoList = (request, response, todoLists) => {
  let requestBody = "";

  request.on("data", (chunk) => (requestBody += chunk));

  request.on("end", () => {
    const { listName } = JSON.parse(requestBody);
    const listId = todoLists.getNumberOfTodoLists();
    const todoList = new TodoList(listName, listId);
    todoLists.addTodoList(todoList);
    const todoListsDetails = JSON.stringify(todoLists.getTodosDetails());
    updateTodoDatabase(todoListsDetails);

    response.statusCode = 201;
    response.end(JSON.stringify({ listId }));
  });
};

module.exports = {
  serveHomePage,
  handleInvalidMethod,
  serveScripts,
  sendTodos,
  updateTodos,
  serverStaticPage,
  addTodoList,
};
