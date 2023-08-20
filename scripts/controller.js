class TodoController {
  #inputController;
  #todoId;
  #listId;
  #todoList;
  #todoView;
  #sortPreference;

  constructor(inputController, todoId, listId, todoList, todoView) {
    this.#inputController = inputController;
    this.#todoId = todoId;
    this.#listId = listId;
    this.#todoList = todoList;
    this.#todoView = todoView;
    this.#sortPreference = {
      alphabetically: false,
      byGroup: false,
    };
  }

  #displayTodos(listId) {
    let todos = this.#todoList.allTodos;

    if (this.#sortPreference.alphabetically) {
      todos = this.#todoList.sortedTodos;
    }

    if (this.#sortPreference.byGroup) {
      todos = this.#todoList.sortedCompletedTodos;
    }

    this.#todoView.render(todos, listId);
  }

  #createNewTodo(todoDescription, listId) {
    const id = `${listId}-${this.#todoId.generate()}`;
    const todo = new Todo(id, todoDescription);
    this.#todoList.add(todo);

    this.#displayTodos(listId);
  }

  #toggleSortAlphabetically() {
    this.#sortPreference.alphabetically = !this.#sortPreference.alphabetically;

    this.#displayTodos();
  }

  #toggleGroupSort() {
    this.#sortPreference.byGroup = !this.#sortPreference.byGroup;

    this.#displayTodos();
  }

  #createList(listName) {
    this.#todoView.renderList(listName, this.#listId.generate());
  }

  start() {
    this.#inputController.onAddListClick((listName) => {
      this.#createList(listName);
    });

    this.#todoView.setupAddNewTodo((todoDescription, listId) => {
      this.#createNewTodo(todoDescription, listId);
    });

    this.#todoView.setupToggleListener((todo) => {
      todo.toggleStatus();
      this.#displayTodos();
    });

    this.#todoView.setupRemoveTodoListener((todo) => {
      this.#todoList.delete(todo);
      this.#displayTodos();
    });
  }
}
