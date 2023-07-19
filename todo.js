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

  constructor(todoList) {
    this.#todoList = todoList;
  }

  get render() {
    this.#removeTasks();

    const tasks = this.#todoList.allTodos;
    tasks.forEach((todo) => {
      const taskElement = this.#createTaskElement(todo);
      this.#renderTask(taskElement);
    });
  }

  #removeTasks() {
    const tasks = document.querySelector("#tasks");

    while (tasks.hasChildNodes()) {
      tasks.removeChild(tasks.firstChild);
    }
  }

  #createTaskElement(todo) {
    const taskElement = document.createElement("li");
    taskElement.innerText = todo.description;
    taskElement.setAttribute("id", `task-${todo.id}`);
    return taskElement;
  }

  #renderTask(taskElement) {
    const page = document.querySelector("#tasks");
    page.appendChild(taskElement);
  }
}

const readTask = (taskBox) => {
  const task = taskBox.value;
  taskBox.value = "";
  return task;
};

class GenerateId {
  #idNumber;

  constructor() {
    this.#idNumber = 0;
  }

  get number() {
    this.#idNumber += 1;
    return this.#idNumber;
  }
}

const main = () => {
  const taskBox = document.querySelector("#task-box");
  const saveButton = document.querySelector("#save-button");
  const todoList = new TodoList();
  const generateId = new GenerateId();

  saveButton.onclick = () => {
    const task = readTask(taskBox);
    const todo = new Todo(generateId.number, task);
    todoList.add(todo);

    const todoViewer = new TodoViewer(todoList);
    todoViewer.render;
  };
};

window.onload = main;
