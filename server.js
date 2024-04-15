const { createApp } = require("./src/app.js");
const { readFile } = require("./src/utils/read-file.js");
const { createTodoLists } = require("./src/models/parser.js");
const { TodoLists } = require("./src/models/todo-lists");
const { ServerCommandHandler } = require("./src/utils/process-readstream.js");

const setupServer = (todoLists) => {
  const app = createApp(todoLists);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    const time = new Date().toTimeString();
    // eslint-disable-next-line no-console
    console.log("Listening on PORT:", PORT, time);

    const serverCommandHandler = new ServerCommandHandler(PORT);
    serverCommandHandler.start();
  });
};

const main = async () => {
  const path = `${process.env.PWD}/database.json`;
  const data = (await readFile(path)) || "[]";
  const todoListsDetails = JSON.parse(data);
  const todoLists = new TodoLists();

  createTodoLists(todoListsDetails, todoLists);
  setupServer(todoLists);
};

main();
