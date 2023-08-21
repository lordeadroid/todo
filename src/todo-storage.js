class TodoStorage {
  #todos;
  #writeFileSync;
  #filePath;

  constructor(todos, filePath, writeFileSync) {
    this.#todos = todos;
    this.#writeFileSync = writeFileSync;
    this.#filePath = filePath;
  }

  #saveTodo() {
    this.#writeFileSync(this.#filePath, JSON.stringify(this.#todos));
  }

  addTodos(todo) {
    this.#saveTodo();
    this.#todos.push(todo);
  }

  getTodos() {
    return [...this.#todos];
  }
}

module.exports = { TodoStorage };
