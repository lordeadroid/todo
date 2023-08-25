/* eslint-disable no-unused-vars */

class TodoView {
  #addListBox;
  #addListButton;
  #todoListContainer;
  #createTodo;
  #removeTodo;
  #sortByAlpha;
  #sortByGroup;
  #changeTodoStatus;

  constructor(addListBox, addListButton, todoListContainer) {
    this.#addListBox = addListBox;
    this.#addListButton = addListButton;
    this.#todoListContainer = todoListContainer;
  }

  #appendElements(container, elements) {
    elements.forEach((element) => {
      container.appendChild(element);
    });
  }

  #addAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  #setupOnClick(element, cb, ...params) {
    element.onclick = () => {
      cb(...params);
    };
  }

  #createDeleteButton(todo) {
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.classList = "delete-button";

    this.#setupOnClick(deleteButton, this.#removeTodo, todo);
    return deleteButton;
  }

  #createTodoElement(todo) {
    const todoElement = document.createElement("p");
    todoElement.classList = "todos";
    todoElement.innerText = todo.description;

    return todoElement;
  }

  #createTodosElements(listId, todos) {
    const todosContainer = document.createElement("div");
    todosContainer.setAttribute("id", `${listId}-todos`);

    todos.forEach((todo) => {
      const todoId = `todo-${todo.id}`;
      const todoElement = this.#createTodoElement(todo);
      const deleteButton = this.#createDeleteButton(todo);
      const todoContainer = document.createElement("div");
      todoContainer.id = todoId;

      if (todo.isDone) todoElement.classList.add("done");

      const listNo = +listId.split("-").pop();
      this.#setupOnClick(todoElement, this.#changeTodoStatus, listNo, todo.id);
      this.#setupOnClick(deleteButton, this.#removeTodo, listNo, todo.id);
      this.#appendElements(todoContainer, [todoElement, deleteButton]);
      todosContainer.appendChild(todoContainer);
    });

    return todosContainer;
  }

  #createDoneButton(listId) {
    const doneButton = document.createElement("input");
    const attributes = {
      type: "button",
      value: "Done Tasks",
      id: `${listId}-done`,
      class: "buttons",
    };

    this.#addAttributes(doneButton, attributes);
    return doneButton;
  }

  #createSortButton(listId) {
    const sortButton = document.createElement("input");
    const attributes = {
      type: "button",
      value: "Sort",
      id: `${listId}-sort`,
      class: "buttons",
    };

    this.#addAttributes(sortButton, attributes);
    return sortButton;
  }

  #createAddTaskButton(listId) {
    const addButtonElement = document.createElement("input");
    const attributes = {
      value: "Add",
      id: `${listId}-add`,
      type: "button",
      class: "buttons",
    };

    this.#addAttributes(addButtonElement, attributes);
    return addButtonElement;
  }

  #createTaskBox(listId) {
    const taskBox = document.createElement("input");
    const attributes = {
      type: "text",
      class: listId,
      placeholder: "Add new task",
    };

    this.#addAttributes(taskBox, attributes);
    return taskBox;
  }

  #createListNameElement(listName) {
    const listNameElement = document.createElement("h2");
    listNameElement.innerText = listName;

    return listNameElement;
  }

  #createTodoListElements(listName, listId, todos) {
    return {
      listNameElement: this.#createListNameElement(listName),
      taskBox: this.#createTaskBox(listId),
      addTaskButton: this.#createAddTaskButton(listId),
      sortButton: this.#createSortButton(listId),
      doneButton: this.#createDoneButton(listId),
      todosContainer: this.#createTodosElements(listId, todos),
    };
  }

  #renderList({ listName, listId, todos }) {
    const id = `list-${listId}`;
    const elements = this.#createTodoListElements(listName, id, todos);
    const list = document.createElement("section");
    list.id = id;

    elements.addTaskButton.onclick = () => {
      if (elements.taskBox.value) {
        this.#createTodo(elements.taskBox.value, listId);
        elements.taskBox.value = "";
      }
    };

    this.#setupOnClick(elements.sortButton, this.#sortByAlpha, listId);
    this.#setupOnClick(elements.doneButton, this.#sortByGroup, listId);
    this.#appendElements(list, Object.values(elements));
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

      if (listName) {
        createTodoList(listName);
        this.#addListBox.value = "";
      }
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
    this.#sortByAlpha = sortAlphabetically;
  }

  setupSortByGroup(sortByGroup) {
    this.#sortByGroup = sortByGroup;
  }
}
