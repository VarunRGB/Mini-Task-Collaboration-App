document.addEventListener("DOMContentLoaded", fetchTasks);

document.getElementById("taskForm").addEventListener("submit", async function (e) {
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

  const container = document.getElementById("taskContainer");
  container.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.title} (Deadline: ${task.deadline}, Priority: ${task.priority})`;
    container.appendChild(li);
  });
}
