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

      fetch("/todos/add", {
        method: "POST",
        body: listName,
      })
        .then((response) => response.json())
        .then((todos) => {
          createList(todos);
        });
    };
  }
}
