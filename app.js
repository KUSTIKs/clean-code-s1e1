var taskInput=document.querySelector(".create-task__input");
var addButton=document.querySelector(".create-task__add-btn");
var incompleteTaskHolder=document.querySelector(".incomplete-tasks__list");
var completedTasksHolder=document.querySelector(".completed-tasks__list");

var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className = 'task';

    var checkBox=document.createElement("input");
    checkBox.className = 'task__checkbox';
    checkBox.type="checkbox";
    
    var label=document.createElement("label");
    label.className = 'task__content';
    label.innerText=taskString;
    
    var editInput=document.createElement("input");
    editInput.className = 'input task__input'
    editInput.type="text";
    
    var editButton=document.createElement("button");
    editButton.className = 'button task__edit-btn'
    editButton.innerText="Edit"; // innerText encodes special characters, HTML does not.

    
    var deleteButton=document.createElement("button");
    deleteButton.className = 'button task__delete-btn';
    
    var deleteButtonImg=document.createElement("img");
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className = 'button__icon'

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    // Create a new list item with the text from the .new-task__input:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task__input');
    var label=listItem.querySelector(".task__content");
    var editBtn=listItem.querySelector(".task__edit-btn");
    var containsClass=listItem.classList.contains("task_editing");
    
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("task_editing");
};


var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}


var taskCompleted=function(){
    console.log("Complete Task...");

    // Append the task list item to the .completed-tasks__list
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    // select ListItems children
    var checkBox=taskListItem.querySelector(".task__checkbox");
    var editButton=taskListItem.querySelector(".task__edit-btn");
    var deleteButton=taskListItem.querySelector(".task__delete-btn");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
