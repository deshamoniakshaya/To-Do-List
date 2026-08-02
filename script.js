let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

function updateTaskCounter(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const remaining = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    remainingTasks.textContent = remaining;

}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});

function addTask(){

    const task = taskInput.value.trim();

    if(task === ""){
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task}</span>
        <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);

    tasks.push({
    text: task,
    completed: false
});

localStorage.setItem("tasks", JSON.stringify(tasks));

updateTaskCounter();

    taskInput.value = "";

   li.addEventListener("click", function(event){

    if(event.target.classList.contains("deleteBtn")) return;

    li.classList.toggle("completed");

    const index = tasks.findIndex(t => t.text === task);

    if(index !== -1){

        tasks[index].completed = li.classList.contains("completed");

        localStorage.setItem("tasks", JSON.stringify(tasks));

        updateTaskCounter();

    }

});

    const deleteBtn = li.querySelector(".deleteBtn");

  deleteBtn.addEventListener("click", function(){

    tasks = tasks.filter(t => t.text !== task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    updateTaskCounter();

    li.remove();

});

}
window.onload = function(){

    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(savedTasks){

        tasks = savedTasks;

        tasks.forEach(function(task){

            const li = document.createElement("li");

            li.innerHTML = `
    <span>${task.text}</span>
    <button class="deleteBtn">Delete</button>
`;
            taskList.appendChild(li);

            if(task.completed){
    li.classList.add("completed");
}

            li.addEventListener("click", function(event){

    if(event.target.classList.contains("deleteBtn")) return;

    li.classList.toggle("completed");

    task.completed = li.classList.contains("completed");

    localStorage.setItem("tasks", JSON.stringify(tasks));

    updateTaskCounter();

});

            const deleteBtn = li.querySelector(".deleteBtn");

            deleteBtn.addEventListener("click", function(){

                tasks = tasks.filter(t => t.text !== task.text);

                localStorage.setItem("tasks", JSON.stringify(tasks));

                li.remove();

                updateTaskCounter();
            });

        });

    }

     updateTaskCounter();
};