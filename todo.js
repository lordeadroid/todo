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

  constructor(todoList, tasks) {
    this.#todoList = todoList;
    this.#tasks = tasks;
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

    const tasks = this.#todoList;
    tasks.forEach((todo) => {
      const taskElement = this.#createTaskElement(todo);
      if (todo.status) {
        taskElement.classList.add("done");
      }
      this.#renderTask(taskElement);
    });
  }
}

class MouseController {
  #taskBox;
  #saveButton;

  constructor(taskBox, saveButton) {
    this.#taskBox = taskBox;
    this.#saveButton = saveButton;
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
}

class TodoController {
  #inputController;
  #id;

  constructor(inputController, id) {
    this.#inputController = inputController;
    this.#id = id;
  }

  #onNewTask(taskDescription) {
    const todo = new Todo(this.#id.number, taskDescription);
    todoList.add(todo);
    const todoViewer = new TodoViewer(todoList.allTodos, tasks);
    todoViewer.render();
  }

  start() {
    this.#inputController.onSaveButton(this.#onNewTask);
  }
}

const main = () => {
  const tasks = document.querySelector("#tasks");
  const taskBox = document.querySelector("#task-box");
  const saveButton = document.querySelector("#save-button");

  const id = new Id();

  const inputController = new MouseController(taskBox, saveButton);
  const todoController = new TodoController(inputController, id);
  todoController.start();
};

window.onload = main;
