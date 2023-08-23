const http = require("node:http");

const { route } = require("./src/router.js");
const { readFile } = require("fs");
const { createTodoLists } = require("./src/parser.js");
const { TodoLists } = require("./src/todo-lists.js");

const log = (request) => {
  console.log(request.method, request.url);
  return request;
};

const readRequestBody = (request, routeHandler) => {
  let body = "";
  request.on("data", (chunk) => (body += chunk));
  request.on("end", () => {
    request.body = body;
    routeHandler();
  });
};

const setupServer = (todoLists) => {
  const server = http.createServer((request, response) => {
    log(request);
    readRequestBody(request, () => {
      route(request, response, todoLists);
    });
  });

  const PORT = 9000;
  const TIME = new Date().toTimeString();
  server.listen(PORT, () => {
    console.log("Listening on PORT:", PORT, TIME);
  });
};

const main = () => {
  const path = "./database/todos.json";
  const encoding = "utf-8";

  const todoLists = new TodoLists();

  readFile(path, encoding, (_, content) => {
    const todoListsDetails = JSON.parse(content);

    createTodoLists(todoListsDetails, todoLists);
    setupServer(todoLists);
  });
};

main();
