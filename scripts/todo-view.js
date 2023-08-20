class TodoView {
  #tasksElements;
  #changeTodoStatus;
  #removeTodo;
  #page;
  #createTodo;

  constructor() {
    this.#page = document.getElementById("page");
  }

  #removeTodos() {}

  #createDeleteButton(todo) {
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.id = todo.id;
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

  render(todos, listId) {
    const todosElement = document.getElementById(`${listId}-todos`);
    todosElement.replaceChildren();

    todos.forEach((todo) => {
      const todoElement = this.#createTodoElement(todo);
      const deleteButton = this.#createDeleteButton(todo);

      if (todo.isDone) {
        todoElement.classList.add("done");
      }

      todoElement.appendChild(deleteButton);
      const element = document.getElementById(`${listId}-todos`);
      element.appendChild(todoElement);
    });
  }

  setupAddNewTodo(createTodo) {
    this.#createTodo = createTodo;
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
      ["id", `${listId}-add`],
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
      ["id", `${listId}-sort`],
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
      ["id", `${listId}-done`],
      ["class", "buttons"],
    ];

    values.forEach((value) => {
      doneButton.setAttribute(value[0], value[1]);
    });

    return doneButton;
  }

  #createListNameElement(listName) {
    const listNameElement = document.createElement("h2");
    listNameElement.innerText = listName;

    return listNameElement;
  }

  #createTodosElements(listId) {
    const todos = document.createElement("div");
    todos.setAttribute("id", `${listId}-todos`);

    return todos;
  }

  #createTodoListElements(listName, listId) {
    const listNameElement = this.#createListNameElement(listName);
    const taskBox = this.#createTaskBox(listId);
    const addTaskButton = this.#createAddTaskButton(listId);
    const sortButton = this.#createSortButton(listId);
    const doneButton = this.#createDoneButton(listId);
    const todos = this.#createTodosElements(listId);

    return {
      listNameElement,
      taskBox,
      addTaskButton,
      sortButton,
      doneButton,
      todos,
    };
  }

  #appendElementsToList(list, elements) {
    Object.entries(elements).forEach(([_, element]) => {
      list.appendChild(element);
    });
  }

  renderList(listName, listId) {
    const elements = this.#createTodoListElements(listName, listId);

    elements.addTaskButton.onclick = () => {
      this.#createTodo(elements.taskBox.value, listId);
    };

    const list = document.createElement("section");
    list.id = listId;

    this.#appendElementsToList(list, elements);

    this.#page.appendChild(list);
  }
}
