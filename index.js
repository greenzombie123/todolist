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

function renderInbox() {
  SeeTasks.seeInbox();
  const currentTasks = taskViewer.currentTasks;
  let currentName = document.querySelector(".taskview__name");
  currentName.textContent = taskViewer.currentName

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

function openCreateTask() {
  const createTask = document.querySelector(".task-create");

  createTask.showModal();
}

function setCreateTask() {
  const button = document.querySelector(".createmodal__button");
}

function checkName(name) {
  const folders = folderManager.getAllFolders();
  let tasks = folders.map((folder) => folder.tasks.forEach((task) => task));

  const hasName = tasks.some((task) => task.name === name);

  return hasName;
}

function setCreateTasksValues() {
  const nameinput = document.querySelector(".task-create__name");
  const descriptinput = document.querySelector(".task-create__descript");
  const dateinput = document.querySelector(".task-create__date-input");
  const timeinput = document.querySelector(".task-create__time-input");
  const tagsinput = document.querySelectorAll(".task-create__tag");
  const priorityinput = document.querySelector(
    ".task-create__priority-selection"
  );
  const folderinput = document.querySelector(".task-create__folder-selection");

  TaskCreate.setName(nameinput.value);
  TaskCreate.setDescript(descriptinput.value);
  const dateinfo = formatDate(dateinput.value, timeinput.value);
  TaskCreate.setDate([...dateinfo]);
  //TaskCreate.setTag

  console.log(
    tagsinput,
    nameinput,
    descriptinput,
    dateinput,
    timeinput,
    priorityinput,
    folderinput
  );
}

function formatDate(date, time) {
  const day = date.slice(8);
  const hours = time.slice(0, 3);
  const minutes = time.slice(3);
  const period = parseInt(hours) > 12 ? "pm" : "am";
  const month = date.slice(5, 7);
  const year = date.slice(0, 4);

  // console.log([day, hours, minutes, period, month, year]);
  return [day, hours, minutes, period, month, year];
}

const tagListContainer = document.querySelector(".task-create__tagcontainer");
tagListContainer.addEventListener("click", openTaskCreate_TagList);

const tc = document.querySelector(".task-create");
tc.showModal();

function openTaskCreate_TagList() {
  revealTaskCreate_TagList();
  fillTaskCreate_TagList();
  openOverlay();
  setoverlay(closeTaskCreate_TagList);
}

function fillTaskCreate_TagList() {
  const tags = tagManager.tags;
  const tagList = document.querySelector(".task-create__taglist");
  cleanupListOfEventListeners(".task-create__taglist")

  tagList.replaceWith(tagList.cloneNode(true));
  while (tagList.firstChild) {
    tagList.removeChild(firstChild);
  }

  tags.forEach((tag) => {
    const htmlstring = `<li class="task-create__tag-listitem task-create__tag-listitem--${tag.color}">
    <label for="" class="task-create__tagname">${tag.name}</label
    ><input
      type="checkbox"
      name=${tag.name}
      id=${tag.name}
      class="task-create__tag-checkbox"
      value=${tag.name}
    />
  </li>`;

    tagList.insertAdjacentHTML("beforeend", htmlstring);
    const listitem = document.querySelector(
      `.task-create__tag-checkbox[value=${tag.name}]`
    );
    listitem.addEventListener("click", setTag);
  });
}

function cleanupListOfEventListeners(className) {
  const element = document.querySelector(className);
  element.replaceWith(element.cloneNode(true));
  while (element.firstChild) {
    element.removeChild(firstChild);
  }
}

function revealTaskCreate_TagList() {
  const tagListContainer = document.querySelector(
    ".task-create__taglist-container"
  );
  tagListContainer.classList.toggle("task-create__taglist-container--hidden");
}

function setTag(e) {
  const tagname = e.currentEvent.value;
  TaskCreate.setTag(tagname);
  console.log(e.currentEvent.value);
}

function setoverlay(callback, details) {
  const overlay = document.querySelector(".overlay");
  const controller = new AbortController();
  callback = details ? () => callback(detail) : ()=>callback()

  overlay.addEventListener("click", () => callback, {
    signal: controller.signal,
  });
}

function openOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("overlay--hidden");
}

function closeTaskCreate_TagList(c) {
  const tagListContainer = document.querySelector(
    ".task-create__taglist-container"
  );
  tagListContainer.classList.toggle("task-create__taglist-container--hidden");
}
