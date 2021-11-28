const taskInput = document.querySelector('.create-task__input');
const addButton = document.querySelector('.create-task__add-btn');
const incompleteTaskHolder = document.querySelector('.incomplete-tasks__list');
const completedTasksHolder = document.querySelector('.completed-tasks__list');

function createNewTaskElement(taskString) {
  const task = document.createElement('li');
  task.className = 'task';

  const checkbox = document.createElement('input');
  checkbox.className = 'task__checkbox';
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.className = 'task__content';
  label.innerText = taskString;

  const editInput = document.createElement('input');
  editInput.className = 'input task__input';
  editInput.type = 'text';

  const editButton = document.createElement('button');
  editButton.className = 'button task__edit-btn';
  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.

  const deleteButton = document.createElement('button');
  deleteButton.className = 'button task__delete-btn';

  const deleteButtonIcon = document.createElement('img');
  deleteButtonIcon.src = './remove.svg';
  deleteButtonIcon.className = 'button__icon';

  deleteButton.appendChild(deleteButtonIcon);

  task.append(checkbox, label, editInput, editButton, deleteButton);

  return task;
}

function addTask() {
  console.log('Add Task...');
  // Create a new list item with the text from the .new-task__input:
  if (!taskInput.value) return;

  const task = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, taskCompleted);

  taskInput.value = '';
}

function editTask() {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const taskInput = listItem.querySelector('.task__input');
  const taskContent = listItem.querySelector('.task__content');
  const editButton = listItem.querySelector('.task__edit-btn');
  const isEditing = listItem.classList.contains('task_editing');

  if (isEditing) {
    taskContent.innerText = taskInput.value;
    editButton.innerText = 'Edit';
  } else {
    taskInput.value = taskContent.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('task_editing');
}

function deleteTask(e) {
  console.log('Delete Task...');
  e.target.closest('.task')?.remove()
}

function taskCompleted(e) {
  console.log('Complete Task...');

  // Append the task list item to the .completed-tasks__list
  const task = e.target.closest('.task');
  completedTasksHolder.appendChild(task);
  bindTaskEvents(task, taskIncomplete);
}

function taskIncomplete(e) {
  console.log('Incomplete Task...');

  const task = e.target.closest('.task');
  incompleteTaskHolder.appendChild(task);
  bindTaskEvents(task, taskCompleted);
}

function ajaxRequest() {
  console.log('AJAX Request');
}

addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

function bindTaskEvents(taskListItem, checkboxEventHandler) {
  console.log('bind list item events');
  // select ListItems children
  const checkbox = taskListItem.querySelector('.task__checkbox');
  const editButton = taskListItem.querySelector('.task__edit-btn');
  const deleteButton = taskListItem.querySelector('.task__delete-btn');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
