var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".add-button");
var incompleteTaskHolder=document.getElementById("tasks-list");
var completedTasksHolder=document.getElementById("completed-tasks");

var createNewTaskElement=function(taskString){
    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    listItem.className="tasks-list__item";
    label.innerText=taskString;
    label.className="task-label task";

    checkBox.type="checkbox";
    checkBox.className="checkbox"

    editInput.type="text";
    editInput.className="task-input";

    editButton.innerText="Edit";
    editButton.className="button edit";

    deleteButton.className="button delete";
    deleteButtonImg.src='./remove.svg';
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

    var editInput=listItem.querySelector(".task-input");
    var label=listItem.querySelector(".task");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("edit-mode");
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
        editInput.className="task-input";
        label.className="task-label task"
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
        editInput.className="task input task-input task-input--edit";
        label.className="task task--edit"
    }
    listItem.classList.toggle("edit-mode");
};


var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;

    ul.removeChild(listItem);

}

var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    var label=listItem.querySelector(".task");
    label.className="task task-label completed-task"
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    var listItem=this.parentNode;
    var label=listItem.querySelector(".task");
    label.className="task-label task"
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

    var checkBox=taskListItem.querySelector(".checkbox");
    var editButton=taskListItem.querySelector(".edit");
    var deleteButton=taskListItem.querySelector(".delete");

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
