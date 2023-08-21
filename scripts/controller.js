class TodoController {
  #inputController;
  #todoId;
  #listId;
  #todoView;
  #todoLists;

  constructor(inputController, todoView, todoLists, listId, todoId) {
    this.#inputController = inputController;
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#listId = listId;
    this.#todoId = todoId;
  }

  #toggleSortAlphabetically(listId) {
    this.#todoLists.toggleSortAlphabetically(listId);
    this.#displayTodos();
  }

  #toggleGroupSort(listId) {
    this.#todoLists.toggleGroupSort(listId);
    this.#displayTodos();
  }

  #createTodo(todoDescription, listId) {
    const todo = new Todo(todoDescription, this.#todoId.generate());
    this.#todoLists.addTodo(todo, listId);
  }

  #createTodoList(listName) {
    const todoList = new TodoList(listName, this.#listId.generate());
    this.#todoLists.addTodoList(todoList);
  }

  #displayTodos() {
    const todos = this.#todoLists.getTodoLists();
    this.#todoView.renderLists(todos);
  }

  start() {
    this.#inputController.onAddListClick((listName) => {
      this.#createTodoList(listName);
      this.#displayTodos();
    });

    this.#todoView.setupAddNewTodo((todoDescription, listId) => {
      this.#createTodo(todoDescription, listId);
      this.#displayTodos();
    });

    this.#todoView.setupToggleListener((todo) => {
      todo.toggleStatus();
      this.#displayTodos();
    });

    this.#todoView.setupRemoveTodoListener((todo, listId) => {
      this.#todoLists.deleteTodo(todo, listId);
      this.#displayTodos();
    });

    this.#todoView.setupSortAlphabetically((listId) => {
      this.#toggleSortAlphabetically(listId);
    });

    this.#todoView.setupSortByGroup((listId) => {
      this.#toggleGroupSort(listId);
    });
  }
}
