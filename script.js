// Get elements from the DOM
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const completeAllButton = document.getElementById("completeAllButton");
const clearCompletedButton = document.getElementById("clearCompletedButton");
const showAllButton = document.getElementById("showAllButton");
const showUncompletedButton = document.getElementById("showUncompletedButton");
const showCompletedButton = document.getElementById("showCompletedButton");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("taskCount");

// Define task array
let tasks = [];

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
  }
}

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <label class="checkbox-wrapper">
        <input type="checkbox" class="checkbox" ${
          task.completed ? "checked" : ""
        } />
      </label>
      <span class="task-text ${task.completed ? "completed" : ""}">${
      task.text
    }</span>
      <button class="deleteButton">Delete</button>
    `;
    listItem.querySelector(".checkbox").addEventListener("change", function () {
      toggleTaskCompletion(task.id);
    });
    listItem
      .querySelector(".deleteButton")
      .addEventListener("click", function () {
        deleteTask(task.id);
      });
    todoList.appendChild(listItem);
  });

  updateTaskCount();
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
  tasks.forEach((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
  });
  renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Function to complete all tasks
function completeAllTasks() {
  tasks.forEach((task) => (task.completed = true));
  renderTasks();
}

// Function to clear completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

// Function to show all tasks
function showAllTasks() {
  renderTasks();
}

// Function to show uncompleted tasks
function showUncompletedTasks() {
  const uncompletedTasks = tasks.filter((task) => !task.completed);
  renderFilteredTasks(uncompletedTasks);
}

// Function to show completed tasks
function showCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);
  renderFilteredTasks(completedTasks);
}

// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
  todoList.innerHTML = "";
  filteredTasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <label class="checkbox-wrapper">
        <input type="checkbox" class="checkbox" ${
          task.completed ? "checked" : ""
        } />
      </label>
      <span class="task-text ${task.completed ? "completed" : ""}">${
      task.text
    }</span>
      <button class="deleteButton">Delete</button>
    `;
    listItem.querySelector(".checkbox").addEventListener("change", function () {
      toggleTaskCompletion(task.id);
    });
    listItem
      .querySelector(".deleteButton")
      .addEventListener("click", function () {
        deleteTask(task.id);
      });
    todoList.appendChild(listItem);
  });

  updateTaskCount();
}

// Function to update task count
function updateTaskCount() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const uncompletedTasks = totalTasks - completedTasks;
  taskCount.textContent = `Total: ${totalTasks}, Completed: ${completedTasks}, Uncompleted: ${uncompletedTasks}`;
}

// Event listener for the add button
addButton.addEventListener("click", addTask);

// Event listener for the Enter key
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Event listener for the complete all button
completeAllButton.addEventListener("click", completeAllTasks);

// Event listener for the clear completed button
clearCompletedButton.addEventListener("click", clearCompletedTasks);

// Event listener for the show all button
showAllButton.addEventListener("click", showAllTasks);

// Event listener for the show uncompleted button
showUncompletedButton.addEventListener("click", showUncompletedTasks);

// Event listener for the show completed button
showCompletedButton.addEventListener("click", showCompletedTasks);
