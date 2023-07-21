const getElements = (elementsName) => {
  return elementsName.map((element) => document.getElementById(element));
};

const main = () => {
  const elementsName = [
    "task-box",
    "save-button",
    "sort-button",
    "complete-button",
  ];

  const [taskBox, submitButton, sortButton, completeButton] =
    getElements(elementsName);

  const id = new IdGenerator();
  const todoList = new TodoList();
  const todoView = new TodoView();

  const inputController = new MouseController(
    taskBox,
    submitButton,
    sortButton,
    completeButton
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
