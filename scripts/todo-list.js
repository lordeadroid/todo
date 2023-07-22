class TodoList {
  #todos;

  constructor() {
    this.#todos = [];
  }

  add(todo) {
    this.#todos.push(todo);
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
