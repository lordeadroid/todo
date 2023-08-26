const { Todo } = require('../../src/models/todo');
const { TodoList } = require('../../src/models/todo-list');
const { TodoLists } = require('../../src/models/todo-lists');

const getTodoListsWithTodo = () => {
  const listId = 0;
  const todoId = 0;
  const todoDescription = 'drink water';
  const todo = new Todo(todoDescription, todoId);
  const todoList = new TodoList('work', listId);
  const todoLists = new TodoLists();
  todoLists.addTodoList(todoList);
  todoLists.addTodo(todo, listId);

  return todoLists;
};

const getTodoLists = () => {
  const todoDescription = 'drink water';
  const listId = 0;
  const todoList = new TodoList('work', listId);
  const todoLists = new TodoLists();
  todoLists.addTodoList(todoList);

  return todoLists;
};

module.exports = { getTodoLists, getTodoListsWithTodo };
