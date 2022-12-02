import {
  SeeTasks,
  TaskActions,
  TagActions,
  FolderActions,
  TaskCreate,
  Editor,
  folderManager,
  taskViewer,
  tagManager,
  colorManager,
} from "./todo";
import format from "date-fns/format";
import { add } from "date-fns";

function renderInbox() {
  SeeTasks.seeInbox();
  const currentTasks = taskViewer.currentTasks;
  let currentName = document.querySelector(".taskview__name");
  currentName.textContent = taskViewer.currentName;

  const taskview = document.querySelector(".taskview");

  currentTasks.forEach((task) => {
    const string = `<div class="taskbar">
            <div class="taskbar__content">
              <input
                type="checkbox"
                name="completed"
                id=""
                class="taskbar__checkbox"
              />
              <div class="taskbar__top">
                <span class="taskbar__name">
                  <a href="" class="taskbar__name-link">${task.name}</a>
                </span>
                <span class="taskbar__folder">
                  ${renderFolder(task.folder)}
                </span>
              </div>
              <div class="taskbar__priority">
                &#9650;
                
              </div>
              ${renderDescription(task.descript)}
              <div class="taskbar__bottom">
                <span class="taskbar__date">
                  <a href="" class="taskbar__date-link">${renderDate(
                    task.date
                  )}</a>
                </span>
                <div class="taskbar__tagsection">
                  ${renderTags(task.tags)}
                </div>
              </div>
            </div>
            <div class="taskbar__trashbin">&#128465;</div>
          </div>`;

    taskview.insertAdjacentHTML("beforeend", string);
  });
}

renderInbox();

function renderDescription(descript) {
  return descript
    ? `<span class="taskbar__descript">
<span class="taskbar__descript-link"
>${descript}</span
>
</span>`
    : ``;
}

function renderDate(date) {
  //* Month Date Day Time
  return format(date, "MMM do eee p");
}

function renderFolder(foldername) {
  const folder = folderManager.getFolder(foldername);

  return `<a href="" class="taskbar__folder-link taskbar__folder-link--${folder.color}">${foldername}</a>`;
}

function renderTags(tags) {
  let string = ``;
  string = tags.reduce((p, n) => {
    return p.concat(
      `<div class="taskbar__tag taskbar__tag--${n.color}">${n.name}</div>`
    );
  }, string);
  console.log(string);
  return string;
}

//* Task Create

(function () {
  const openbutton = document.querySelector(".header__create-task-button");
  openbutton.addEventListener("click", openCreateTask);
  const createbutton = document.querySelector(".task-create__create-button");
  createbutton.addEventListener("click", createNewTask);
})();

function openCreateTask() {
  const createTask = document.querySelector(".task-create");

  createTask.showModal();
}

function closeCreateTask() {
  const createTask = document.querySelector(".task-create");

  createTask.close();
}

function createNewTask(){
  TaskActions.makeNewTask()
  console.log(folderManager.inbox);
}

function resetTaskCreate() {
  const name = document.querySelector(".task-create__name");
  const descript = document.querySelector(".task-create__descript");
  const dateinput = document.querySelector(".task-create__date-input");
  const timeinput = document.querySelector(".task-create__time-input");
  const date = document.querySelector(".task-create__date");
  const tagsContainer = document.querySelector(".task-create__tagcontainer");
  const priority = document.querySelector(".task-create__priority");
  const folder = document.querySelector(".task-create__folder");

  name.value = "";
  descript.value = "";
  dateinput.value = "";
  timeinput.value = "";
  while (tagsContainer.firstChild) {
    tagsContainer.removeChild(tagsContainer.firstChild);
  }
  tagsContainer.insertAdjacentHTML(
    "afterbegin",
    `<span class="task-create__tag"
  >Add A Tag</span
>`
  );
  folder.textContent = "Inbox";
  date.textContent = "Today";
  priority.textContent = 4;
}

function checkName(name) {
  const folders = folderManager.getAllFolders();
  let tasks = folders.map((folder) => folder.tasks.forEach((task) => task));

  const hasName = tasks.some((task) => task.name === name);

  return hasName;
}

//* Task Create



(function () {
  const nameInput = document.querySelector(".task-create__name");
  const descriptInput = document.querySelector(".task-create__descript");
  nameInput.addEventListener("input", setName);
  descriptInput.addEventListener("input", setDescript);
})();

function setName(e) {
  TaskCreate.setName(e.currentTarget.value);
}

function setDescript(e) {
  TaskCreate.setDescript(e.currentTarget.value);
}

const tagbutton = document.querySelector(".task-create__tag-button");
tagbutton.addEventListener("click", openTaskCreate_TagList);

// const tc = document.querySelector(".task-create");
// tc.showModal();

function openTaskCreate_TagList() {
  fillTaskCreate_TagList();
  const tagButton = document.querySelector(".task-create__tag-button");
  const tagList = document.querySelector(".task-create__taglist");
  Popper.createPopper(tagButton, tagList, {
    placement: "bottom",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });
  revealTaskCreate_TagList();
  openOverlay();
  setoverlay(closeTaskCreate_TagList);
}

function fillTaskCreate_TagList() {
  const tags = tagManager.tags;
  const tagList = cleanupListOfEventListeners(".task-create__taglist");

  tags.forEach((tag) => {
    const htmlstring = `<li class="task-create__tag-listitem task-create__tag-listitem--${
      tag.color
    }">
    <label for="" class="task-create__tagname">${tag.name}</label
    ><input
      type="checkbox"
      name=${tag.name}
      id=${tag.name}
      ${TaskCreate.getTag(tag.name) ? `checked` : ``}
      class="task-create__tag-checkbox"
      value=${tag.name}
    />
  </li>`;

    tagList.insertAdjacentHTML("beforeend", htmlstring);
    const checkbox = document.querySelector(
      `.task-create__tag-checkbox[value=${tag.name}]`
    );
    checkbox.addEventListener("change", setTag);
  });
}

function cleanupListOfEventListeners(className) {
  const oldNode = document.querySelector(className);
  const newNode = oldNode.cloneNode(true);
  oldNode.replaceWith(newNode);
  const element = newNode;
  if (element.firstChild) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  return element;
}

function revealTaskCreate_TagList() {
  const tagList = document.querySelector(".task-create__taglist");
  tagList.classList.toggle("task-create__taglist--hidden");
}

function setTag(e) {
  const tagname = e.currentTarget.value;
  if (e.currentTarget.checked) TaskCreate.setTag(tagname);
  else TaskCreate.removeTag(tagname);
  console.log(e.currentTarget.value);
}

function changeTagContainer() {
  cleanupListOfEventListeners(".task-create__tagcontainer");
  const tagcontainer = document.querySelector(".task-create__tagcontainer");
  const tags = TaskCreate.getTags();
  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.classList.add("task-create__tag", `task-create__tag--${tag.color}`);
    span.textContent = tag.name;
    tagcontainer.appendChild(span);
  });
  if (!tags.length) tagcontainer.textContent = "Add A Tag";
}

function setoverlay(callback, details = null) {
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener(
    "click",
    (e) => {
      callback(details);
    },
    { once: true }
  );
}

function openOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("overlay--hidden");
}

function closeOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("overlay--hidden");
  resetOverlay();
}

function hideTaskCreate_TagList() {
  const tagList = document.querySelector(".task-create__taglist");
  tagList.classList.toggle("task-create__taglist--hidden");
}

function closeTaskCreate_TagList() {
  hideTaskCreate_TagList();
  changeTagContainer();
  closeOverlay();
}

//* Priority

const priorityButton = document.querySelector(".task-create__priority-button");
priorityButton.addEventListener("click", openPrioritySelection);
setCallBackOnPriSel();

function revealPrioritySelection() {
  const priSel = document.querySelector(".task-create__priority-selection");
  priSel.classList.toggle("task-create__priority-selection--hidden");
}

function hidePrioritySelection() {
  const priSel = document.querySelector(".task-create__priority-selection");
  priSel.classList.toggle("task-create__priority-selection--hidden");
  closeOverlay();
}

function openPrioritySelection() {
  const priorityButton = document.querySelector(
    ".task-create__priority-button"
  );
  const priSel = document.querySelector(".task-create__priority-selection");
  Popper.createPopper(priorityButton, priSel, {
    placement: "bottom",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });
  revealPrioritySelection();
  openOverlay();
  setoverlay(hidePrioritySelection);
}

function setCallBackOnPriSel() {
  const priSel = document.querySelector(".task-create__priority-selection");
  priSel.addEventListener("change", setPriority);
}

function setPriority(e) {
  const priorityLabel = document.querySelector(".task-create__priority");
  priorityLabel.textContent = e.currentTarget.value;
  hidePrioritySelection();
}

function resetOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.replaceWith(overlay.cloneNode(false));
}

//* Folder

const folderbutton = document.querySelector(".task-create__folder-button");
folderbutton.addEventListener("click", openFolderSelection);

function openFolderSelection() {
  cleanupListOfEventListeners(".task-create__folder-selection");
  const folderbutton = document.querySelector(".task-create__folder-button");
  const folderSelection = document.querySelector(
    ".task-create__folder-selection"
  );
  Popper.createPopper(folderbutton, folderSelection, {
    placement: "bottom",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });
  fillFolderSelection();
  revealFolderSelection();
  setCallBackOnFolderSelection();
  openOverlay();
  setoverlay(hideFolderSelection);
}

function revealFolderSelection() {
  const folderSelection = document.querySelector(
    ".task-create__folder-selection"
  );
  folderSelection.classList.toggle("task-create__folder-selection--hidden");
}
function hideFolderSelection() {
  const folderSelection = document.querySelector(
    ".task-create__folder-selection"
  );
  folderSelection.classList.toggle("task-create__folder-selection--hidden");
  closeOverlay();
}

function fillFolderSelection() {
  const folders = folderManager.getAllFolders();
  const folderSelection = document.querySelector(
    ".task-create__folder-selection"
  );
  folders.forEach((folder) => {
    const option = document.createElement("option");
    option.setAttribute("value", `${folder.name}`);
    option.classList.add("task-create__folder-option");
    option.style.setProperty("color", `${folder.color}`);
    option.textContent = folder.name;
    folderSelection.appendChild(option);
  });
}

function setCallBackOnFolderSelection() {
  const folderSelection = document.querySelector(
    ".task-create__folder-selection"
  );
  folderSelection.addEventListener("click", setFolder, { once: true });
}

function setFolder(e) {
  const folderLabel = document.querySelector(".task-create__folder");
  folderLabel.textContent = e.currentTarget.value;
  hideFolderSelection();
}

//* Date

const dateInput = document.querySelector(".task-create__date-input");
const timeInput = document.querySelector(".task-create__time-input");
dateInput.addEventListener("change", setDate);
timeInput.addEventListener("change", setDate);

const datebutton = document.querySelector(".task-create__date-button");
datebutton.addEventListener("click", openDateContainer);

function openDateContainer() {
  const datebutton = document.querySelector(".task-create__date-button");
  const dateContainer = document.querySelector(".task-create__date-container");
  Popper.createPopper(datebutton, dateContainer, {
    placement: "bottom",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
    ],
  });
  revealDateContainer();
  openOverlay();
  setoverlay(hideDateContainer);
}

//TODO call when opening TaskCreate
function setDate() {
  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");
  const deadline = formatDate(dateInput.value, timeInput.value);
  TaskCreate.setDate(...deadline);
  setDateOnTaskCreate()
}

function setDateOnTaskCreate() {
  const datelabel = document.querySelector(".task-create__date");
  const date = TaskCreate.getDate()
  const today = new Date();
  console.log(date);
  if (date.getDay() === today.getDay()) {
    datelabel.textContent = format(
      date,
      `'Today' ${date.getHours() === 23 && date.getMinutes() === 59 ? "" : "p"}`
    );
  } else if (date.getDay() !== today) {
    datelabel.textContent = format(
      date,
      `MMM do eee ${
        date.getHours() === 23 && date.getMinutes() === 59 ? "" : "p"
      }`
    );
  }
}

function revealDateContainer() {
  const dateContainer = document.querySelector(".task-create__date-container");
  dateContainer.classList.toggle("task-create__date-container--hidden");
}
function hideDateContainer() {
  const dateContainer = document.querySelector(".task-create__date-container");
  dateContainer.classList.toggle("task-create__date-container--hidden");
  closeOverlay();
}

function formatDate(date, time) {
  const day = parseInt(date.slice(8)) || null;
  const hours = parseInt(time.slice(0, 3)) || undefined;
  const minutes = parseInt(time.slice(3)) || undefined;
  const month = parseInt(date.slice(5, 7)) || null;
  const year = parseInt(date.slice(0, 4)) || null;

  // console.log([day, hours, minutes, period, month, year]);
  return [day, hours, minutes, month, year];
}

function resetDeadline() {
  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");
  dateInput.value = "";
  timeInput.value = "";
}
