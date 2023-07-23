class MouseController {
  #taskBox;
  #submitButton;
  #sortButton;
  #groupButton;
  #titleButton;
  #titleBox;

  constructor(
    taskBox,
    submitButton,
    sortButton,
    groupButton,
    titleButton,
    titleBox
  ) {
    this.#taskBox = taskBox;
    this.#submitButton = submitButton;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
    this.#titleButton = titleButton;
    this.#titleBox = titleBox;
  }

  #readTodo() {
    const taskDescription = this.#taskBox.value;
    this.#taskBox.value = "";
    return taskDescription;
  }

  onSaveButtonClick(createNewTodo) {
    this.#submitButton.onclick = () => {
      const todoDescription = this.#readTodo();
      createNewTodo(todoDescription);
    };
  }

  onSortButtonClick(toggleSortAlphabetically) {
    this.#sortButton.onclick = toggleSortAlphabetically;
  }

  onGroupSort(toggleGroupSort) {
    this.#groupButton.onclick = toggleGroupSort;
  }

  onAddTitleClick(create) {
    this.#titleButton.onclick = () => {
      const taskTitle = this.#titleBox.value;
      this.#titleBox.value = "";
      create(taskTitle);
    };
  }
}
