class TodoLists {
  #todoLists;

  constructor() {
    this.#todoLists = [];
  }

  addTodoList(todoList) {
    this.#todoLists.push(todoList);
  }

  #findTodoList(listId) {
    return this.#todoLists.find((todoList) => listId === todoList.id);
  }

  addTodo(todo, listId) {
    const todoList = this.#findTodoList(listId);
    todoList.addTodo(todo);
  }

  deleteTodo(listId, todoId) {
    const todoList = this.#findTodoList(listId);
    todoList.delete(todoId);
  }

  toggleSortAlphabetically(listId) {
    const todoList = this.#findTodoList(listId);
    todoList.toggleSortAlphabetically();
  }

  toggleGroupSort(listId) {
    const todoList = this.#findTodoList(listId);
    todoList.toggleSortByGroup();
  }

  toggleTodoStatus(listId, todoId) {
    const todoList = this.#findTodoList(listId);
    todoList.toggleTodoStatus(todoId);
  }

  getTodosDetails() {
    return this.#todoLists.map((todoList) => todoList.getDetails());
  }

  getListsName() {
    return this.getTodosDetails().map((todoList) => todoList.listName);
  }

  getNumberOfTodoLists() {
    return this.#todoLists.length;
  }

  getNumberOfTodos() {
    return this.#todoLists
      .map((todoList) => todoList.getNumberOfTodos())
      .reduce((a, b) => a + b, 0);
  }
}

module.exports = { TodoLists };
