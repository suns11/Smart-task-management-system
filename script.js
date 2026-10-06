// Example JavaScript (future task management logic will go here)
// Login
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Logged in successfully!");
    window.location.href = "dashboard.html";
  });
  
  // Register
  document.getElementById("registerForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Registered successfully!");
    window.location.href = "login.html";
  });
  
  // Create Task
  document.getElementById("createTaskForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const desc = document.getElementById("taskDesc").value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, desc });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Task Created!");
    window.location.href = "dashboard.html";
  });
  
  // Dashboard - Display tasks
  // [Already previous codes here...]

// Dashboard - Display tasks with search feature
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

function loadTasks(filter = "") {
  if(taskList) {
    taskList.innerHTML = ""; // clear previous
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
      if(task.title.toLowerCase().includes(filter.toLowerCase())) {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
          <div>
            <strong>${task.title}</strong><br/>
            <small>${task.desc}</small>
          </div>
          <div class="actions">
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      }
    });
  }
}

// Initial load
loadTasks();

// Search Functionality
if(searchInput){
  searchInput.addEventListener("input", function() {
    loadTasks(this.value);
  });
}

  
  // Delete Task
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.location.reload();
  }
  
  // Edit Task (Basic Redirect)
  function editTask(index) {
    localStorage.setItem("editTaskIndex", index);
    window.location.href = "edit-task.html";
  }
  
  // Edit Task - Pre-fill form
  document.getElementById("editTaskForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const index = localStorage.getItem("editTaskIndex");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].title = document.getElementById("editTaskTitle").value;
    tasks[index].desc = document.getElementById("editTaskDesc").value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.removeItem("editTaskIndex");
    alert("Task Updated!");
    window.location.href = "dashboard.html";
  });
  
  // Edit Task - Load Existing Data
  const editTaskTitle = document.getElementById("editTaskTitle");
  const editTaskDesc = document.getElementById("editTaskDesc");
  if(editTaskTitle && editTaskDesc){
    const index = localStorage.getItem("editTaskIndex");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if(tasks[index]){
      editTaskTitle.value = tasks[index].title;
      editTaskDesc.value = tasks[index].desc;
    }
  }
  