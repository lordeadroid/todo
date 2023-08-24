class TodoAdmin {
  #todoLists;

  constructor(todoLists) {
    this.#todoLists = todoLists;
  }

  addTodoList(listName, createTodoList) {
    fetch('/todo-lists', {
      method: 'POST',
      body: JSON.stringify({ listName }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ listId }) => {
        const todoList = new TodoList(listName, listId);
        this.#todoLists.addTodoList(todoList);
        createTodoList();
      });
  }

  addTodo(todoDescription, listId, createTodo) {
    fetch(`/todo-lists/${listId}`, {
      method: 'POST',
      body: JSON.stringify({ todoDescription }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ todoId }) => {
        const todo = new Todo(todoDescription, todoId);
        this.#todoLists.addTodo(todo, listId);
        createTodo();
      });
  }

  toggleTodoStatus(listId, todoId, toggleStatus) {
    fetch(`/todo-lists/${listId}/todos/${todoId}`, {
      method: 'PATCH',
    }).then(() => {
      toggleStatus(listId, todoId);
    });
  }

  removeTodo(listId, todoId, removeTodo) {
    fetch(`/todo-lists/${listId}/todos/${todoId}`, {
      method: 'DELETE',
    }).then(() => {
      removeTodo(listId, todoId);
    });
  }

  getTodosDetails() {
    return this.#todoLists.getTodosDetails();
  }
}
