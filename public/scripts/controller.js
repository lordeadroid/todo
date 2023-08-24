class TodoController {
  #todoView;
  #todoLists;
  #todoAdmin;

  constructor(todoView, todoLists, todoAdmin) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#todoAdmin = todoAdmin;
  }

  #extractId(elementId) {
    return +elementId.split("-").pop();
  }

  #displayTodos() {
    const todoListsDetails = this.#todoAdmin.getTodosDetails();
    this.#todoView.renderLists(todoListsDetails);
  }

  #removeTodo(listId, todoId) {
    this.#todoLists.deleteTodo(listId, todoId);
    this.#displayTodos();
  }

  #onRemoveTodo(listId, todoId) {
    this.#todoAdmin.removeTodo(listId, todoId, (listId, todoId) => {
      this.#removeTodo(listId, todoId);
    });
  }

  #toggleSortAlphabetically(listId) {
    this.#todoLists.toggleSortAlphabetically(listId);
  }

  #toggleGroupSort(listId) {
    this.#todoLists.toggleGroupSort(listId);
  }

  #toggleTodoStatus(listId, todoId) {
    this.#todoLists.toggleTodoStatus(listId, todoId);
    this.#displayTodos();
  }

  #onToggleTodoStatus(listId, todoId) {
    this.#todoAdmin.toggleTodoStatus(listId, todoId, (listId, todoId) => {
      this.#toggleTodoStatus(listId, todoId);
    });
  }

  #createTodo(todoDescription, listId, todoId) {
    const todo = new Todo(todoDescription, todoId);
    this.#todoLists.addTodo(todo, listId);
    this.#displayTodos();
  }

  #onAddTodo(des, listId) {
    this.#todoAdmin.addTodo(des, listId, (des, listId, todoId) => {
      this.#createTodo(des, listId, todoId);
    });
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

    this.#todoView.setupToggleListener((listElementId, todoElementId) => {
      const listId = this.#extractId(listElementId);
      const todoId = this.#extractId(todoElementId);

      this.#onToggleTodoStatus(listId, todoId);
    });

    this.#todoView.setupRemoveTodoListener((listElementId, todoElementId) => {
      const listId = this.#extractId(listElementId);
      const todoId = this.#extractId(todoElementId);

      this.#onRemoveTodo(listId, todoId);
    });

    this.#todoView.setupSortAlphabetically((listElementId) => {
      const listId = this.#extractId(listElementId);

      this.#toggleSortAlphabetically(listId);
      this.#displayTodos();
    });

    this.#todoView.setupSortByGroup((listElementId) => {
      const listId = this.#extractId(listElementId);

      this.#toggleGroupSort(listId);
      this.#displayTodos();
    });

    this.#displayTodos();
  }
}
