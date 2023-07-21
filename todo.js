class IdGenerator {
  #number;

  constructor() {
    this.#number = 0;
  }

  #updateId() {
    this.#number += 1;
  }

  generate() {
    this.#updateId();
    return `task-${this.#number}`;
  }
}

class Todo {
  #id;
  #isDone;
  #description;

  constructor(id, description) {
    this.#id = id;
    this.#description = description;
    this.#isDone = false;
  }

  get id() {
    return this.#id;
  }

  get isDone() {
    return this.#isDone;
  }

  get description() {
    return this.#description;
  }

  toggleStatus() {
    this.#isDone = !this.#isDone;
  }
}

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
