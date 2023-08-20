class TodosList {
  #todoStorage;
  #todosList;

  constructor(todoStorage) {
    this.#todoStorage = todoStorage;
    this.#todosList = [];
  }

  add(todoList) {
    this.#todoStorage.add(todoList);
    this.#todosList.push(todoList);
  }

  getTodosList() {
    return [...this.#todosList];
  }
}
