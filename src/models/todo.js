class Todo {
  #id;
  #isDone;
  #description;

  constructor(description, id) {
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

  getDetails() {
    const id = this.#id;
    const description = this.#description;
    const isDone = this.#isDone;

    return { id, description, isDone };
  }
}

module.exports = { Todo };
