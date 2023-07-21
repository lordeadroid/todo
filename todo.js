class TodoId {
  #number;

  constructor() {
    this.#number = 0;
  }

  get value() {
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
    this.#description = description;
    this.#isDone = false;
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
    this.#isDone = !this.#isDone;
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
    return [...this.#todos];
  }

  get sortedTodos() {
    const todos = this.allTodos;

    return todos.sort((firstTodo, secondTodo) => {
      return firstTodo.description > secondTodo.description ? 1 : -1;
    });
  }

  get completedTodos() {
    const todos = this.allTodos;
    const completedTodos = [];
    const unCompletedTodos = [];

    todos.forEach((todo) => {
      if (todo.status) completedTodos.push(todo);
      else unCompletedTodos.push(todo);
    });

    return unCompletedTodos.concat(completedTodos);
  }
}

class TodoView {
  #tasksElements;

  constructor(tasksElements) {
    this.#tasksElements = tasksElements;
  }

  #removeTodos() {
    while (this.#tasksElements.hasChildNodes()) {
      this.#tasksElements.removeChild(this.#tasksElements.firstChild);
    }
  }

  #createElement(todo) {
    const todoElement = document.createElement("li");
    todoElement.id = todo.id;
    todoElement.innerText = todo.description;
    return todoElement;
  }

  #renderTodo(element) {
    this.#tasksElements.appendChild(element);
  }

  render(todos) {
    this.#removeTodos();

    todos.forEach((todo) => {
      const todoElement = this.#createElement(todo);
      if (todo.status) {
        todoElement.classList.add("done");
      }
      this.#renderTodo(todoElement);
    });
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

  #readTodo() {
    const taskDescription = this.#taskBox.value;
    this.#taskBox.value = "";
    return taskDescription;
  }

  onSaveButton(createNewTodo) {
    this.#saveButton.onclick = () => {
      const todoDescription = this.#readTodo();
      createNewTodo(todoDescription);
    };
  }

  onTodoClick(markTodo) {
    this.#tasks.onclick = (event) => {
      const elementId = event.target.id;
      markTodo(elementId);
    };
  }

  onSortButtonClick(toggleSortAlpgabetically) {
    this.#sortButton.onclick = toggleSortAlpgabetically;
  }

  onGroupSort(toggleGroupSort) {
    this.#groupButton.onclick = toggleGroupSort;
  }
}

class TodoController {
  #id;
  #sort;
  #todos;
  #todoList;
  #todoView;
  #inputController;

  constructor(inputController, id, todoList, todoView) {
    this.#id = id;
    this.#todoList = todoList;
    this.#todoView = todoView;
    this.#inputController = inputController;
    this.#todos = [];
    this.#sort = {
      alphabetically: false,
      byGroup: false,
    };
  }

  #display() {
    this.#todos = this.#todoList.allTodos;
    if (this.#sort.alphabetically) this.#todos = this.#todoList.sortedTodos;
    if (this.#sort.byGroup) this.#todos = this.#todoList.completedTodos;
    this.#todoView.render(this.#todos);
  }

  #createNewTodo(todoDescription) {
    const todo = new Todo(this.#id.value, todoDescription);
    this.#todoList.add(todo);

    this.#display();
  }

  #markTodo(elementId) {
    const todos = this.#todoList.allTodos;

    todos.forEach((todo) => {
      if (todo.id === elementId) {
        todo.toggleStatus();
      }
    });
    this.#display();
  }

  #toggleSortAlphabetically() {
    this.#sort.alphabetically = !this.#sort.alphabetically;
    this.#display();
  }

  #toggleGroupSort() {
    this.#sort.byGroup = !this.#sort.byGroup;
    this.#display();
  }

  start() {
    this.#inputController.onSaveButton((todoDescription) =>
      this.#createNewTodo(todoDescription)
    );
    this.#inputController.onTodoClick((elementId) => this.#markTodo(elementId));
    this.#inputController.onSortButtonClick(() =>
      this.#toggleSortAlphabetically()
    );
    this.#inputController.onGroupSort(() => this.#toggleGroupSort());
  }
}

const getPageElements = (elementsName) => {
  return elementsName.map((element) => document.getElementById(element));
};

const main = () => {
  const elementsName = [
    "tasks",
    "task-box",
    "save-button",
    "sort-button",
    "complete-button",
  ];
  const [tasksElements, taskBox, saveButton, sortButton, completeButton] =
    getPageElements(elementsName);

  const id = new TodoId();
  const todoList = new TodoList();
  const todoView = new TodoView(tasksElements);

  const inputController = new MouseController(
    taskBox,
    saveButton,
    tasksElements,
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
