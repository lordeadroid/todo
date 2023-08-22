class TodoStorage {
  #todos;
  #writeFileSync;
  #filePath;

  constructor(todos, filePath, writeFileSync) {
    this.#todos = todos;
    this.#filePath = filePath;
    this.#writeFileSync = writeFileSync;
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
