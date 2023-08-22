class TodoList {
  #listName;
  #listId;
  #todos;
  #sortPreference;

  constructor(listName, listId) {
    this.#listName = listName;
    this.#listId = listId;

    this.#todos = [];
    this.#sortPreference = {
      alphabetically: false,
      byGroup: false,
    };
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  getDetails() {
    const listName = this.#listName;
    const listId = this.#listId;
    const todos = this.getTodos();

    return { listName, listId, todos };
  }

  delete(todoId) {
    const todoIndex = this.#todos.findIndex((todo) => todo.id === todoId);
    this.#todos.splice(todoIndex, 1);
  }

  #findTodo(todoId) {
    return this.#todos.find((todo) => todoId === todo.id);
  }

  toggleTodoStatus(todoId) {
    const todo = this.#findTodo(todoId);
    todo.toggleStatus();
  }

  #sortedTodos() {
    const todos = this.#todos;

    return todos.sort((firstTodo, secondTodo) => {
      return firstTodo.description > secondTodo.description ? 1 : -1;
    });
  }

  #sortedCompletedTodos() {
    const completedTodos = this.#todos.filter((todo) => {
      return todo.isDone;
    });

    const unCompletedTodos = this.#todos.filter((todo) => {
      return !todo.isDone;
    });

    return unCompletedTodos.concat(completedTodos);
  }

  toggleSortAlphabetically() {
    this.#sortPreference.alphabetically = !this.#sortPreference.alphabetically;
  }

  toggleSortByGroup() {
    this.#sortPreference.byGroup = !this.#sortPreference.byGroup;
  }

  getTodos() {
    let todos = this.#todos;

    if (this.#sortPreference.alphabetically) {
      todos = this.#sortedTodos();
    }

    if (this.#sortPreference.byGroup) {
      todos = this.#sortedCompletedTodos();
    }

    return todos.map((todo) => todo.getDetails());
  }

  get id() {
    return this.#listId;
  }
}
