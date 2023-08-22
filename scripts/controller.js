class TodoController {
  #todoView;
  #todoLists;
  #listIdGenerator;
  #todoIdGenerator;
  #addListBox;
  #addListButton;

  constructor(todoView, todoLists, listId, todoId, addListBox, addListButton) {
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#listIdGenerator = listId;
    this.#todoIdGenerator = todoId;
    this.#addListBox = addListBox;
    this.#addListButton = addListButton;
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
    const todoList = new TodoList(listName, this.#listIdGenerator.generate());
    this.#todoLists.addTodoList(todoList);
  }

  #displayTodos() {
    const todoListsDetails = this.#todoLists.getTodosDetails();
    this.#todoView.renderLists(todoListsDetails);
  }

  start() {
    this.#addListButton.onclick = () => {
      const listName = this.#addListBox.value;
      this.#addListBox.value = "";
      this.#createTodoList(listName);
      this.#displayTodos();
    };

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

    this.#displayTodos();
  }
}
