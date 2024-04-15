import request from "supertest";
import { describe, it } from "node:test";
import createApp from "../src/app.js";
import TodoLists from "../src/models/todo-lists.js";
import {
  getTodoLists,
  getTodoListsWithTodo,
} from "./test-data/todo-list-data.js";

describe("APP", () => {
  describe("GET /todo-lists", () => {
    it("should give no todo initially", (_, done) => {
      const todoLists = new TodoLists();
      const app = createApp(todoLists);

      request(app)
        .get("/todo-lists")
        .expect(200)
        .expect("content-type", /json/)
        .expect([])
        .end(done);
    });

    it("should give all the todos", (_, done) => {
      const todoLists = getTodoLists();
      const app = createApp(todoLists);

      request(app)
        .get("/todo-lists")
        .expect(200)
        .expect("content-type", /json/)
        .expect([{ listName: "work", listId: 0, todos: [] }])
        .end(done);
    });
  });

  describe("POST /todo-lists", () => {
    it("should add a todoList to the database", (_, done) => {
      const todoLists = new TodoLists();
      const app = createApp(todoLists);
      const listName = "work";

      request(app)
        .post("/todo-lists")
        .send({ listName })
        .expect(201)
        .expect("content-type", /json/)
        .expect({ listId: 0 })
        .end(done);
    });
  });

  describe("POST /todo-lists/:listId", () => {
    it("should add a todo to the given list", (_, done) => {
      const todoDescription = "drink water";
      const todoLists = getTodoLists();
      const app = createApp(todoLists);

      request(app)
        .post("/todo-lists/0")
        .send({ todoDescription })
        .expect(201)
        .expect("content-type", /json/)
        .expect({ todoId: 0 })
        .end(done);
    });
  });

  describe("DELETE /todo-lists/:listId/todos/:todoId", () => {
    it("should delete a todo in the specified list", (_, done) => {
      const todoLists = getTodoListsWithTodo("todo");
      const app = createApp(todoLists);

      request(app).delete("/todo-lists/0/todos/0").expect(204).end(done);
    });
  });
});
