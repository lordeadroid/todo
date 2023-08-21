const http = require("node:http");
const { readFile, writeFileSync } = require("fs");

const { route } = require("./src/router.js");
const { IdGenerator } = require("./src/id.js");
const { TodoStorage } = require("./src/todo-storage.js");

const log = (request) => {
  console.log(request.method, request.url);
  return request;
};

const setupServer = (env) => {
  const server = http.createServer((request, response) => {
    route(log(request), response, env);
  });

  const PORT = 9000;
  const TIME = new Date().toTimeString();
  server.listen(PORT, () => {
    console.log("Listening on PORT:", PORT, TIME);
  });
};

const main = () => {
  const databasePath = "./database/todos.json";
  const encoding = "utf-8";

  readFile(databasePath, encoding, (_, content = "[]") => {
    const todosList = JSON.parse(content);
    const todoStorage = new TodoStorage(todosList, databasePath, writeFileSync);
    const todoId = new IdGenerator("todo", todosList.length);
    const listId = new IdGenerator("list");

    setupServer({ todoStorage, todoId, listId });
  });
};

main();
