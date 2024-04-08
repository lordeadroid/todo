/* eslint-disable no-unused-vars */

class TodoAdmin {
  #todoLists;
  #sortPreference;

  constructor(todoLists) {
    this.#todoLists = todoLists;
    this.#sortPreference = {
      alphabetically: false,
      byGroup: false,
    };
  }

  getAllTodos(init) {
    fetch("/todo-lists")
      .then((res) => res.json())
      .then((todoListDetails) => {
        init(todoListDetails);
      });
  }

  addTodoList(listName, displayTodo) {
    fetch("/todo-lists", {
      method: "POST",
      body: JSON.stringify({ listName }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ listId }) => {
        const todoList = new TodoList(listName, listId);
        this.#todoLists.addTodoList(todoList);
        displayTodo();
      });
  }

  addTodo(todoDescription, listId, displayTodo) {
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
        displayTodo();
      });
  }

  toggleTodoStatus(listId, todoId, displayTodo) {
    fetch(`/todo-lists/${listId}/todos/${todoId}`, {
      method: "PATCH",
    }).then(() => {
      this.#todoLists.toggleTodoStatus(listId, todoId);
      displayTodo();
    });
  }

  removeTodo(listId, todoId, displayTodo) {
    fetch(`/todo-lists/${listId}/todos/${todoId}`, {
      method: "DELETE",
    }).then(() => {
      this.#todoLists.deleteTodo(listId, todoId);
      displayTodo();
    });
  }

  sortAlphabetically(listId, displayTodo) {
    this.#sortPreference.alphabetically = !this.#sortPreference.alphabetically;
    this.#todoLists.toggleSortAlphabetically(listId);
    displayTodo();
  }

  sortByGroup(listId, displayTodo) {
    this.#sortPreference.sortByGroup = !this.#sortPreference.sortByGroup;
    this.#todoLists.toggleGroupSort(listId);
    displayTodo();
  }

  getTodosDetails() {
    return this.#todoLists.getTodosDetails();
  }
}
