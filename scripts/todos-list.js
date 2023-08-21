class TodoLists {
  #todoLists;

  constructor() {
    this.#todoLists = [];
  }

  addTodoList(todoList) {
    this.#todoLists.push(todoList);
  }

  addTodo(todo, listId) {
    const todoList = this.#todoLists.find((todoList) => {
      if (listId === todoList.getTodoValues().listId) {
        return todoList;
      }
    });

    todoList.addTodo(todo);
  }

  deleteTodo(todo, listId) {
    const todoList = this.#todoLists.find((todoList) => {
      if (listId === todoList.getTodoValues().listId) {
        return todoList;
      }
    });

    todoList.delete(todo);
  }

  getTodoLists() {
    return [...this.#todoLists];
  }
}
