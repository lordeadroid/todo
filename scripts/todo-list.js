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

  getTodoValues() {
    const listName = this.#listName;
    const listId = this.#listId;
    const todos = this.getTodoLists();

    return { listName, listId, todos };
  }

  delete(todo) {
    const todoIndex = this.#todos.findIndex(
      (element) => element.id === todo.id
    );

    this.#todos.splice(todoIndex, 1);
  }

  #getTodos() {
    return [...this.#todos];
  }

  #sortedTodos() {
    const todos = this.#getTodos();

    return todos.sort((firstTodo, secondTodo) => {
      return firstTodo.description > secondTodo.description ? 1 : -1;
    });
  }

  #sortedCompletedTodos() {
    const completedTodos = this.#getTodos().filter((todo) => {
      return todo.isDone;
    });

    const unCompletedTodos = this.#getTodos().filter((todo) => {
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

  getTodoLists() {
    let todos = this.#getTodos();

    if (this.#sortPreference.alphabetically) {
      todos = this.#sortedTodos();
    }

    if (this.#sortPreference.byGroup) {
      todos = this.#sortedCompletedTodos();
    }

    return [...todos];
  }
}
