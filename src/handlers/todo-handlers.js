const { writeFile } = require("fs");
const { Todo } = require("../models/todo.js");
const { TodoList } = require("../models/todo-list.js");

const sendTodos = (req, res) => {
  const todoListsDetails = req.app.todoLists.getTodosDetails();
  res.json(todoListsDetails);
};

const updateTodoDatabase = (todoListsDetails) => {
  const todoData = JSON.stringify(todoListsDetails);
  const path = `${process.env.PWD}/database.json`;

  writeFile(path, todoData, () => {
    // eslint-disable-next-line no-console
    console.log("Database Updated");
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
