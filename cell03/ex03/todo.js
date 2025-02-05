document.addEventListener("DOMContentLoaded", () => {
    const ftList = document.getElementById("ft_list");
    const newTaskButton = document.getElementById("newTask");
    
    // Load tasks from cookies
    loadTasks();

    newTaskButton.addEventListener("click", () => {
        const taskText = prompt("Enter a new TO DO:");
        if (taskText && taskText.trim() !== "") {
            addTask(taskText);
            saveTasks();
        }
    });

    function addTask(text) {
        const taskDiv = document.createElement("div");
        taskDiv.textContent = text;
        taskDiv.classList.add("task");
        
        taskDiv.addEventListener("click", () => {
            if (confirm("Do you really want to delete this TO DO?")) {
                taskDiv.remove();
                saveTasks();
            }
        });
        
        ftList.prepend(taskDiv);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#ft_list .task").forEach(task => {
            tasks.push(task.textContent);
        });
        document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/";
    }

    function loadTasks() {
        const cookies = document.cookie.split("; ");
        const taskCookie = cookies.find(row => row.startsWith("tasks="));
        if (taskCookie) {
            const taskList = JSON.parse(taskCookie.split("=")[1]);
            taskList.forEach(task => addTask(task));
        }
    }
});
