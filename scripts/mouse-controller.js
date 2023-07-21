class MouseController {
  #taskBox;
  #submitButton;
  #sortButton;
  #groupButton;

  constructor(taskBox, submitButton, sortButton, groupButton) {
    this.#taskBox = taskBox;
    this.#submitButton = submitButton;
    this.#sortButton = sortButton;
    this.#groupButton = groupButton;
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
}
