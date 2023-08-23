const main = () => {
  const addListBox = document.getElementById("add-list-box");
  const addListButton = document.getElementById("add-list-button");
  const todoListContainer = document.getElementById("todo-list");

  const todoView = new TodoView(addListBox, addListButton, todoListContainer);
  const todoLists = new TodoLists();
  const todoController = new TodoController(todoView, todoLists);

  fetch("/todo-lists")
    .then((res) => res.json())
    .then((todoListsDetails) => {
      createTodoLists(todoListsDetails, todoLists);
      todoController.start();
    });
};

window.onload = main;
