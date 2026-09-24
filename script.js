const input = document.getElementById("Todo-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];


function savetodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


function createnode(todo, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        savetodos();
        render();
    });


    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = "0.8px";

    if (todo.completed) {
        textspan.style.textDecoration = "line-through";
    }


    textspan.addEventListener("dblclick", () => {
        const newtext = prompt("Edit todo", todo.text);

        if (newtext !== null) {
            todo.text = newtext.trim();
            textspan.textContent = todo.text;
            savetodos();
        }
    });


    const delbtn = document.createElement("button");
    delbtn.textContent = "delete";

    delbtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        savetodos();
    });


    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(delbtn);

    return li;
}


function render() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const node = createnode(todo, index);
        list.appendChild(node);
    });
}


function addtodo() {
    const text = input.value.trim();

    if (!text) {
        return;
    }

    todos.push({
    text,
    completed: false
    });
   input.value = "";
    render();
    savetodos();
}
button.addEventListener("click", addtodo);
render();