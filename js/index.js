let submit = document.getElementById("submit");
let task = document.getElementById("task");
let form = document.getElementById("form");
let taskList = document.getElementById("task-list");
let erorr = document.getElementById("alert");
let taskCount = document.getElementById("task-count");
let taskScore = document.getElementById("task-score");
let count = +localStorage.count || 0;
let scoreTask = +localStorage.score || 0;
// form prevent
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// create
if (localStorage.task != null) {
  taskList.innerHTML = localStorage.task;
}
if (localStorage.count != null) {
  taskCount.innerHTML = localStorage.count;
}
if (localStorage.score != null) {
  taskScore.innerHTML = localStorage.score;
}

submit.addEventListener("click", () => {
  if (valid() == true) {
    let li = document.createElement("li");
    li.innerHTML = `${task.value}`;
    let i = document.createElement("i");
    i.classList.add("fa-solid", "fa-trash");
    li.append(i);
    taskList.append(li);
    localStorage.setItem("task", taskList.innerHTML);
    erorr.classList.add("d-none");
    task.value = "";
    scoreList(1);
    scoreShow();
  } else {
    erorr.classList.remove("d-none");
  }
});

// remove & cheked
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    e.target.parentElement.remove();
    scoreList(-1);
    scoreShow();

    if (e.target.parentElement.classList.contains("checked")) {
      +taskScore.innerHTML--;
    }
  } else if (e.target.tagName == "LI") {
    e.target.classList.toggle("checked");
    listCheck(e.target);
    goodJoop();
  }
  localStorage.setItem("task", taskList.innerHTML);
});
// validation
form.addEventListener("input", () => {
  valid();
});
let regex = /[a-z]+/i;
function valid() {
  if (regex.test(task.value)) {
    erorr.classList.add("d-none");
    return true;
  } else {
    erorr.classList.remove("d-none");
    return false;
  }
}

// score
let progress = document.getElementById("progress");

function scoreShow() {
  if (taskList.innerHTML != "") {
    progress.classList.remove("d-none");
  } else {
    progress.classList.add("d-none");
  }
}
scoreShow();
function scoreList(score) {
  count += score;
  taskCount.innerHTML = count;
  localStorage.setItem("count", count);
}
function listCheck(target) {
  if (target.classList.contains("checked")) {
    taskScore.innerHTML++;
  } else {
    taskScore.innerHTML--;
  }
  localStorage.setItem("score", taskScore.innerHTML);
}

function goodJoop() {
  if (taskCount.innerHTML == taskScore.innerHTML) {
    Swal.fire({
      title: "Good Job",
      icon: "success",
      draggable: true,
    });
    taskList.innerHTML = "";
    taskCount.innerHTML = 0;
    taskScore.innerHTML = 0;
    progress.classList.add("d-none");
    count = 0;
    localStorage.setItem("count", count);
  }
}
