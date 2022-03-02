var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

//Handler for creating tasks
function taskFormHandler(event) {
    //Prevent default behavior for events
    event.preventDefault();

    //Variables
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("Please ensure you enter a task name and select a task type.");
        return false;
    }

    formEl.reset();

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

    //Task ID as custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //Create div to contain task and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //Add list item to list
    tasksToDoEl.appendChild(listItemEl);

    //Increase task taskIdCounter
    taskIdCounter++;
}

function createTaskActions(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(editButtonEl);

    //Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskID);

    actionContainerEl.appendChild(deleteButtonEl);

    //Create status select
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    var statusChoices = ["To Do", "Doing", "Done"];

    for (var i = 0; i < statusChoices.length; i++) {
        //Create option element
        var statusOptionEl = document.createElement("Option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //Append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

function taskButtonHandler(event) {
    //Get target element from events
    var targetEl = event.target;

    //Edit button clicked
    if (targetEl.matches(".edit-btn")) {
        var taskID = targetEl.getAttribute("data-task-id");
        editTask(taskID);
    }
    //Delete button clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskID = targetEl.getAttribute("data-task-id");
        deleteTask(taskID);
    }
}

function deleteTask(taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    taskSelected.remove();
}

function editTask(taskID) {
    //Get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    //Get task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskID);
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

