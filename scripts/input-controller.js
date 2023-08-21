class InputController {
  #addListBox;
  #addListButton;

  constructor(addListBox, addListButton) {
    this.#addListBox = addListBox;
    this.#addListButton = addListButton;
  }

  onAddListClick(createNewList) {
    this.#addListButton.onclick = () => {
      const listName = this.#addListBox.value;
      this.#addListBox.value = "";

      createNewList(listName);
    };
  }

  setupAddTodo() {}
}
