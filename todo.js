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

const main = () => {
  const saveButton = document.querySelector("#save-button");

  saveButton.onclick = () => {
    takeTask(createTask);

    const tasks = document.querySelectorAll("li");
    tasks.forEach((task) => {
      task.onclick = () => {
        task.style.color = "white";
        task.style.backgroundColor = "green";
      };
    });
  };
};

window.onload = main;
