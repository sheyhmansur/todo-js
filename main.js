let form = document.getElementById("addForm");
let itemsList = document.getElementById("items");
let filter = document.getElementById("filter");


form.addEventListener("submit", addItem);
itemsList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);


// Создание нового элемента
function createItem(value) {
    let newElement = document.createElement("li");
    newElement.className = "list-group-item";

    let newTextNode = document.createTextNode(value);
    newElement.appendChild(newTextNode);

    let deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.dataset.action = "delete";

    newElement.appendChild(deleteBtn);

    itemsList.prepend(newElement);

}
// Добавление элемента
function addItem(e) {
    e.preventDefault();

    let newItemInput = document.getElementById("newItemText");
    let newItemText = newItemInput.value;

    saveLocalTodos(newItemInput.value); // Добавление данных в localStorage 
    createItem(newItemText);
    newItemInput.value = "";

}

// Удаление элемента 
function removeItem(e) {

    if (e.target.hasAttribute("data-action") && e.target.getAttribute("data-action") == "delete") {
        if (confirm("Удалить задачу?")) {
            removeLocalTodos(e.target.previousSibling.textContent);
            console.log(e.target.previousSibling.textContent);
            e.target.parentNode.remove();
        }
    }
}


// Фильтрация списка дел 

function filterItems(e) {

    let searchedText = e.target.value.toLowerCase();
    let items = itemsList.querySelectorAll("li");

    items.forEach(function(item) {
        let itemText = item.firstChild.textContent.toLowerCase();

        // Проверяем вхождение искомой подстроки в текст задачи
        if (itemText.indexOf(searchedText) != -1) {
            // Если вхождение есть - показываем элемент с задачей
            item.style.display = "block";
        } else {
            // Если вхождения нет - скрываем элемент с задачей
            item.style.display = "none";
        }
    });
}

/* ----------- localStorage ---------- */

let todos;
document.addEventListener('DOMContentLoaded', getLocalTodos);

// Проверка на наличе данных в localStorage
function checkStorage() {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}

// Сохранение данных в localStorage
function saveLocalTodos(newTask) {
    checkStorage()
    todos.push(newTask);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Получение данных с localStorage
function getLocalTodos() {
    checkStorage();

    todos.forEach(function(element) {
        let newItemText = element;
        createItem(newItemText);
    });
}

// Удаление данных с localStorage
function removeLocalTodos(index) {

    todos.splice(todos.indexOf(index), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}