let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

function updateTaskCounter() {

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;
}

function searchTasks() {

    const searchText = searchInput.value.toLowerCase();

    const allTasks = document.querySelectorAll("#taskList li");

    allTasks.forEach(function (taskItem) {

        const text = taskItem.querySelector("span").textContent.toLowerCase();

        if (text.includes(searchText)) {
            taskItem.style.display = "flex";
        } else {
            taskItem.style.display = "none";
        }

    });

}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

});

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

searchInput.addEventListener("input", searchTasks);

function createTaskElement(task) {

    if (!task.createdAt) {
        task.createdAt = new Date().toLocaleString();
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <div>
            <span>${task.text}</span><br>
            <small>Created: ${task.createdAt}</small>
        </div>

        <button class="editBtn">✏️</button>
        <button class="deleteBtn">🗑️</button>
    `;

    taskList.appendChild(li);

    if (task.completed) {
        li.classList.add("completed");
    }

    // Complete Task
    li.addEventListener("click", function (event) {

        if (
            event.target.classList.contains("editBtn") ||
            event.target.classList.contains("deleteBtn")
        ) {
            return;
        }

        li.classList.toggle("completed");

        task.completed = li.classList.contains("completed");

        localStorage.setItem("tasks", JSON.stringify(tasks));

        updateTaskCounter();

    });

    // Edit Task
    const editBtn = li.querySelector(".editBtn");

    editBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        const newTask = prompt("Edit your task:", task.text);

        if (newTask !== null && newTask.trim() !== "") {

            task.text = newTask.trim();

            li.querySelector("span").textContent = task.text;

            localStorage.setItem("tasks", JSON.stringify(tasks));

        }

    });

    // Delete Task
    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        tasks = tasks.filter(t => t !== task);

        localStorage.setItem("tasks", JSON.stringify(tasks));

        li.remove();

        updateTaskCounter();

    });

}

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }

    const task = {

        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString()

    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(task);

    updateTaskCounter();

    taskInput.value = "";

}

window.onload = function () {

    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {

        tasks = savedTasks;

        tasks.forEach(function (task) {

            createTaskElement(task);

        });

    }

    updateTaskCounter();

};