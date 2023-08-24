const { writeFile } = require('fs');
const { Todo } = require('./todo.js');
const { TodoList } = require('./todo-list.js');

const sendTodos = (_, res) => {
  const path = 'database/todos.json';
  res.sendFile(`${process.env.PWD}/${path}`);
};

const updateTodoDatabase = (todoListsDetails) => {
  const todoData = JSON.stringify(todoListsDetails);
  const path = './database/todos.json';

  writeFile(path, todoData, () => {
    console.log('database updated');
  });
};

const addTodoList = (req, res) => {
  const todoLists = req.app.todoLists;
  const { listName } = req.body;
  const listId = todoLists.getNumberOfTodoLists();
  const todoList = new TodoList(listName, listId);

  todoLists.addTodoList(todoList);
  updateTodoDatabase(todoLists.getTodosDetails());

  res.status(201).json({ listId });
};

const addTodo = (req, res) => {
  const todoLists = req.app.todoLists;
  const { todoDescription } = req.body;

  const listId = +req.params.listId;
  const todoId = todoLists.getNumberOfTodos();
  const todo = new Todo(todoDescription, todoId);

  todoLists.addTodo(todo, listId);
  updateTodoDatabase(todoLists.getTodosDetails());

  res.status(201).json({ todoId });
};

const deleteTodo = (req, res) => {
  const todoLists = req.app.todoLists;
  const { listId, todoId } = req.params;
  todoLists.deleteTodo(+listId, +todoId);
  updateTodoDatabase(todoLists.getTodosDetails());

  res.status(204).end();
};

const toggleTodoStatus = (req, res) => {
  const todoLists = req.app.todoLists;
  const { listId, todoId } = req.params;
  todoLists.toggleTodoStatus(+listId, +todoId);
  updateTodoDatabase(todoLists.getTodosDetails());

  res.status(204).end();
};

module.exports = {
  sendTodos,
  addTodoList,
  addTodo,
  deleteTodo,
  toggleTodoStatus,
};
