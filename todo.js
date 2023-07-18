const createTasks = (tasks) => {
  return tasks.map((task) => {
    const li = document.createElement("li");
    li.innerText = task;
    return li;
  });
};

const appendElements = (taskElements) => {
  const page = document.querySelector(".page");

  taskElements.forEach((element) => {
    page.appendChild(element);
  });
};

const main = () => {
  const tasks = [
    "Buy eggs from supermarket.eet",
    "Finish Code Of Conduct training on campus.eet",
    "Finish day 15 part 2 of Advent of Code problem.eet",
    "Fill timesheeet",
  ];

  const taskElements = createTasks(tasks);

  appendElements(taskElements);
};

window.onload = main;
