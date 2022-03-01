var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//Handler for creating tasks
function taskFormHandler(event) {
    //Prevent default behavior for events
    event.preventDefault();

    //Variables
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //Place task data in object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //Send object to createTaskEl()
    createTaskEl(taskDataObj);
}

function createTaskEl(taskDataObj) {
    //Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //Create div to contain task and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //Add list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);

