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

  todoController.start();
};

window.onload = main;
