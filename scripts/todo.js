class Todo {
  #id;
  #isDone;
  #description;

  constructor(id, description) {
    this.#id = id;
    this.#description = description;
    this.#isDone = false;
  }

  get id() {
    return this.#id;
  }

  get isDone() {
    return this.#isDone;
  }

  get description() {
    return this.#description;
  }

  toggleStatus() {
    this.#isDone = !this.#isDone;
  }
}
