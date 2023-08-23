class TodoController {
  #todoView;
  #todoLists;
  #todoDataFetcher;

  constructor(todoView, todoLists, todoDataFetcher) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#todoDataFetcher = todoDataFetcher;
  }

  #extractId(elementId) {
    return +elementId.split("-").pop();
  }

  #displayTodos() {
    const todoListsDetails = this.#todoLists.getTodosDetails();
    this.#todoView.renderLists(todoListsDetails);
  }

  #removeTodo(listId, todoId) {
    this.#todoLists.deleteTodo(listId, todoId);
    this.#displayTodos();
  }

  #onRemoveTodo(listId, todoId) {
    this.#todoDataFetcher.removeTodo(listId, todoId, (listId, todoId) => {
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
    this.#todoDataFetcher.toggleTodoStatus(listId, todoId, (listId, todoId) => {
      this.#toggleTodoStatus(listId, todoId);
    });
  }

  #createTodo(todoDescription, listId, todoId) {
    const todo = new Todo(todoDescription, todoId);
    this.#todoLists.addTodo(todo, listId);
    this.#displayTodos();
  }

  #onAddTodo(des, listId) {
    this.#todoDataFetcher.addTodo(des, listId, (des, listId, todoId) => {
      this.#createTodo(des, listId, todoId);
    });
  }

  #createTodoList(listName, listId) {
    const todoList = new TodoList(listName, listId);
    this.#todoLists.addTodoList(todoList);
    this.#displayTodos();
  }

  #onAddTodoList(listName) {
    this.#todoDataFetcher.addTodoList(listName, (listName, listId) => {
      this.#createTodoList(listName, listId);
    });
    }

  start() {
    this.#todoView.setupAddTodoList((listName) => {
      this.#onAddTodoList(listName);
    });

    this.#todoView.setupAddTodo((todoDescription, listElementId) => {
      const listId = this.#extractId(listElementId);
      this.#onAddTodo(todoDescription, listId);
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
