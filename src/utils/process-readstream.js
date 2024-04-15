/* eslint-disable no-console */

import { exec } from "child_process";

class ServerCommandHandler {
  #localhost;

  constructor(PORT) {
    this.#localhost = `http://localhost:${PORT}`;
  }

  #clearScreen() {
    console.clear();
  }

  #openBrowser() {
    exec(`open ${this.#localhost}`);
    this.#clearScreen();
  }

  #close() {
    exec('pkill -f "node --watch"');
  }

  #handleWrongCommand(command) {
    this.#clearScreen();
    console.log(`${command} is not a valid command\n`);
    console.log("Follow the instructions below:\n");
    this.#printInstructions();
  }

  #execute(data) {
    const command = data.trim() || "";

    switch (command) {
      case "o":
        return this.#openBrowser();
      case "q":
        return this.#close();
      default:
        this.#handleWrongCommand(command);
    }
  }

  #readStream() {
    setInterval(() => {
      process.stdin.setEncoding("utf-8");
      const input = process.stdin.read();

      if (input) {
        this.#execute(input);
      }
    });
  }

  #printInstructions() {
    console.log("Press o to open in browser.");
    console.log("Press q to stop server.");
    console.log();
  }

  start() {
    this.#clearScreen();
    this.#printInstructions();
    this.#readStream();
  }
}

export default ServerCommandHandler;
