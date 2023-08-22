const main = () => {
  const addListBox = document.getElementById("add-list-box");
  const addListButton = document.getElementById("add-list-button");
  const todoListContainer = document.getElementById("todo-list");

  const todoIdGenerator = new IdGenerator("todo");
  const todoView = new TodoView(addListBox, addListButton, todoListContainer);
  const todoLists = new TodoLists();

  const todoController = new TodoController(
    todoView,
    todoLists,
    todoIdGenerator
  );

  fetch("/todos")
    .then((response) => response.json())
    .then((todoListsDetails) => {
      createTodoLists(todoListsDetails, todoLists);
      todoController.start();
    });
};

window.onload = main;
