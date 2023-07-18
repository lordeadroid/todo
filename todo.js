const resetTaskBoxValue = (element) => {
  element.value = "";
};

const createTask = (task) => {
  const taskElement = document.createElement("li");
  taskElement.innerText = task;

  appendElement(taskElement);
};

const appendElement = (taskElement) => {
  const page = document.querySelector(".page");

  page.appendChild(taskElement);
};

const takeTask = (cb) => {
  const taskElement = document.querySelector("#task-box");
  const task = taskElement.value;
  resetTaskBoxValue(taskElement);
  cb(task);
};

const markUndo = () => {
  const tasks = document.querySelectorAll(".done");
  console.log(tasks);
  tasks.forEach((task) => {
    task.onclick = () => {
      task.classList.remove("done");
    };
  });
};

const markCompleteTask = () => {
  const tasks = document.querySelectorAll("li");
  tasks.forEach((task) => {
    task.onclick = () => {
      task.classList.add("done");
    };
  });
  markUndo();
};

const main = () => {
  const saveButton = document.querySelector("#save-button");

  saveButton.onclick = () => {
    takeTask(createTask);
    markCompleteTask();
  };
};

window.onload = main;
