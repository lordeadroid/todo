import createApp from "./src/app.js";
import readFile from "./src/utils/read-file.js";
import createTodoLists from "./src/models/parser.js";
import TodoLists from "./src/models/todo-lists.js";
import ServerCommandHandler from "./src/utils/process-readstream.js";

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
  const data = await readFile(path);
  const todoListsDetails = JSON.parse(data);
  const todoLists = new TodoLists();

  createTodoLists(todoListsDetails, todoLists);
  setupServer(todoLists);
};

main();
