class TodoController {
  #inputController;
  #todoId;
  #listId;
  #todoList;
  #todoView;
  #sortPreference;
  #todoStorage;

  constructor(inputController, todoList, todoView) {
    this.#inputController = inputController;
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

  #addList(todosList) {
    this.#todoView.renderAllLists(todosList);
  }

  start() {
    this.#inputController.onAddListClick((todosList) => {
      this.#addList(todosList);
    });

    // this.#todoView.setupAddNewTodo((todoDescription, listId) => {
    //   this.#createNewTodo(todoDescription, listId);
    // });

    // this.#todoView.setupToggleListener((todo) => {
    //   todo.toggleStatus();
    //   this.#displayTodos();
    // });

    // this.#todoView.setupRemoveTodoListener((todo) => {
    //   this.#todoList.delete(todo);
    //   this.#displayTodos();
    // });
  }
}
