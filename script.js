const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

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

    taskInput.value = "";

    const deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", function(){
        li.remove();
    });

}