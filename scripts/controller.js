const log = (val, msg) => {
  console.log(val, msg);
  return val;
};

class TodoController {
  #inputController;
  #todoId;
  #listId;
  #todoView;
  #sortPreference;
  #todoLists;

  constructor(inputController, todoView, todoLists, listId, todoId) {
    this.#inputController = inputController;
    this.#todoView = todoView;
    this.#todoLists = todoLists;
    this.#listId = listId;
    this.#todoId = todoId;
  }

  // #displayTodos(listId) {
  //   let todos = this.#todoList.allTodos;

  //   if (this.#sortPreference.alphabetically) {
  //     todos = this.#todoList.sortedTodos;
  //   }

  //   if (this.#sortPreference.byGroup) {
  //     todos = this.#todoList.sortedCompletedTodos;
  //   }

  //   this.#todoView.render(todos, listId);
  // }

  #toggleSortAlphabetically() {
    this.#sortPreference.alphabetically = !this.#sortPreference.alphabetically;

    this.#displayTodos();
  }

  #toggleGroupSort() {
    this.#sortPreference.byGroup = !this.#sortPreference.byGroup;

    this.#displayTodos();
  }

  #createTodo(todoDescription, listId) {
    const todo = new Todo(todoDescription, this.#todoId.generate());
    this.#todoLists.addTodo(todo, listId);
  }

  #createTodoList(listName) {
    const todoList = new TodoList(listName, this.#listId.generate());
    this.#todoLists.addTodoList(todoList);
  }

  #displayTodos() {
    const todos = this.#todoLists.getTodoLists();
    this.#todoView.renderLists(log(todos, "display todos is called"));
  }

  start() {
    this.#inputController.onAddListClick((listName) => {
      this.#createTodoList(listName);
      this.#displayTodos();
    });

    this.#todoView.setupAddNewTodo((todoDescription, listId) => {
      this.#createTodo(todoDescription, listId);
      this.#displayTodos();
    });

    // this.#todoView.setupToggleListener((todo) => {
    //   todo.toggleStatus();
    //   this.#displayTodos();
    // });

    // this.#todoView.setupRemoveTodoListener((todo) => {
    //   this.#todoList.delete(todo);
    //   this.#displayTodos();
    // });
  }
}
