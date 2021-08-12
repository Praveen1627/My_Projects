let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

let colors = ["#E5E4F4", "#E8F1DE", "#FDF9F0", "#F8F0EC", "#F2E6F0", "#D9E4FB"];

function listFromLocalStorage() {
    let x = localStorage.getItem("todoList");
    let y = JSON.parse(x);

    if (y === null) {
        return [];

    } else {
        return y;
    }
}
let todoList = listFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}



let todosCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoitem = "todo" + eachTodo.uniqueNo;
        if (eachTodoitem === todoId) {
            return true;
        } else {
            return false;
        }

    });
    let todoObj = todoList[todoIndex];

    if (todoObj.isChecked === true) {
        todoObj.isChecked = false;
    } else {
        todoObj.isChecked = true;
    }

    labelElement.classList.toggle('checked');
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    let deleteItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoItemsContainer.removeChild(todoElement);
    todoList.splice(deleteItemIndex, 1);

}

function createAndAppendTodo(todo) {
    let todoId = 'todo' + todo.uniqueNo;
    let checkboxId = 'checkbox' + todo.uniqueNo;

    let labelId = 'label' + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");

    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    }

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    let colIdx = todo.color;
    let randomCol = colors[todo.color];
    labelContainer.style.borderColor = "black";
    labelContainer.style.backgroundColor = colors[todo.color];
    console.log(labelContainer)

    console.log(colors[(((Math.random()) * 10) % 6)], (((Math.random()) * 10) % 6))
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false,
        color: Math.ceil((Math.random()) * 10) % 6
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}