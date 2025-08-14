const input_tag = document.getElementById("input_ele") as HTMLInputElement;
const button_tag = document.getElementById("todo_btn") as HTMLButtonElement;
const ul_tag = document.getElementById("unorder_list-ele") as HTMLUListElement;

button_tag.addEventListener("click", (e) => {
  const a = e.target as HTMLButtonElement;
  if (a.innerText == "Add Todo") {
    addTodo();
  } else {
    const get_id = localStorage.getItem("id");
    const li_ele = document.getElementsByTagName(
      "li"
    ) as HTMLCollectionOf<HTMLLIElement>;

    Array.from(li_ele).forEach((element) => {
      if (element.dataset.id == get_id) {
        (element.firstElementChild as HTMLLIElement).innerHTML =
          input_tag.value;

        button_tag.innerText = "Add Todo";
        input_tag.value = "";
      }

      return element;
    });
  }
});

function addTodo() {
  const li_ele = document.createElement("li") as HTMLLIElement;

  const date = new Date();
  const todayDate = date.getDate();
  const hours = date.getHours();
  const month = date.getMonth();
  const getMinutes = date.getMinutes();
  const getMilliseconds = date.getMilliseconds();
  li_ele.dataset.id = `${todayDate}${hours}${month}${getMinutes}${getMilliseconds}`;

  const p_ele = document.createElement("p") as HTMLParagraphElement;
  p_ele.innerText = input_tag.value;

  li_ele.appendChild(p_ele);

  const div_ele = document.createElement("div") as HTMLDivElement;
  div_ele.className = "btn_block";

  const compelete_btn = document.createElement("button") as HTMLButtonElement;
  compelete_btn.className = "btn_task";
  compelete_btn.id = "compeleted_btn";
  compelete_btn.innerText = "Not Compeleted";
  compelete_btn.addEventListener("click", (e: Event) => compeleteTask(e));

  const delete_btn = document.createElement("button") as HTMLButtonElement;
  delete_btn.addEventListener("click", (e: Event) => deleteFunc(e));
  delete_btn.id = "delete_btn";
  delete_btn.innerText = "Delete";

  const update_btn = document.createElement("button") as HTMLButtonElement;
  update_btn.addEventListener("click", (e: Event) => updateFunc(e));
  update_btn.id = "update_btn";
  update_btn.innerText = "Update";

  div_ele.appendChild(update_btn);
  div_ele.appendChild(delete_btn);

  li_ele.appendChild(div_ele);

  div_ele.appendChild(compelete_btn);
  ul_tag.appendChild(li_ele);
  input_tag.value = "";
}

function deleteFunc(e: Event) {
  (e.target as HTMLButtonElement).parentElement?.parentElement?.remove();
}

function updateFunc(e: Event) {
  const updateValue = (e.target as HTMLButtonElement)
    .parentElement as HTMLDivElement;
  const blockElement = (updateValue as HTMLDivElement)
    .parentElement as HTMLDivElement;
  const li_ele = (blockElement as HTMLDivElement).firstElementChild?.innerHTML;
  const id = blockElement.dataset.id;

  localStorage.setItem("id", `${id}`);

  input_tag.value = String(li_ele);
  button_tag.innerText = "Update Todo";
}

function compeleteTask(e: Event) {
  (e.target as HTMLButtonElement).innerText = "Compeleted";
  (e.target as HTMLButtonElement).style.backgroundColor = "green";
}
