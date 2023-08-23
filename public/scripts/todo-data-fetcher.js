class TodoDataFetcher {
  constructor() {}

  setupAddTodoList(listName, createTodoList) {
    fetch("/todo-lists", {
      method: "POST",
      body: JSON.stringify({ listName }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ listId }) => {
        createTodoList(listName, listId);
      });
  }
}
