const getElements = (elementsName) => {
  return elementsName.map((element) => {
    return document.getElementById(element);
  });
};

const main = () => {
  const elementsName = ["add-list-box", "add-list-button"];
  const [addListBox, addListButton] = getElements(elementsName);

  const todoView = new TodoView();
  const todoId = new IdGenerator("todo");
  const listId = new IdGenerator("list");
  const todosList = new TodosList(TodoList, listId, todoId, IdGenerator);

  const inputController = new InputController(addListBox, addListButton);

  const todoController = new TodoController(
    inputController,
    todoView,
    listId,
    todoId,
    todosList
  );

  // fetch("/todos")
  //   .then((response) => response.json())
  //   .then((todosData) => {
  //     todoView.renderAllLists(todosData);
  //   });

  todoController.start();
};

window.onload = main;
