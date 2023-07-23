class IdGenerator {
  #name;
  #number;

  constructor(name) {
    this.#name = name;
    this.#number = 0;
  }

  #updateId() {
    this.#number += 1;
  }

  generate() {
    this.#updateId();
    const newId = `${this.#name}-${this.#number}`;
    return newId;
  }
}

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
