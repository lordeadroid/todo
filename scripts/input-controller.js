class InputController {
  #addListButton;

  constructor(addListButton) {
    this.#addListButton = addListButton;
  }

  onAddListClick(createList) {
    this.#addListButton.onclick = () => {
      fetch("/todos")
        .then((response) => response.json())
        .then((todos) => {
          createList(JSON.parse(todos));
        });
    };
  }
}
