class IdGenerator {
  #number;

  constructor() {
    this.#number = 0;
  }

  #updateId() {
    this.#number += 1;
  }

  generate() {
    this.#updateId();
    return `task-${this.#number}`;
  }
}

class Todo {
  #id;
  #isDone;
  #isAlive;
  #description;

  constructor(id, description) {
    this.#id = id;
    this.#description = description;
    this.#isDone = false;
    this.#isAlive = true;
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

  get isAlive() {
    return this.#isAlive;
  }

  delete() {
    this.#isAlive = false;
  }

  toggleStatus() {
    this.#isDone = !this.#isDone;
  }
}
