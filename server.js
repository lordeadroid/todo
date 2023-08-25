const { readFile } = require('fs');
const { TodoLists } = require('./src/models/todo-lists');
const { createTodoLists } = require('./src/models/parser.js');
const { createApp } = require('./src/app.js');

const setupServer = (todoLists) => {
  const app = createApp(todoLists);

  const PORT = 9000;
  app.listen(PORT, () => {
    const time = new Date().toTimeString();
    console.log('Listening on PORT:', PORT, time);
  });
};

const main = () => {
  const path = './database/todos.json';
  const todoLists = new TodoLists();

  readFile(path, 'utf-8', (_, content) => {
    const todoListsDetails = JSON.parse(content);

    createTodoLists(todoListsDetails, todoLists);
    setupServer(todoLists);
  });
};

main();
