const alphabetically = (firstTask, secondTask) => {
  return (
    firstTask.description[0].charCodeAt() -
    secondTask.description[0].charCodeAt()
  );
};

class Id {
  #number;

  constructor() {
    this.#number = 0;
  }

  get number() {
    this.#number += 1;
    return `task-${this.#number}`;
  }
}

class Todo {
  #id;
  #isDone;
  #description;

  constructor(id, description) {
    this.#id = id;
    this.#isDone = false;
    this.#description = description;
  }

  get id() {
    return this.#id;
  }

  get status() {
    return this.#isDone;
  }

  get description() {
    return this.#description;
  }

  toggleStatus() {
    this.#isDone = !this.status;
  }
}

class TodoList {
  #todos;

  constructor() {
    this.#todos = [];
  }

  add(todo) {
    this.#todos.push(todo);
  }

  get allTodos() {
    return this.#todos;
  }
}

class TodoViewer {
  #todoList;
  #tasks;
  #sortAlphabetically;

  constructor(todoList, tasks) {
    this.#todoList = todoList;
    this.#tasks = tasks;
    this.#sortAlphabetically = false;
  }

  #removeTasks() {
    while (this.#tasks.hasChildNodes()) {
      this.#tasks.removeChild(this.#tasks.firstChild);
    }
  }

  #createTaskElement(todo) {
    const taskElement = document.createElement("li");
    taskElement.innerText = todo.description;
    taskElement.setAttribute("id", todo.id);
    return taskElement;
  }

  #renderTask(taskElement) {
    this.#tasks.appendChild(taskElement);
  }

  render() {
    this.#removeTasks();
    let tasks = [...this.#todoList];

    if (this.#sortStatus()) tasks = [...this.#todoList].sort(alphabetically);
    tasks.forEach((todo) => {
      const taskElement = this.#createTaskElement(todo);
      if (todo.status) {
        taskElement.classList.add("done");
      }
      this.#renderTask(taskElement);
    });
  }

  #sortStatus() {
    return this.#sortAlphabetically;
  }

  toggleSort() {
    this.#sortAlphabetically = !this.#sortStatus();
  }
}

class MouseController {
  #tasks;
  #taskBox;
  #saveButton;
  #sortButton;

  constructor(taskBox, saveButton, tasks, sortButton) {
    this.#taskBox = taskBox;
    this.#saveButton = saveButton;
    this.#tasks = tasks;
    this.#sortButton = sortButton;
  }

  #readTask() {
    const taskDescription = this.#taskBox.value;
    this.#taskBox.value = "";
    return taskDescription;
  }

  onSaveButton(cb) {
    this.#saveButton.onclick = () => {
      const taskDescription = this.#readTask();
      cb(taskDescription);
    };
  }

  onTasksClick(cb) {
    this.#tasks.onclick = (event) => {
      const elementId = event.target.id;
      cb(elementId);
    };
  }

  onSortButton(cb) {
    this.#sortButton.onclick = cb;
  }
}

class TodoController {
  #inputController;
  #id;
  #todoList;
  #todoViewer;

  constructor(inputController, id, todoList, todoViewer) {
    this.#inputController = inputController;
    this.#id = id;
    this.#todoList = todoList;
    this.#todoViewer = todoViewer;
  }

  #onNewTask(taskDescription) {
    const todo = new Todo(this.#id.number, taskDescription);
    this.#todoList.add(todo);
    this.#display();
  }

  #onTasksClick(elementId) {
    this.#todoList.allTodos.forEach((todo) => {
      if (todo.id === elementId) {
        todo.toggleStatus();
      }
    });
    this.#display();
  }

  #onSort() {
    this.#todoViewer.toggleSort();
    this.#display();
  }

  start() {
    this.#inputController.onSaveButton((taskDescription) =>
      this.#onNewTask(taskDescription)
    );

    this.#inputController.onTasksClick((elementId) =>
      this.#onTasksClick(elementId)
    );

    this.#inputController.onSortButton(() => this.#onSort());
  }

  #display() {
    this.#todoViewer.render();
  }
}

const main = () => {
  const tasks = document.querySelector("#tasks");
  const taskBox = document.querySelector("#task-box");
  const saveButton = document.querySelector("#save-button");
  const sortButton = document.querySelector("#sort-button");

  const id = new Id();
  const todoList = new TodoList();
  const todoViewer = new TodoViewer(todoList.allTodos, tasks);

  const inputController = new MouseController(
    taskBox,
    saveButton,
    tasks,
    sortButton
  );

  const todoController = new TodoController(
    inputController,
    id,
    todoList,
    todoViewer
  );
  todoController.start();
};

window.onload = main;
