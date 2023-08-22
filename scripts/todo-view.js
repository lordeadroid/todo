class TodoView {
  #todoListContainer;
  #changeTodoStatus;
  #removeTodo;
  #createTodo;
  #sortAlphabetically;
  #sortByGroup;
  #addListBox;
  #addListButton;

  constructor(addListBox, addListButton) {
    this.#todoListContainer = document.getElementById("todo-list");
    this.#addListBox = addListBox;
    this.#addListButton = addListButton;
  }

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
    const todoElement = document.createElement("p");
    todoElement.classList = "todos";
    todoElement.id = todo.id;
    todoElement.innerText = todo.description;

    return todoElement;
  }

  #createTodosElements(listId, todos) {
    const todosContainer = document.createElement("div");
    todosContainer.setAttribute("id", `${listId}-todos`);

    todos.forEach((todo) => {
      const todoElement = this.#createTodoElement(todo);
      const deleteButton = this.#createDeleteButton(todo);

      todoElement.onclick = () => {
        this.#changeTodoStatus(listId, todo.id);
      };

      if (todo.isDone) {
        todoElement.classList.add("done");
      }

      deleteButton.onclick = () => {
        this.#removeTodo(listId, todo.id);
      };

      todosContainer.appendChild(todoElement);
      todosContainer.appendChild(deleteButton);
    });

    return todosContainer;
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

  #createListNameElement(listName) {
    const listNameElement = document.createElement("h2");
    listNameElement.innerText = listName;

    return listNameElement;
  }

  #createTodoListElements(listName, listId, todos) {
    const listNameElement = this.#createListNameElement(listName);
    const taskBox = this.#createTaskBox(listId);
    const addTaskButton = this.#createAddTaskButton(listId);
    const sortButton = this.#createSortButton(listId);
    const doneButton = this.#createDoneButton(listId);
    const todosContainer = this.#createTodosElements(listId, todos);

    return {
      listNameElement,
      taskBox,
      addTaskButton,
      sortButton,
      doneButton,
      todosContainer,
    };
  }

  #appendElementsToList(list, elements) {
    Object.values(elements).forEach((element) => {
      list.appendChild(element);
    });
  }

  #renderList({ listName, listId, todos }) {
    const elements = this.#createTodoListElements(listName, listId, todos);

    elements.addTaskButton.onclick = () => {
      if (elements.taskBox.value)
        this.#createTodo(elements.taskBox.value, listId);
    };

    elements.sortButton.onclick = () => {
      this.#sortAlphabetically(listId);
    };

    elements.doneButton.onclick = () => {
      this.#sortByGroup(listId);
    };

    elements.taskBox.value = "";
    const list = document.createElement("section");
    list.id = listId;

    this.#appendElementsToList(list, elements);
    this.#todoListContainer.appendChild(list);
  }

  renderLists(todoLists) {
    this.#todoListContainer.replaceChildren();

    todoLists.forEach((todoList) => {
      this.#renderList(todoList);
    });
  }

  setupAddTodoList(createTodoList) {
    this.#addListButton.onclick = () => {
      const listName = this.#addListBox.value;
      this.#addListBox.value = "";

      if (listName) createTodoList(listName);
    };
  }

  setupAddTodo(createTodo) {
    this.#createTodo = createTodo;
  }

  setupToggleListener(changeTodoStatus) {
    this.#changeTodoStatus = changeTodoStatus;
  }

  setupRemoveTodoListener(removeTodo) {
    this.#removeTodo = removeTodo;
  }

  setupSortAlphabetically(sortAlphabetically) {
    this.#sortAlphabetically = sortAlphabetically;
  }

  setupSortByGroup(sortByGroup) {
    this.#sortByGroup = sortByGroup;
  }
}
