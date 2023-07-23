const getElements = (elementsName) => {
  return elementsName.map((element) => document.getElementById(element));
};

const main = () => {
  const elementsName = [
    "task-box",
    "save-button",
    "sort-button",
    "complete-button",
    "add-title-button",
    "add-title",
  ];

  const [
    taskBox,
    submitButton,
    sortButton,
    completeButton,
    titleButton,
    titleBox,
  ] = getElements(elementsName);

  const id = new IdGenerator();
  const todoList = new TodoList();
  const todoView = new TodoView();

  const inputController = new MouseController(
    taskBox,
    submitButton,
    sortButton,
    completeButton,
    titleButton,
    titleBox
  );

  const todoController = new TodoController(
    inputController,
    id,
    todoList,
    todoView
  );
  todoController.start();
};

window.onload = main;
