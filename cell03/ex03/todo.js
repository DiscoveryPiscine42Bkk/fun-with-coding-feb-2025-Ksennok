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

    // บันทึก todos เป็น JSON ใน cookie โดยไม่เข้ารหัส
    document.cookie = "todos=" + JSON.stringify(todos) + "; path=/; expires=" + new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toUTCString();
}

function loadTodos() {
    let cookies = document.cookie.split("; ");
    let todosCookie = cookies.find(cookie => cookie.startsWith("todos="));

    if (todosCookie) {
        // ถอดรหัสค่าจาก cookie และแปลงกลับเป็น array
        let todos = JSON.parse(todosCookie.split("=")[1]);
        todos.forEach(task => createTodo(task));
    }
}