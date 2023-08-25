const request = require('supertest');
const { describe, it } = require('node:test');
const { createApp } = require('../src/app');
const { Todo } = require('../src/models/todo');
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

  describe('POST /todo-lists', () => {
    it('should add a todoList to the database', (_, done) => {
      const todoLists = new TodoLists();
      const app = createApp(todoLists);
      const listName = 'work';

      request(app)
        .post('/todo-lists')
        .send({ listName })
        .expect(201)
        .expect('content-type', /json/)
        .expect({ listId: 0 })
        .end(done);
    });
  });

  describe('POST /todo-lists/:listId', () => {
    it('should add a todo to the given list', (_, done) => {
      const todoDescription = 'drink water';
      const listId = 0;
      const todoList = new TodoList('work', listId);
      const todoLists = new TodoLists();
      todoLists.addTodoList(todoList);
      const app = createApp(todoLists);

      request(app)
        .post(`/todo-lists/${listId}`)
        .send({ todoDescription })
        .expect(201)
        .expect('content-type', /json/)
        .expect({ todoId: 0 })
        .end(done);
    });
  });
});
