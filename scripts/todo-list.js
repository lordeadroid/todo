class TodoList {
  #listName;
  #listId;
  #todos;

  constructor(listName, listId) {
    this.#listName = listName;
    this.#listId = listId;

    this.#todos = [];
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  getTodoValues() {
    const listName = this.#listName;
    const listId = this.#listId;
    const todos = this.#todos;

    return { listName, listId, todos };
  }

  get allTodos() {
    return [...this.#todos];
  }

  get sortedTodos() {
    const todos = this.allTodos;

    return todos.sort((firstTodo, secondTodo) => {
      return firstTodo.description > secondTodo.description ? 1 : -1;
    });
  }

  get sortedCompletedTodos() {
    const completedTodos = this.allTodos.filter((todo) => {
      return todo.isDone;
    });

    const unCompletedTodos = this.allTodos.filter((todo) => {
      return !todo.isDone;
    });

    return unCompletedTodos.concat(completedTodos);
  }

  delete(todo) {
    const todoIndex = this.#todos.findIndex(
      (element) => element.id === todo.id
    );

    this.#todos.splice(todoIndex, 1);
  }
}
