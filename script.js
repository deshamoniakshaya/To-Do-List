let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const themeToggle = document.getElementById("themeToggle");

function updateTaskCounter(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const remaining = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    remainingTasks.textContent = remaining;

}

function searchTasks(){

    const searchText = searchInput.value.toLowerCase();


    const allTasks = document.querySelectorAll("#taskList li");


    allTasks.forEach(function(task){

        const text = task.querySelector("span").textContent.toLowerCase();


        if(text.includes(searchText)){

            task.style.display = "flex";

        }
        else{

            task.style.display = "none";

        }

    });

}

addBtn.addEventListener("click", addTask);
searchInput.addEventListener("input", searchTasks);
themeToggle.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

});
taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        addTask();

    }

});



function createTaskElement(task){


    const li = document.createElement("li");

    if(!task.createdAt){

    task.createdAt = "Old task";

}

   li.innerHTML = `
    <div>
        <span>${task.text}</span>
        <small>Created: ${task.createdAt}</small>
    </div>

    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
`;


    taskList.appendChild(li);


    if(task.completed){

        li.classList.add("completed");

    }



    li.addEventListener("click", function(event){


        if(
            event.target.classList.contains("deleteBtn") ||
            event.target.classList.contains("editBtn")
        ){

            return;

        }


        li.classList.toggle("completed");


        task.completed = li.classList.contains("completed");


        localStorage.setItem("tasks", JSON.stringify(tasks));


        updateTaskCounter();


    });



    const deleteBtn = li.querySelector(".deleteBtn");


    deleteBtn.addEventListener("click", function(event){


        event.stopPropagation();


        tasks = tasks.filter(t => t !== task);


        localStorage.setItem("tasks", JSON.stringify(tasks));


        li.remove();


        updateTaskCounter();


    });



    const editBtn = li.querySelector(".editBtn");


    editBtn.addEventListener("click", function(event){


        event.stopPropagation();


        const newTask = prompt("Edit your task:", task.text);



        if(newTask !== null && newTask.trim() !== ""){


            task.text = newTask.trim();


            li.querySelector("span").textContent = task.text;


            localStorage.setItem("tasks", JSON.stringify(tasks));


        }


    });


}




function addTask(){


    const taskText = taskInput.value.trim();



    if(taskText === ""){

        alert("Please enter a task!");

        return;

    }



   const task = {

    text: taskText,

    completed:false,

    createdAt: new Date().toLocaleString()

};

    tasks.push(task);



    localStorage.setItem("tasks", JSON.stringify(tasks));



    createTaskElement(task);



    updateTaskCounter();



    taskInput.value = "";

}




window.onload = function(){


    const savedTasks = JSON.parse(localStorage.getItem("tasks"));



    if(savedTasks){


        tasks = savedTasks;



        tasks.forEach(function(task){

            createTaskElement(task);

        });


    }



    updateTaskCounter();


};