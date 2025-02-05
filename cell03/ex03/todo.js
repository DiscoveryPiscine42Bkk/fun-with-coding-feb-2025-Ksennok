window.onload = function() {
    loadTodos();
};

function addTodo() {
    let task = prompt("Enter a new task:");
    if (task) {
        createTodo(task);
        saveTodos();
    }
}

function createTodo(task) {
    let list = document.getElementById("ft_list");
    let todo = document.createElement("div");
    todo.className = "todo";
    todo.textContent = task;

    todo.onclick = function() {
        if (confirm("Do you want to delete this task?")) {
            this.remove();
            saveTodos();
        }
    };

    list.insertBefore(todo, list.firstChild);
}


function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.textContent);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(task => createTodo(task));
}