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

const main = () => {
  const addListBox = document.getElementById("add-list-box");
  const addListButton = document.getElementById("add-list-button");

  const todoIdGenerator = new IdGenerator("todo");
  const listIdGenerator = new IdGenerator("list");

  const todoView = new TodoView();
  const todoLists = new TodoLists();

  const todoController = new TodoController(
    todoView,
    todoLists,
    listIdGenerator,
    todoIdGenerator,
    addListBox,
    addListButton
  );

  fetch("/todos")
    .then((response) => response.json())
    .then((todoListsDetails) => {
      createTodoLists(todoListsDetails, todoLists);
      todoController.start();
    });
};

window.onload = main;
