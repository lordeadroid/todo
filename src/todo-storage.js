class TodoStorage {
  #todos;

  constructor() {
    this.#todos = [];
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  getTodos() {
    return [...this.#todos];
  }
}
