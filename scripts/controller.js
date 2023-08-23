class TodoController {
  #todoView;
  #todoLists;
  #todoIdGenerator;

  constructor(todoView, todoLists, todoId) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#todoIdGenerator = todoId;
  }

  #updateTodoDatabase(todoListsDetails) {
    fetch("/todo-lists", {
      method: "PUT",
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
    fetch(`/todo-lists/${listId}`, {
      method: "POST",
      body: JSON.stringify({ todoDescription }),
    })
      .then((response) => response.json())
      .then(({ todoId }) => {
        const todo = new Todo(todoDescription, todoId);
        this.#todoLists.addTodo(todo, listId);
        this.#displayTodos();
      });
  }

  #createTodoList(listName) {
    fetch("/todo-lists", {
      method: "POST",
      body: JSON.stringify({ listName }),
    })
      .then((response) => response.json())
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

  #extractId(elementId) {
    return +elementId.split("-").pop();
  }

  start() {
    this.#todoView.setupAddTodoList((listName) =>
      this.#createTodoList(listName)
    );

    this.#todoView.setupAddTodo((todoDescription, listElementId) => {
      const listId = this.#extractId(listElementId);

      this.#createTodo(todoDescription, listId);
      this.#displayTodos();
    });

    this.#todoView.setupToggleListener((listElementId, todoElementId) => {
      const listId = this.#extractId(listElementId);
      const todoId = this.#extractId(todoElementId);

      this.#todoLists.toggleTodoStatus(listId, todoId);
      this.#displayTodos();
    });

    this.#todoView.setupRemoveTodoListener((listElementId, todoElementId) => {
      const listId = this.#extractId(listElementId);
      const todoId = this.#extractId(todoElementId);

      this.#todoLists.deleteTodo(listId, todoId);
      this.#displayTodos();
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
