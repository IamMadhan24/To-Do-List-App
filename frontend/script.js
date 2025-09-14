const inputBox = document.getElementById("input-box");
const addButton = document.getElementById("add-button");
const listContainer = document.getElementById("list-container");

const API_URL = "/api/tasks"; 

window.onload = () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach(task => addTask(task.id, task.text, task.checked));
    });
};

addButton.onclick = () => {
  const text = inputBox.value.trim();
  if (!text) {
    alert("Please enter a task.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  })
    .then(res => res.json())
    .then(task => {
      addTask(task.id, task.text, task.checked);
      inputBox.value = "";
    });
};

inputBox.addEventListener("keypress", e => {
  if (e.key === "Enter") addButton.click();
});

function addTask(id, text, isChecked) {
  const li = document.createElement("li");
  li.textContent = text;
  li.dataset.id = id;
  if (isChecked) li.classList.add("checked");

  const close = document.createElement("span");
  close.textContent = "×";
  close.className = "close";
  li.appendChild(close);

  listContainer.appendChild(li);
}

listContainer.onclick = e => {
  const li = e.target.closest("li");
  const id = li?.dataset?.id;
  if (!id) return;

  if (e.target.tagName === "LI") {
    const checked = !li.classList.contains("checked");
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked })
    }).then(() => {
      li.classList.toggle("checked");
    });

  } else if (e.target.classList.contains("close")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => li.remove());
  }
};
