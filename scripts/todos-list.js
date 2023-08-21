class TodosList {
  #todoList;
  #listId;
  #todoId;
  #idGenerator;
  #todosList;

  constructor(todoList, listId, todoId, idGenerator) {
    this.#todoList = todoList;
    this.#listId = listId;
    this.#todoId = todoId;
    this.#idGenerator = idGenerator;

    this.#todosList = [];
  }

  add(listName) {
    const id = new this.#idGenerator("todo");
    const listId = this.#listId.generate();
    const todoList = new this.#todoList(listName, listId, Todo, id);

    this.#todosList.push(todoList);
  }

  addTodo(todoDescription, listId) {
    const todoList = this.#todosList.find((todoList) => {
      if (listId === todoList.getTodoValues.listId) {
        return todoList;
      }
    });

    todoList.add(todoDescription);
  }

  getTodosList() {
    return [...this.#todosList];
  }
}
