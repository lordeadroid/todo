class TodoView {
  #tasksElements;
  #changeTodoStatus;
  #removeTodo;
  #page;

  constructor() {
    this.#tasksElements = document.getElementById("tasks");
    this.#page = document.getElementById("page");
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

  #createTaskBox(listId) {
    const taskBox = document.createElement("input");
    const values = [
      ["type", "text"],
      ["class", listId],
      ["placeholder", "Add new task"],
    ];

    values.forEach((value) => {
      taskBox.setAttribute(value[0], value[1]);
    });

    return taskBox;
  }

  #createAddTaskButton(listId) {
    const addButtonElement = document.createElement("input");
    const values = [
      ["type", "button"],
      ["value", "Add"],
      ["class", listId],
      ["class", "buttons"],
    ];

    values.forEach((value) => {
      addButtonElement.setAttribute(value[0], value[1]);
    });

    return addButtonElement;
  }

  #createSortButton(listId) {
    const sortButton = document.createElement("input");
    const values = [
      ["type", "button"],
      ["value", "Sort"],
      ["class", listId],
      ["class", "buttons"],
    ];

    values.forEach((value) => {
      sortButton.setAttribute(value[0], value[1]);
    });

    return sortButton;
  }

  #createDoneButton(listId) {
    const doneButton = document.createElement("input");
    const values = [
      ["type", "button"],
      ["value", "Done Tasks"],
      ["class", listId],
      ["class", "buttons"],
    ];

    values.forEach((value) => {
      doneButton.setAttribute(value[0], value[1]);
    });

    return doneButton;
  }

  createNewList(title, listId = "list-1") {
    const list = document.createElement("section");
    const taskBox = this.#createTaskBox(listId);
    const addTaskButton = this.#createAddTaskButton(listId);
    const sortButton = this.#createSortButton(listId);
    const doneButton = this.#createDoneButton(listId);

    list.appendChild(taskBox);
    list.appendChild(addTaskButton);
    list.appendChild(sortButton);
    list.appendChild(doneButton);
    list.appendChild(tasks);

    this.#page.appendChild(list);
  }
}
