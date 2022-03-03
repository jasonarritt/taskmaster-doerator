var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIDCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

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

    var isEdit = formEl.hasAttribute("data-task-id");

    //Place task data in object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };

    //Send object to createTaskEl()
    if (isEdit) {
        var taskID = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskID);
    }

    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

    createTaskEl(taskDataObj);
    }

}

function completeEditTask(taskName, taskType, taskID) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //Loop through task array and task object
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].ID === parseInt(taskID)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        };
    }

    alert("Task Updated");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Save Task";

    saveTasks();
}

function createTaskEl(taskDataObj) {
    //Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //Task ID as custom attribute
    listItemEl.setAttribute("data-task-id", taskIDCounter);

    //Create div to contain task and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIDCounter);
    listItemEl.appendChild(taskActionsEl);

    //Add list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.ID = taskIDCounter;

    tasks.push(taskDataObj);

    //Increase task taskIDCounter
    taskIDCounter++;

    saveTasks();
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

    //New array to hold updated tasks
    var updatedTaskArr = [];

    //Loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskID)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;

    saveTasks();
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

function taskStatusChangeHandler(event) {
    //Get task id
    var taskID = event.target.getAttribute("data-task-id");

    //Get selected options and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //Find parent task element based on id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "doing") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "done") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //Update tasks in array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskID)) {
            tasks[i].status = statusValue;
        };
    }

    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
        return false;
    }
    tsavedTasks = JSON.parse(savedTasks);

    for (var i = 0; i < savedTasks.length; i++) {
        createTaskEl(savedTasks[i]);

    }
}

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();