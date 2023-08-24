class TodoController {
  #todoView;
  #todoLists;
  #todoAdmin;

  constructor(todoView, todoLists, todoAdmin) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#todoAdmin = todoAdmin;
  }

  #displayTodos() {
    const todoListsDetails = this.#todoAdmin.getTodosDetails();
    this.#todoView.renderLists(todoListsDetails);
  }

  #toggleSortAlphabetically(listId) {
    this.#todoLists.toggleSortAlphabetically(listId);
  }

  #toggleGroupSort(listId) {
    this.#todoLists.toggleGroupSort(listId);
  }

  start() {
    this.#todoView.setupAddTodoList((listName) => {
      this.#todoAdmin.addTodoList(listName, () => this.#displayTodos());
    });

    this.#todoView.setupAddTodo((todoDescription, listId) => {
      this.#todoAdmin.addTodo(todoDescription, listId, () =>
        this.#displayTodos()
      );
    });

    this.#todoView.setupToggleListener((listId, todoId) => {
      this.#todoAdmin.toggleTodoStatus(listId, todoId, () =>
        this.#displayTodos()
      );
    });

    this.#todoView.setupRemoveTodoListener((listId, todoId) => {
      this.#todoAdmin.removeTodo(listId, todoId, () => this.#displayTodos());
    });

    this.#todoView.setupSortAlphabetically((listId) => {
      this.#toggleSortAlphabetically(listId);
      this.#displayTodos();
    });

    this.#todoView.setupSortByGroup((listId) => {
      this.#toggleGroupSort(listId);
      this.#displayTodos();
    });

    this.#displayTodos();
  }
}
