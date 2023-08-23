class TodoDataFetcher {
  constructor() {}

  addTodoList(listName, createTodoList) {
    fetch("/todo-lists", {
      method: "POST",
      body: JSON.stringify({ listName }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ listId }) => {
        createTodoList(listName, listId);
      });
  }

  addTodo(todoDescription, listId, createTodo) {
    fetch(`/todo-lists/${listId}`, {
      method: "POST",
      body: JSON.stringify({ todoDescription }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ todoId }) => {
        createTodo(todoDescription, listId, todoId);
      });
  }

  toggleTodoStatus(listId, todoId, toggleStatus) {
    fetch(`/todo-lists/${listId}/todos/${todoId}`, {
      method: "PATCH",
    }).then(() => {
      toggleStatus(listId, todoId);
    });
  }

  removeTodo(listId, todoId, removeTodo) {
    fetch(`/todo-lists/${listId}/todos/${todoId}`, {
      method: "DELETE",
    }).then(() => {
      removeTodo(listId, todoId);
    });
  }
}
