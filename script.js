const list_el = document.getElementById("list");
const create_button_el = document.getElementById("create");

let allTodo = [];

create_button_el.addEventListener("click", createNewTodo);

function createNewTodo() {
	const item = {
		id: new Date().getTime(),
		text: "",
		complete: false,
	};

	allTodo.unshift(item);

	const { item_el, input_el } = CreateTodoElement(item);

	list_el.prepend(item_el);

	input_el.removeAttribute("disabled");
	input_el.focus();

	Save();
}

function CreateTodoElement(item) {
	const item_el = document.createElement("div");
	item_el.classList.add("item");

	const check_el = document.createElement("input");
	check_el.type = "checkbox";
	check_el.checked = item.complete;

	if (item.complete) {
		item_el.classList.add("complete");
	}

	const input_el = document.createElement("input");
	input_el.type = "text";
	input_el.value = item.text;
	input_el.setAttribute("disabled", "");

	const actions_el = document.createElement("div");
	actions_el.classList.add("actions");

	const edit_btn_el = document.createElement("button");
	edit_btn_el.classList.add("material-icons");
	edit_btn_el.innerText = "edit";

	const delete_btn_el = document.createElement("button");
	delete_btn_el.classList.add("material-icons", "remove-btn");
	delete_btn_el.innerText = "remove_circle";

	actions_el.append(edit_btn_el);
	actions_el.append(delete_btn_el);

	item_el.append(check_el);
	item_el.append(input_el);
	item_el.append(actions_el);

	// EVENTS
	check_el.addEventListener("change", () => {
		item.complete = check_el.checked;

		if (item.complete) {
			item_el.classList.add("complete");
		} else {
			item_el.classList.remove("complete");
		}
	});

	input_el.addEventListener("input", () => {
		item.text = input_el.value;
	});
	input_el.addEventListener("blur", () => {
		input_el.setAttribute("disabled", "");
		Save();
	});
	edit_btn_el.setAttribute("click", () => {
		input_el.removeAttribute("disabled");
		input_el.focus();
		Save();
	});
	delete_btn_el.addEventListener("click", () => {
		allTodo = allTodo.filter((t) => t.id != item.id);

		item_el.remove();

		Save();
	});

	return { item_el, input_el, edit_btn_el, delete_btn_el };
}

function DisplayTodos() {
	Load();

	for (let i = 0; i < allTodo.length; i++) {
		const item = allTodo[i];

		const { item_el } = CreateTodoElement(item);

		list_el.append(item_el);
	}
}
DisplayTodos();

function Save() {
	const save = JSON.stringify(allTodo);

	localStorage.setItem("all-todo", save);
}

function Load() {
	const data = localStorage.getItem("all-todo");

	if (data) {
		allTodo = JSON.parse(data);
	}
}
