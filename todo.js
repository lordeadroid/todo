class TodoId {
  #number;

  constructor() {
    this.#number = 0;
  }

  #updateId() {
    this.#number += 1;
  }

  value() {
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

  get sortedCompletedTodos() {
    const completedTodos = this.allTodos.filter((todo) => {
      return todo.isDone;
    });

    const unCompletedTodos = this.allTodos.filter((todo) => {
      return !todo.isDone;
    });

    return unCompletedTodos.concat(completedTodos);
  }

  clickTodo(todoId) {
    const todo = this.allTodos.find((todo) => todo.id === todoId);
    todo.toggleStatus();
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

  #createTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.id = todo.id;
    todoElement.innerText = todo.description;
    todoElement.cre;
    return todoElement;
  }

  render(todos) {
    this.#removeTodos();

    todos.forEach((todo) => {
      const todoElement = this.#createTodoElement(todo);
      if (todo.isDone) {
        todoElement.classList.add("done");
      }
      this.#tasksElements.appendChild(todoElement);
    });
  }
}

class MouseController {
  #tasks;
  #taskBox;
  #submitButton;
  #sortButton;
  #groupButton;

  constructor(taskBox, submitButton, tasks, sortButton, groupButton) {
    this.#taskBox = taskBox;
    this.#submitButton = submitButton;
    this.#tasks = tasks;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
  }

  #readTodo() {
    const taskDescription = this.#taskBox.value;
    this.#taskBox.value = "";
    return taskDescription;
  }

  onSaveButtonClick(createNewTodo) {
    this.#submitButton.onclick = () => {
      const todoDescription = this.#readTodo();
      createNewTodo(todoDescription);
    };
  }

  onTodoClick(clickTodo) {
    this.#tasks.onclick = (event) => {
      const todoId = event.target.id;
      clickTodo(todoId);
    };
  }

  onSortButtonClick(toggleSortAlphabetically) {
    this.#sortButton.onclick = toggleSortAlphabetically;
  }

  onGroupSort(toggleGroupSort) {
    this.#groupButton.onclick = toggleGroupSort;
  }
}

class TodoController {
  #inputController;
  #id;
  #todoList;
  #todoView;
  #sort;

  constructor(inputController, id, todoList, todoView) {
    this.#inputController = inputController;
    this.#id = id;
    this.#todoList = todoList;
    this.#todoView = todoView;
    this.#sort = {
      alphabetically: false,
      byGroup: false,
    };
  }

  #displayTodos() {
    let todos = this.#todoList.allTodos;
    if (this.#sort.alphabetically) todos = this.#todoList.sortedTodos;
    if (this.#sort.byGroup) todos = this.#todoList.sortedCompletedTodos;

    this.#todoView.render(todos);
  }

  #createNewTodo(todoDescription) {
    const todo = new Todo(this.#id.value(), todoDescription);
    this.#todoList.add(todo);

    this.#displayTodos();
  }

  #clickTodo(todoId) {
    this.#todoList.clickTodo(todoId);

    this.#displayTodos();
  }

  #toggleSortAlphabetically() {
    this.#sort.alphabetically = !this.#sort.alphabetically;

    this.#displayTodos();
  }

  #toggleGroupSort() {
    this.#sort.byGroup = !this.#sort.byGroup;

    this.#displayTodos();
  }

  start() {
    this.#inputController.onSaveButtonClick((todoDescription) =>
      this.#createNewTodo(todoDescription)
    );

    this.#inputController.onTodoClick((todoId) => this.#clickTodo(todoId));

    this.#inputController.onSortButtonClick(() =>
      this.#toggleSortAlphabetically()
    );

    this.#inputController.onGroupSort(() => this.#toggleGroupSort());
  }
}

const getElements = (elementsName) => {
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

  const [tasksElements, taskBox, submitButton, sortButton, completeButton] =
    getElements(elementsName);

  const id = new TodoId();
  const todoList = new TodoList();
  const todoView = new TodoView(tasksElements);

  const inputController = new MouseController(
    taskBox,
    submitButton,
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
