class IdGenerator {
  #name;
  #number;

  constructor(name, number = 0) {
    this.#name = name;
    this.#number = number;
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
