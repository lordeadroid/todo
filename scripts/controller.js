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
    const todo = new Todo(this.#id.generate(), todoDescription);
    this.#todoList.add(todo);

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

    this.#inputController.onSortButtonClick(() =>
      this.#toggleSortAlphabetically()
    );

    this.#inputController.onGroupSort(() => this.#toggleGroupSort());

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
