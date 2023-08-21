class TodoController {
  #inputController;
  #todoId;
  #listId;
  #todoList;
  #todoView;
  #sortPreference;
  #todoStorage;
  #todosList;

  constructor(inputController, todoView, listId, todoId, todosList) {
    this.#inputController = inputController;
    // this.#todoList = todoList;
    this.#todoView = todoView;
    this.#listId = listId;
    this.#todoId = todoId;
    this.#todosList = todosList;

    this.#sortPreference = {
      alphabetically: false,
      byGroup: false,
    };
  }

  // #displayTodos(listId) {
  //   let todos = this.#todoList.allTodos;

  //   if (this.#sortPreference.alphabetically) {
  //     todos = this.#todoList.sortedTodos;
  //   }

  //   if (this.#sortPreference.byGroup) {
  //     todos = this.#todoList.sortedCompletedTodos;
  //   }

  //   this.#todoView.render(todos, listId);
  // }

  #createTodo(todoDescription, listId) {
    this.#todosList.addTodo(todoDescription, listId);

    // this.#displayTodos(listId);
  }

  #toggleSortAlphabetically() {
    this.#sortPreference.alphabetically = !this.#sortPreference.alphabetically;

    this.#displayTodos();
  }

  #toggleGroupSort() {
    this.#sortPreference.byGroup = !this.#sortPreference.byGroup;

    this.#displayTodos();
  }

  #createNewList(listName) {
    this.#todosList.add(listName);
  }

  #displayTodos() {
    const todos = this.#todosList.getTodosList();
    this.#todoView.renderLists(todos);
  }

  start() {
    this.#inputController.onAddListClick((listName) => {
      this.#createNewList(listName);
      this.#displayTodos();
    });

    this.#todoView.setupAddNewTodo((todoDescription, listId) => {
      this.#createTodo(todoDescription, listId);
    });

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
