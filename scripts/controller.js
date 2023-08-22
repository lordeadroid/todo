class TodoController {
  #todoView;
  #todoLists;
  #listIdGenerator;
  #todoIdGenerator;

  constructor(todoView, todoLists, listId, todoId) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#listIdGenerator = listId;
    this.#todoIdGenerator = todoId;
  }

  #updateTodoDatabase(todoListsDetails) {
    fetch("/todos", {
      method: "POST",
      body: JSON.stringify(todoListsDetails),
    });
  }

  #toggleSortAlphabetically(listId) {
    this.#todoLists.toggleSortAlphabetically(listId);
  }

  #toggleGroupSort(listId) {
    this.#todoLists.toggleGroupSort(listId);
  }

  #createTodo(todoDescription, listId) {
    const todo = new Todo(todoDescription, this.#todoIdGenerator.generate());
    this.#todoLists.addTodo(todo, listId);
  }

  #createTodoList(listName) {
    fetch("/todos/add", {
      method: "POST",
      body: JSON.stringify({ listName }),
    })
      .then((res) => res.json())
      .then(({ listId }) => {
        const todoList = new TodoList(listName, listId);
        this.#todoLists.addTodoList(todoList);
        this.#displayTodos();
      });
  }

  #displayTodos() {
    const todoListsDetails = this.#todoLists.getTodosDetails();
    this.#updateTodoDatabase(todoListsDetails);
    this.#todoView.renderLists(todoListsDetails);
  }

  start() {
    this.#todoView.setupAddNewTodo((todoDescription, listId) => {
      this.#createTodo(todoDescription, listId);
      this.#displayTodos();
    });

    this.#todoView.setupToggleListener((listId, todoId) => {
      this.#todoLists.toggleTodoStatus(listId, todoId);
      this.#displayTodos();
    });

    this.#todoView.setupRemoveTodoListener((listId, todoId) => {
      this.#todoLists.deleteTodo(listId, todoId);
      this.#displayTodos();
    });

    this.#todoView.setupSortAlphabetically((listId) => {
      this.#toggleSortAlphabetically(listId);
      this.#displayTodos();
    });

    this.#todoView.setupSortByGroup((listId) => {
      this.#toggleGroupSort(listId);
      this.#displayTodos();
    });

    this.#todoView.setupCreateTodoList((listName) =>
      this.#createTodoList(listName)
    );

    this.#displayTodos();
  }
}
