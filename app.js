const taskInput = document.querySelector('.create-task__input');
const addButton = document.querySelector('.create-task__add-btn');
const incompleteTaskHolder = document.querySelector('.incomplete-tasks__list');
const completedTasksHolder = document.querySelector('.completed-tasks__list');

const createNewTaskElement = function(taskString){

  const listItem = document.createElement('li');
  listItem.className = 'task';

  const checkBox = document.createElement('input');
  checkBox.className = 'task__checkbox';
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.className = 'task__content';
  label.innerText = taskString;

  const editInput = document.createElement('input');
  editInput.className = 'input task__input'
  editInput.type = 'text';

  const editButton = document.createElement('button');
  editButton.className = 'button task__edit-btn'
  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.


  const deleteButton = document.createElement('button');
  deleteButton.className = 'button task__delete-btn';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'button__icon'

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}



const addTask = function(){
  console.log('Add Task...');
  // Create a new list item with the text from the .new-task__input:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

const editTask = function(){
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");


  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector('.task__content');
  const editBtn = listItem.querySelector('.task__edit-btn');
  const containsClass = listItem.classList.contains('task_editing');

  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task_editing');
};


const deleteTask = function(){
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}


const taskCompleted = function(){
  console.log('Complete Task...');

  // Append the task list item to the .completed-tasks__list
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function(){
  console.log('Incomplete Task...');
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function(){
  console.log('AJAX Request');
}

addButton.onclick = addTask;
addButton.addEventListener('click',addTask);
addButton.addEventListener('click',ajaxRequest);


const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log('bind list item events');
  // select ListItems children
  const checkBox = taskListItem.querySelector('.task__checkbox');
  const editButton = taskListItem.querySelector('.task__edit-btn');
  const deleteButton = taskListItem.querySelector('.task__delete-btn');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
