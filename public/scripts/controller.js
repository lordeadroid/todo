class TodoController {
  #todoView;
  #todoLists;
  #todoDataFetcher;

  constructor(todoView, todoLists, todoDataFetcher) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#todoDataFetcher = todoDataFetcher;
  }

  #toggleSortAlphabetically(listId) {
    this.#todoLists.toggleSortAlphabetically(listId);
  }

  #toggleGroupSort(listId) {
    this.#todoLists.toggleGroupSort(listId);
  }

  #createTodo(todoDescription, listId) {
    fetch(`/todo-lists/${listId}`, {
      method: "POST",
      body: JSON.stringify({ todoDescription }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ todoId }) => {
        const todo = new Todo(todoDescription, todoId);
        this.#todoLists.addTodo(todo, listId);
        this.#displayTodos();
      });
  }

  #createTodoList(listName, listId) {
    const todoList = new TodoList(listName, listId);
    this.#todoLists.addTodoList(todoList);
    this.#displayTodos();
  }

  #displayTodos() {
    const todoListsDetails = this.#todoLists.getTodosDetails();
    this.#todoView.renderLists(todoListsDetails);
  }

  #extractId(elementId) {
    return +elementId.split("-").pop();
  }

  #fetchTodoListData(listName) {
    this.#todoDataFetcher.setupAddTodoList(listName, (listName, listId) => {
      this.#createTodoList(listName, listId);
    });
  }

  start() {
    this.#todoView.setupAddTodoList((listName) =>
      this.#fetchTodoListData(listName)
    );

    this.#todoView.setupAddTodo((todoDescription, listElementId) => {
      const listId = this.#extractId(listElementId);

      this.#createTodo(todoDescription, listId);
      this.#displayTodos();
    });

    this.#todoView.setupToggleListener((listElementId, todoElementId) => {
      const listId = this.#extractId(listElementId);
      const todoId = this.#extractId(todoElementId);

      fetch(`/todo-lists/${listId}/todos/${todoId}`, {
        method: "PATCH",
      }).then(() => {
        this.#todoLists.toggleTodoStatus(listId, todoId);
        this.#displayTodos();
      });
    });

    this.#todoView.setupRemoveTodoListener((listElementId, todoElementId) => {
      const listId = this.#extractId(listElementId);
      const todoId = this.#extractId(todoElementId);

      fetch(`/todo-lists/${listId}/todos/${todoId}`, {
        method: "DELETE",
      }).then(() => {
        this.#todoLists.deleteTodo(listId, todoId);
        this.#displayTodos();
      });
    });

    this.#todoView.setupSortAlphabetically((listElementId) => {
      const listId = this.#extractId(listElementId);

      this.#toggleSortAlphabetically(listId);
      this.#displayTodos();
    });

    this.#todoView.setupSortByGroup((listElementId) => {
      const listId = this.#extractId(listElementId);

      this.#toggleGroupSort(listId);
      this.#displayTodos();
    });

    this.#displayTodos();
  }
}
