function logout() {
  window.location.href = "../auth/logout.php";
}

async function fetchTasks() {
  const response = await fetch("../logic/get_tasks.php");
  const tasks = await response.json();
  const tbody = document.querySelector("#taskTable tbody");
  const userSelect = document.getElementById("userFilter");

  const users = new Set();
  tbody.innerHTML = "";
  tasks.forEach((task) => {
    users.add(task.username);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.title}</td>
      <td>${task.deadline}</td>
      <td>${task.priority}</td>
      <td style="text-align:center;">${task.status}</td>
      <td><button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
  
  if (userSelect.children.length === 1) {
    users.forEach((username) => {
      const option = document.createElement("option");
      option.value = username;
      option.textContent = username;
      userSelect.appendChild(option);
    });
  }
}


async function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    const response = await fetch("../logic/delete_task.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    if (result.success) fetchTasks();
    else alert("Failed to delete task.");
  }
}

function applyFilters() {
  const user = document.getElementById("userFilter").value;
  const status = document.getElementById("statusFilter").value;
  const priority = document.getElementById("priorityFilter").value;
  const deadline = document.getElementById("deadlineFilter").value;

  fetch("../logic/get_tasks.php")
    .then((res) => res.json())
    .then((tasks) => {
      const filtered = tasks.filter((task) => {
        return (
          (user === "All" || task.username === user) &&
          (status === "All" || task.status === status) &&
          (priority === "All" || task.priority === priority) &&
          (!deadline || task.deadline <= deadline)
        );
      });

      const tbody = document.querySelector("#taskTable tbody");
      tbody.innerHTML = "";
      filtered.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${task.id}</td>
          <td>${task.title}</td>
          <td>${task.deadline}</td>
          <td>${task.priority}</td>
          <td style="text-align:center;">${task.status}</td>
          <td><button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button></td>
        `;
        tbody.appendChild(row);
      });
    });
}


fetchTasks();
