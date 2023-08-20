const getElements = (elementsName) => {
  return elementsName.map((element) => {
    return document.getElementById(element);
  });
};

const main = () => {
  const elementsName = ["add-list-box", "add-list-button", "todo-tist"];
  const [addListBox, addListButton, todoListContainer] =
    getElements(elementsName);

  const todoId = new IdGenerator("todo");
  const listId = new IdGenerator("list");
  const todoList = new TodoList();
  const todoView = new TodoView();

  const inputController = new InputController(addListButton);

  const todoController = new TodoController(
    inputController,
    todoId,
    listId,
    todoList,
    todoView
  );

  todoController.start();
};

window.onload = main;
