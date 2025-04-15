const taskForm = document.getElementById('taskForm');
const taskContainer = document.getElementById('taskContainer');

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const deadline = document.getElementById('taskDeadline').value;
  const priority = document.getElementById('taskPriority').value;

  const taskItem = document.createElement('li');
  taskItem.innerText = `${title} (Due: ${deadline}, Priority: ${priority})`;
  taskContainer.appendChild(taskItem);

  taskForm.reset();
});
