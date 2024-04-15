import Todo from "../../src/models/todo.js";
import TodoList from "../../src/models/todo-list.js";
import TodoLists from "../../src/models/todo-lists.js";

const getTodoListsWithTodo = () => {
  const listId = 0;
  const todoId = 0;
  const todoDescription = "drink water";
  const todo = new Todo(todoDescription, todoId);
  const todoList = new TodoList("work", listId);
  const todoLists = new TodoLists();
  todoLists.addTodoList(todoList);
  todoLists.addTodo(todo, listId);

  return todoLists;
};

const getTodoLists = () => {
  const listId = 0;
  const todoList = new TodoList("work", listId);
  const todoLists = new TodoLists();
  todoLists.addTodoList(todoList);

  return todoLists;
};

export { getTodoLists, getTodoListsWithTodo };
