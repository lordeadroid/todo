const renderTask = (taskElement) => {
  const page = document.querySelector("#page");
  page.appendChild(taskElement);
};

const createTaskElement = (task) => {
  const taskElement = document.createElement("li");
  taskElement.innerText = task;

  return taskElement;
};

const readTask = (taskBox) => {
  const task = taskBox.value;
  taskBox.value = "";

  return task;
};

const main = () => {
  const taskBox = document.querySelector("#task-box");
  const saveButton = document.querySelector("#save-button");

  saveButton.onclick = () => {
    const task = readTask(taskBox);
    const taskElement = createTaskElement(task);
    renderTask(taskElement);
  };
};

window.onload = main;
