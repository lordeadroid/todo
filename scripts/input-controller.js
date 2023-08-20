class InputController {
  #addListBox;
  #addListButton;

  constructor(addListBox, addListButton) {
    this.#addListBox = addListBox;
    this.#addListButton = addListButton;
  }

  onAddListClick(createList) {
    this.#addListButton.onclick = () => {
      const listName = this.#addListBox.value;
      this.#addListBox.value = "";

      fetch("/todos")
        .then((response) => response.json())
        .then((todos) => {
          createList(JSON.parse(todos), listName);
        });
    };
  }
}
