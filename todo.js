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

const readTask = (taskBox) => {
  const task = taskBox.value;
  taskBox.value = "";
  return task;
};

const main = () => {
  const taskBox = document.querySelector("#task-box");
  const saveButton = document.querySelector("#save-button");
  const todoList = new TodoList();

  const id = 0;

  saveButton.onclick = () => {
    const task = readTask(taskBox);
    const todo = new Todo(id, task);
    todoList.add(todo);
  };
};

window.onload = main;
