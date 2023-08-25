/* eslint-disable no-unused-vars */

const createTodo = ({ id, description, isDone }) => {
  const todo = new Todo(description, id);

  if (isDone) todo.toggleStatus();
  return todo;
};

const createTodoList = ({ listName, listId, todos: todosDetails }) => {
  const todoList = new TodoList(listName, listId);

  todosDetails.forEach((todoDetails) => {
    const todo = createTodo(todoDetails);
    todoList.addTodo(todo);
  });

  return todoList;
};

const createTodoLists = (todoListsDetails, todoLists) => {
  todoListsDetails.forEach((todoListDetails) => {
    const todoList = createTodoList(todoListDetails);
    todoLists.addTodoList(todoList);
  });
};
