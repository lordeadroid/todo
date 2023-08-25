const request = require('supertest');
const { describe, it } = require('node:test');
const { createApp } = require('../src/app');
const { TodoList } = require('../src/models/todo-list');
const { TodoLists } = require('../src/models/todo-lists');

describe('APP', () => {
  describe('GET /todo-lists', () => {
    it('should give no todo initially', (_, done) => {
      const todoLists = new TodoLists();
      const app = createApp(todoLists);

      request(app)
        .get('/todo-lists')
        .expect(200)
        .expect('content-type', /json/)
        .expect([])
        .end(done);
    });

    it('should give all the todos', (_, done) => {
      const todoList = new TodoList('work', 0);
      const todoLists = new TodoLists();
      todoLists.addTodoList(todoList);
      const app = createApp(todoLists);

      request(app)
        .get('/todo-lists')
        .expect(200)
        .expect('content-type', /json/)
        .expect([{ listName: 'work', listId: 0, todos: [] }])
        .end(done);
    });
  });
});
