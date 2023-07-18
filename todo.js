const resetInputBoxValue = (element) => {
  element.value = "";
};

const createTasks = (tasks) => {
  const taskElements = tasks.map((task) => {
    const li = document.createElement("li");
    li.innerText = task;
    return li;
  });
  appendElements(taskElements);
};

const appendElements = (taskElements) => {
  const page = document.querySelector(".page");

  taskElements.forEach((element) => {
    page.appendChild(element);
  });
};

const takeTask = (cb) => {
  const taskElement = document.querySelector("#task-box");
  const task = taskElement.value;
  resetInputBoxValue(taskElement);
  cb([task]);
};

const main = () => {
  const saveButton = document.querySelector("#save-button");

  saveButton.onclick = () => {
    takeTask(createTasks);
  };
};

window.onload = main;
