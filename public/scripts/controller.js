class TodoController {
  #todoView;
  #todoAdmin;

  constructor(todoView, todoAdmin) {
    this.#todoView = todoView;
    this.#todoAdmin = todoAdmin;
  }

  #displayTodos() {
    const todoListsDetails = this.#todoAdmin.getTodosDetails();
    this.#todoView.renderLists(todoListsDetails);
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
      this.#todoAdmin.sortAlphabetically(listId, () => this.#displayTodos());
    });

    this.#todoView.setupSortByGroup((listId) => {
      this.#todoAdmin.sortByGroup(listId, () => this.#displayTodos());
    });

    this.#displayTodos();
  }
}
