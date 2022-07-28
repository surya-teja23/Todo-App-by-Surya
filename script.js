//Model section
let todos;
let savedTodos = JSON.parse(localStorage.getItem("Todos"));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Get groceries",
      dueDate: "2021-10-04",
      id: "id1",
      completed: "No",
    },
    {
      title: "Wash car",
      dueDate: "2021-02-03",
      id: "id2",
      completed: "No",
    },
    {
      title: "Make dinner",
      dueDate: "2021-03-04",
      id: "id3",
      completed: "No",
    },
  ];
}

function createTodo(title, dueDate, place) {
  let id = "" + new Date().getTime();
  todos.splice(place, 0, {
    title: title,
    dueDate: dueDate,
    id: id,
    completed: "No",
  });
}

function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
}

function updateTodo(event) {
  let updateButton = event.target;
  let idToEdit = updateButton.id;

  let textbox = document.getElementById("update-title");
  let title = textbox.value;
  let datePicker = document.getElementById("update-duedate");
  let dueDate = datePicker.value;

  if ((title === "") & (dueDate === "")) {
    alert("Todo Title and Todo Duedate cannot be empty");
    saveTodos();
    render();
  } else if (dueDate === "") {
    alert("Todo Duedate cannot be empty");
    saveTodos();
    render();
  } else if (title === "") {
    alert("Todo Title cannot be empty");
    saveTodos();
    render();
  } else {
    todos.forEach((todo) => {
      if (todo.id === idToEdit) {
        todo.title = title;
        todo.dueDate = dueDate;
      }
    });
    saveTodos();
    render();
  }
}

function deleteAll() {
  todos = todos.filter((todo) => {
    return false;
  });
  saveTodos();
  render();
}

function deleteCompleted() {
  todos = todos.filter((todo) => {
    if (todo.completed == "Yes") {
      return false;
    } else {
      return true;
    }
  });
  saveTodos();
  render();
}

//Control Section

function addTodo() {
  let textbox = document.getElementById("todo-title");
  let title = textbox.value;

  let datePicker = document.getElementById("date-picker");
  let dueDate = datePicker.value;

  let placeAt = document.getElementById('placeat')
  let place = placeAt.value
  if (place == '') {
    place = todos.length
  }

  if ((title === "") & (dueDate === "")) {
    alert("Todo Title and Todo Duedate cannot be empty");
  } else if (dueDate === "") {
    alert("Todo Duedate cannot be empty");
  } else if (title === "") {
    alert("Todo Title cannot be empty");
  } else {
    createTodo(title, dueDate, place);
    saveTodos();
    render();
    textbox.value = "";
    datePicker.value = "";
    placeAt.value = ''
  }
}

function deleteTodo(event) {
  let deleteButton = event.target;
  let idToDelete = deleteButton.id;
  removeTodo(idToDelete);
  saveTodos();
  render();
}

function editTodo(event) {
  let editButton = event.target;
  let idToEdit = editButton.id;

  let element = document.getElementById(idToEdit);
  element.innerHTML = "";

  let textbox = document.createElement("input");
  textbox.id = "update-title";
  textbox.placeholder = "Enter updated Todo Title";
  textbox.style = "margin-right : 2px";

  let datePicker = document.createElement("input");
  datePicker.type = "date";
  datePicker.id = "update-duedate";
  datePicker.style = "margin-left : 2px;margin-right : 2px";

  let updateButton = document.createElement("button");
  updateButton.innerText = "Update";
  updateButton.id = idToEdit;
  updateButton.onclick = updateTodo;
  updateButton.style = "margin-left : 2px;margin-right : 2px";

  let cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.onclick = render;
  cancelButton.style = "margin-left : 2px";

  element.appendChild(textbox);
  element.appendChild(datePicker);
  element.appendChild(updateButton);
  element.appendChild(cancelButton);
}

function completeStatus(event) {
  let checkbox = event.target;
  let idToComplete = checkbox.id;
  let element = document.getElementById(idToComplete);
  let buttons = element.querySelectorAll("button");
  if (checkbox.checked) {
    element.style = "text-decoration : line-through";
    buttons.forEach((button) => {
      button.setAttribute("disabled", "disabled");
    });
    todos = todos.filter((todo) => {
      if (todo.id === idToComplete) {
        todo.completed = "Yes";
        saveTodos();
        return true;
      } else {
        saveTodos();
        return true;
      }
    });
  } else {
    element.style = "text-decoration : none";
    buttons.forEach((button) => {
      button.removeAttribute("disabled");
    });
    todos = todos.filter((todo) => {
      if (todo.id === idToComplete) {
        todo.completed = "No";
        saveTodos();
        return true;
      } else {
        saveTodos();
        return true;
      }
    });
  }
}

function saveTodos() {
  localStorage.setItem("Todos", JSON.stringify(todos));
}

//View Section

function render() {
  let todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  let placeAt = document.getElementById('placeat')
  placeAt.max = todos.length
  placeAt.min = 0

  todos.forEach(function (todo) {
    let element = document.createElement("div");
    element.id = todo.id;
    element.innerText =
      todo.title +
      "\xa0".repeat(3) +
      ":" +
      "\xa0".repeat(3) +
      todo.dueDate;

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.id = todo.id;
    editButton.onclick = editTodo;
    editButton.style = "margin-left:12px";
    element.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.id = todo.id;
    deleteButton.onclick = deleteTodo;
    deleteButton.style = "margin-left:12px;";
    element.appendChild(deleteButton);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.onchange = completeStatus;

    element.prepend(checkbox);

    todoList.appendChild(element);
    renderCompletedTodos();
  });
}

function renderCompletedTodos() {
  let todoList = document.querySelector("div");
  let todoDivs = todoList.querySelectorAll("div");
  todos.forEach((todo) => {
    if (todo.completed == "Yes") {
      todoDivs.forEach((todoDiv) => {
        if (todo.id == todoDiv.id) {
          todoDiv.querySelector("input").checked = true;
          todoDiv.style = "text-decoration : line-through";
          todoDiv.querySelectorAll("button").forEach((button) => {
            button.setAttribute("disabled", "disabled");
          });
        }
      });
    }
  });
}

render();