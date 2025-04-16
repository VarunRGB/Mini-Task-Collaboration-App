document.addEventListener("DOMContentLoaded", fetchTasks);

document
  .getElementById("taskForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const deadline = document.getElementById("taskDeadline").value;
    const priority = document.getElementById("taskPriority").value;

    const response = await fetch("add_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, deadline, priority }),
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById("taskForm").reset();
      fetchTasks();
    } else {
      alert(result.error || "Failed to add task");
    }
  });

  async function fetchTasks() {
    const response = await fetch("get_user_tasks.php");
    const tasks = await response.json();
  
    if (Array.isArray(tasks)) {
      renderUserTasks(tasks);
    } else {
      console.error("Unexpected task format", tasks);
    }
  }
  

function logout() {
  window.location.href = "logout.php";
}

function renderUserTasks(tasks) {
  const taskList = document.getElementById('userTaskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const row = document.createElement('tr');

    // Status column: simple black text
    const statusText = task.status;

    // Mark as Completed column: fancy checkbox
    const markCompletedContent =
      task.status === "Completed"
        ? `<label class="checkbox-container">
             <input type="checkbox" checked disabled>
             <span class="checkmark"></span>
           </label>`
        : `<label class="checkbox-container">
             <input type="checkbox" onchange="markCompleted(${task.id}, this)">
             <span class="checkmark"></span>
           </label>`;

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.deadline}</td>
      <td>${task.priority}</td>
      <td class="status-cell">${statusText}</td>
      <td>${markCompletedContent}</td>
      <td>
        <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

async function markCompleted(id, checkbox) {
  const response = await fetch("update_status.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task_id: id, status: "Completed" })
  });

  const result = await response.json();
  if (result.success) {
    checkbox.checked = true;
    checkbox.disabled = true;

    const row = checkbox.closest("tr");
    const statusCell = row.querySelector(".status-cell");
    if (statusCell) {
      statusCell.textContent = "Completed";
    }
  } else {
    alert(result.error || "Failed to update task status");
    checkbox.checked = false;
  }
}

function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  fetch("delete_task_user.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task_id: id }),
  })
  .then(response => response.json())
  .then(result => {
    if (result.success) {
      fetchTasks();
    } else {
      alert(result.error || "Failed to delete task");
    }
  });
}


function editTask(id) {
  const row = [...document.querySelectorAll("#userTaskList tr")].find(r =>
    r.querySelector("button")?.getAttribute("onclick") === `editTask(${id})`
  );

  if (!row) return;

  // Get current task values
  const [titleCell, deadlineCell, priorityCell, actionCell] = row.children;
  const currentTitle = titleCell.textContent;
  const currentDeadline = deadlineCell.textContent;
  const currentPriority = priorityCell.textContent;

  // Replace row cells with input fields
  titleCell.innerHTML = `<input type="text" value="${currentTitle}" class="edit-title">`;
  deadlineCell.innerHTML = `<input type="date" value="${currentDeadline}" class="edit-deadline">`;
  priorityCell.innerHTML = `
    <select class="edit-priority">
      <option value="High" ${currentPriority === "High" ? "selected" : ""}>High</option>
      <option value="Medium" ${currentPriority === "Medium" ? "selected" : ""}>Medium</option>
      <option value="Low" ${currentPriority === "Low" ? "selected" : ""}>Low</option>
    </select>
  `;

  actionCell.innerHTML = `
    <button class="save-btn" style="background-color: green; color: white;">Save</button>
    <button class="cancel-btn" style="background-color: gray; color: white;">Cancel</button>
  `;

  // Add event listeners
  const saveBtn = actionCell.querySelector(".save-btn");
  const cancelBtn = actionCell.querySelector(".cancel-btn");

  cancelBtn.addEventListener("click", fetchTasks); // reset the table

  saveBtn.addEventListener("click", async () => {
    const updatedTitle = titleCell.querySelector(".edit-title").value;
    const updatedDeadline = deadlineCell.querySelector(".edit-deadline").value;
    const updatedPriority = priorityCell.querySelector(".edit-priority").value;

    const response = await fetch("edit_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_id: id,
        title: updatedTitle,
        deadline: updatedDeadline,
        priority: updatedPriority,
      }),
    });

    const result = await response.json();
    if (result.success) {
      fetchTasks();
    } else {
      alert(result.error || "Failed to update task");
    }
  });
}
