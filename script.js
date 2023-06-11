
    const taskNameInput = document.getElementById("taskName");
    const taskNameButton = document.getElementById("taskNameButton");
    const taskList = document.getElementById("taskList");
    const numberOfTasks = document.getElementById("numberOfTasks");
    const completeAllButton = document.getElementById("completeAllTask");
    const clearCompletedButton = document.getElementById("clearCompleted");
    const showAllTask = document.getElementById("showAllTasks");
    const completedTask = document.getElementById("completedTask");
    const listStatus = document.getElementById("listStatus");
    let taskCount = 0;
  
    function addTask() {
      const taskName = taskNameInput.value;
      if (taskName.trim() !== "") {
        const newTaskItem = document.createElement("li");
        const listItemDiv = document.createElement("div");
        listItemDiv.className = "listItem";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const label = document.createElement("label");
        label.textContent = taskName;
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteTaskButton";
        deleteButton.innerHTML = "&#9587;";
        listItemDiv.appendChild(checkbox);
        listItemDiv.appendChild(label);
        listItemDiv.appendChild(deleteButton);
        newTaskItem.appendChild(listItemDiv);
        taskList.appendChild(newTaskItem);
        taskNameInput.value = ""; // Clear the input field
        taskCount++;
        numberOfTasks.textContent = taskCount;
      }
    }
    taskNameButton.addEventListener("click",addTask);
    taskNameInput.addEventListener("keydown",function(event){
      if(event.key=="Enter"){1
        event.preventDefault();
        addTask();
      }
    });
  
    // Get all delete buttons
    const deleteButtons = document.querySelectorAll('#taskList .deleteTaskButton');
  
    // Add click event listener to each delete button
    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Find the parent <li> element and remove it
        const listItem = button.closest('li');
        if (listItem) {
          listItem.remove();
          taskCount--;
          numberOfTasks.textContent = taskCount;
        }
      });
    });
  
    // window.addEventListener('DOMContentLoaded', () => {
        // Get the Incomplete button
        const incompleteButton = document.getElementById('incompleteTask');
      
        // Add click event listener to the Incomplete button
        incompleteButton.addEventListener('click', () => {
          // Get all list items
          const listItems = document.querySelectorAll('#taskList li');
      
          // Loop through the list items and toggle their visibility based on text-decoration property
          listItems.forEach((item) => {
            const label = item.querySelector('label');
            const computedStyle = getComputedStyle(label);
            const textDecoration = computedStyle.getPropertyValue('text-decoration');
            if (label && !textDecoration.includes('line-through')) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
          listStatus.textContent=' Incomplete Task List';
        });
      // });

      completedTask.addEventListener('click',()=>{
        const listItems = document.querySelectorAll('#taskList li');
      
        // Loop through the list items and toggle their visibility based on text-decoration property
        listItems.forEach((item) => {
          const label = item.querySelector('label');
          const computedStyle = getComputedStyle(label);
          const textDecoration = computedStyle.getPropertyValue('text-decoration');
          if (label && textDecoration.includes('line-through')) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        listStatus.textContent= 'Completed Task List ';
      });
      
      showAllTask.addEventListener('click',()=>{

        const listItems = document.querySelectorAll('#taskList li');
        listItems.forEach((item) => {
          const label = item.querySelector('label');
          item.style.display = 'block';  
        });
        listStatus.textContent=" All Task List ";
      });



      
  
    // Add click event listener to the Complete All Tasks button
    completeAllButton.addEventListener('click', () => {
      // Get all checkboxes
      const checkboxes = document.querySelectorAll('#taskList input[type="checkbox"]');
  
      // Set the "checked" property of each checkbox to true
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    });
  
    // Add click event listener to the Clear Completed button
    clearCompletedButton.addEventListener('click', () => {
      // Get all list items with checked checkboxes
      const completedItems = document.querySelectorAll('#taskList li input[type="checkbox"]:checked');
  
      // Remove the parent <li> element of each completed item
      completedItems.forEach((item) => {
        const listItem = item.closest('li');
        if (listItem) {
          listItem.remove();
          taskCount--;
          numberOfTasks.textContent = taskCount;
        }
      });
    });
  
  
