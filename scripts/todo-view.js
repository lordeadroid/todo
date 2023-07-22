class TodoView {
  #tasksElements;
  #changeTodoStatus;
  #removeTodo;

  constructor() {
    this.#tasksElements = document.getElementById("tasks");
  }

  #removeTodos() {
    while (this.#tasksElements.hasChildNodes()) {
      this.#tasksElements.removeChild(this.#tasksElements.firstChild);
    }
  }

  #createDeleteButton(todo) {
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.id = todo;
    deleteButton.classList = "delete-button";

    deleteButton.onclick = () => {
      this.#removeTodo(todo);
    };

    return deleteButton;
  }

  #createTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList = "todos";
    todoElement.id = todo.id;
    todoElement.innerText = todo.description;

    todoElement.onclick = () => {
      this.#changeTodoStatus(todo);
    };

    return todoElement;
  }

  render(todos) {
    this.#removeTodos();

    todos.forEach((todo) => {
      const todoElement = this.#createTodoElement(todo);
      const deleteButton = this.#createDeleteButton(todo);

      if (todo.isDone) {
        todoElement.classList.add("done");
      }

      todoElement.appendChild(deleteButton);
      this.#tasksElements.appendChild(todoElement);
    });
  }

  setupToggleListener(changeTodoStatus) {
    this.#changeTodoStatus = changeTodoStatus;
  }

  setupRemoveTodoListener(removeTodo) {
    this.#removeTodo = removeTodo;
  }
}
