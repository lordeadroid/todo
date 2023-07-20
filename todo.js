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
  #groupTasks;

  constructor(todoList, tasks) {
    this.#todoList = todoList;
    this.#tasks = tasks;
    this.#sortAlphabetically = false;
    this.#groupTasks = false;
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

  #groupedTasks(tasks) {
    const completedTasks = [];
    const unCompletedTasks = [];

    tasks.forEach((task) => {
      if (task.status) completedTasks.push(task);
      else unCompletedTasks.push(task);
    });

    return unCompletedTasks.concat(completedTasks);
  }

  render() {
    this.#removeTasks();

    let tasks = [...this.#todoList];
    console.log(tasks);

    if (this.#sortStatus()) tasks = tasks.sort(alphabetically);
    console.log(tasks);

    if (this.#groupStatus()) tasks = this.#groupedTasks(tasks);
    console.log(tasks);

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

  #groupStatus() {
    return this.#groupTasks;
  }

  toggleGroupStatus() {
    this.#sortAlphabetically = !this.#groupStatus();
  }
}

class MouseController {
  #tasks;
  #taskBox;
  #saveButton;
  #sortButton;
  #groupButton;

  constructor(taskBox, saveButton, tasks, sortButton, groupButton) {
    this.#taskBox = taskBox;
    this.#saveButton = saveButton;
    this.#tasks = tasks;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
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

  onGroupSort(cb) {
    this.#groupButton.onclick = cb;
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

  #display() {
    this.#todoViewer.render();
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

  #onGroup() {
    this.#todoViewer.toggleGroupStatus();
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

    this.#inputController.onGroupSort(() => this.#onGroup());
  }
}

const main = () => {
  const tasks = document.querySelector("#tasks");
  const taskBox = document.querySelector("#task-box");
  const saveButton = document.querySelector("#save-button");
  const sortButton = document.querySelector("#sort-button");
  const groupButton = document.querySelector("#completed-tasks");

  const id = new Id();
  const todoList = new TodoList();
  const todoViewer = new TodoViewer(todoList.allTodos, tasks);

  const inputController = new MouseController(
    taskBox,
    saveButton,
    tasks,
    sortButton,
    groupButton
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
