const main = () => {
  const addListBox = document.getElementById("add-list-box");
  const addListButton = document.getElementById("add-list-button");
  const todoListContainer = document.getElementById("todo-list");
  const showAddList = document.querySelector(".show-add-list");

  const todoView = new TodoView(
    addListBox,
    addListButton,
    todoListContainer,
    showAddList
  );
  const todoLists = new TodoLists();
  const todoAdmin = new TodoAdmin(todoLists);
  const todoController = new TodoController(todoView, todoAdmin);

  const init = (todoListsDetails) => {
    createTodoLists(todoListsDetails, todoLists);
    todoController.start();
  };

  todoAdmin.getAllTodos(init);
};

window.onload = main;
