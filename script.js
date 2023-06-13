document.addEventListener("DOMContentLoaded", retrieveTaskList);
const taskNameInput = document.getElementById("taskName");
const taskNameButton = document.getElementById("taskNameButton");
const taskList = document.getElementById("taskList");
const numberOfTasks = document.getElementById("numberOfTasks");
const completeAllButton = document.getElementById("completeAllTask");
const clearCompletedButton = document.getElementById("clearCompleted");
const showAllTask = document.getElementById("showAllTasks");
const completedTask = document.getElementById("completedTask");
const listStatus = document.getElementById("listStatus");
const taskDateValue = document.getElementById("taskDate");
// Get all delete buttons
const deleteButtons = document.querySelectorAll(".deleteTaskButton");

// Counter for tasks
let taskCount = 0;

// Get the Incomplete button
const incompleteButton = document.getElementById("incompleteTask");

document.getElementById("taskDate").valueAsDate = new Date();

function saveTaskList() {
  localStorage.setItem("taskList", taskList.innerHTML);
}

function retrieveTaskList() {
  const savedTaskList = localStorage.getItem("taskList");
  if (savedTaskList) {
    taskList.innerHTML = savedTaskList;
    taskCount = taskList.getElementsByTagName("li").length;
    numberOfTasks.textContent = taskCount;
    toggleCheckbox();
  }
}

function toggleCheckbox(){
  const listItems = document.querySelectorAll("#taskList li");
  listItems.forEach((item)=>{
    const checkboxValue = item.querySelector('#taskList input[type="checkbox"]');
    const label = item.querySelector("label");
    const computedStyle = getComputedStyle(label);
    const textDecoration = computedStyle.getPropertyValue("text-decoration");
    if (label && textDecoration.includes("line-through")) {
     checkboxValue.checked=true;
    } else {
      checkboxValue.checked=false;
    }
  });
}

// Common function so that on click button and keyboard enter will add task in list
function addTask() {
  const taskName = taskNameInput.value;
  const taskDate = taskDateValue.value;
  if (taskName.trim() !== "") {
    // Check whether the same task exists
    const taskExists = Array.from(taskList.getElementsByTagName("label")).some(
      (label) => label.textContent === taskName
    );
    if (taskExists) {
      alert("Task already exists!");
      return;
    }
    if (taskDate.trim() == "") {
      alert("Please enter valid date");
      return;
    }
    const newTaskItem = document.createElement("li");
    const listItemDiv = document.createElement("div");
    listItemDiv.className = "listItem";
    const checkbox = document.createElement("input");
    checkbox.id="checkboxToggler";
    checkbox.type = "checkbox";
    const label = document.createElement("label");
    label.textContent = taskName;
    const dateLabel = document.createElement("label");
    dateLabel.textContent = taskDate;
    dateLabel.className="dateOfTask";
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteTaskButton";
    // Set the inner HTML of the delete button to a cross symbol
    // deleteButton.innerHTML = "&#9587;";
    deleteButton.innerHTML = "&#9587;";
    // Add elements to the task item div
    listItemDiv.appendChild(checkbox);
    listItemDiv.appendChild(label);
    listItemDiv.appendChild(dateLabel);
    listItemDiv.appendChild(deleteButton);

    // Add the div to the task item
    newTaskItem.appendChild(listItemDiv);

    // Add the task item to the task list
    taskList.appendChild(newTaskItem);
    taskNameInput.value = "";
    taskCount++;
    numberOfTasks.textContent = taskCount;
    saveTaskList();
  } else {
    alert("Please enter task");
    return;
  }
}


// Event listener for checkbox toggle
taskList.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const listItem = event.target.closest("li");
    const label = listItem.querySelector("label");
    //const taskDate = listItem.querySelector(".taskDate");
    label.style.textDecoration = event.target.checked ? "line-through" : "none";
    //taskDate.style.textDecoration = event.target.checked ? "line-through" : "none";
    saveTaskList();
  }
});


// Event listener to handle the "Add Task" button click
taskNameButton.addEventListener("click", addTask);

// Event listener to handle keyboard enter key press in the input box
taskNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

// Function to delete a task
function deleteTask() {
  // Get the parent <li> element of the delete button
  const listItem = this.parentElement.parentElement;
  // Remove the task from the task list
  listItem.remove();
  taskCount--;
  numberOfTasks.textContent = taskCount;
  saveTaskList();
  alert("Task deleted successfully");
}

// Event listener to handle task deletion when the delete button is clicked
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteTaskButton")) {
    deleteTask.call(event.target);
  }
});

// Event listener to show only incomplete tasks
incompleteButton.addEventListener("click", () => {
  // Get all list items in the task list
  const listItems = document.querySelectorAll("#taskList li");
  let count = 0;

  listItems.forEach((item) => {
    // Get the label element inside the list item
    const label = item.querySelector("label");
    const computedStyle = getComputedStyle(label);
    const textDecoration = computedStyle.getPropertyValue("text-decoration");

    if (label && !textDecoration.includes("line-through")) {
      item.style.display = "block";
      count++;
    } else {
      item.style.display = "none";
    }
  });
  if (count === 0) {
    alert("No Task is Pending");
  }
  listStatus.textContent = "Incomplete Task List";
});

// Event listener to show only completed tasks from the list
completedTask.addEventListener("click", () => {
  // Get all list items in the task list
  const listItems = document.querySelectorAll("#taskList li");
  let count = 0;

  listItems.forEach((item) => {
    // Get the label element inside the list item
    const label = item.querySelector("label");
    const computedStyle = getComputedStyle(label);
    const textDecoration = computedStyle.getPropertyValue("text-decoration");

    // only show the task which are completed
    if (label && textDecoration.includes("line-through")) {
      item.style.display = "block";
      count++;
    } else {
      item.style.display = "none";
    }
  });
  if (count == 0) {
    alert("No Task is Completed yet");
  }
  listStatus.textContent = "Completed Task List";
});

// Event listener to show all tasks
showAllTask.addEventListener("click", () => {
  // Get all list items in the task list
  const listItems = document.querySelectorAll("#taskList li");

  // Loop through the list items and set their display property to "block" to show them
  listItems.forEach((item) => {
    item.style.display = "block";
  });

  listStatus.textContent = "All Task List";
});

// Event listener to mark all tasks as complete
completeAllButton.addEventListener("click", () => {
  // Get all checkboxes in the task list
  const checkboxes = document.querySelectorAll(
    '#taskList input[type="checkbox"]'
  );

  if (checkboxes.length < 1) {
    alert("No task in list");
    return;
  }
  // Set the "checked" property of each checkbox to true
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });

  alert("All tasks set as completed");
  saveTaskList();
});

// Event listener to clear all completed tasks
clearCompletedButton.addEventListener("click", () => {
  // Get all completed items (checkboxes checked) in the task list
  const completedItems = document.querySelectorAll(
    '#taskList li input[type="checkbox"]:checked'
  );
  let count = 0;
  // Remove the parent <li> element of each completed item
  completedItems.forEach((item) => {
    const listItem = item.closest("li");
    if (listItem) {
      listItem.remove();
      taskCount--;
      numberOfTasks.textContent = taskCount;
      count++;
    }
  });

  if (count == 0) {
    alert("No task is completed to clear");
  } else {
    alert("All completed tasks are deleted");
    saveTaskList();
  }
});
