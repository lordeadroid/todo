class TodoView {
  #tasksElements;
  #changeTodoStatus;

  constructor() {
    this.#tasksElements = document.getElementById("tasks");
  }

  #removeTodos() {
    while (this.#tasksElements.hasChildNodes()) {
      this.#tasksElements.removeChild(this.#tasksElements.firstChild);
    }
  }

  #createTodoElement(todo) {
    const todoElement = document.createElement("div");
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

      if (todo.isDone) {
        todoElement.classList.add("done");
      }

      this.#tasksElements.appendChild(todoElement);
    });
  }

  setupToggleListener(changeTodoStatus) {
    this.#changeTodoStatus = changeTodoStatus;
  }
}
