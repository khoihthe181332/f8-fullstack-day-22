const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#todo-input');
const tasksList = document.querySelector('#task-list');
// console.log(taskForm, taskInput, taskName);

// lấy dữ diệu 
const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

taskForm.onsubmit = (e) => {
    e.preventDefault();
    const newTask = {
        name: taskInput.value,
        isCompleted: false,
    };

    // kiểm tra trống
    if (!newTask.name) {
        alert("Chưa nhập task");
        return;
    }

    // Kiểm tra lần nhập sau có bị trùng với lần nhập trước k
    const valid = tasks.find(task => {
        return task.name.toLowerCase().trim() === taskInput.value.toLowerCase().trim();
    });

    if (valid) {
        alert("Task đã tồn tại");
        taskInput.value = "";
        return;
    }

    // thêm task vào đầu danh sách
    tasks.unshift(newTask);

    // lưu vào storeage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // render task
    renderTasks();

    taskInput.value = "";
}

// Tránh lỗi XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderTasks() {
    const html = tasks.map(task => {
        if (task.name) {
            return `
                <li class="task-item${task.isCompleted ? ' completed' : ''}">
                    <span class="task-title">${escapeHTML(task.name)}</span>
                    <div class="task-action">
                        <button class="task-btn edit">Edit</button>
                        <button class="task-btn done">Mark as done</button>
                        <button class="task-btn delete">Delete</button>
                    </div>
                </li>
            `;
        }
    }).join("");

    tasksList.innerHTML = html;
}

renderTasks();


