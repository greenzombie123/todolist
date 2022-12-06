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
import { setEditDateModal, setEditPriorityModal, setEditTagModal } from "./edit";
import format from "date-fns/format";

function render() {
  resetTaskView();
  const currentTasks = taskViewer.currentTasks;
  let currentName = document.querySelector(".taskview__name");
  currentName.textContent = taskViewer.currentName;
  createTaskBars(currentTasks);

  taskRenderer.setLastFunction(render);
}

function renderUpcoming() {
  resetTaskView();
  const days = Object.getOwnPropertyNames(taskViewer.upcomingTasks);
  let currentName = document.querySelector(".taskview__name");
  currentName.textContent = taskViewer.currentName;
  const id = {counter : 1};

  const taskview = document.querySelector(".taskview");

  days.forEach((day) => {
    const heading = document.createElement("h1");
    heading.classList.add("taskview__day");
    heading.textContent = day;
    taskview.appendChild(heading);
    createTaskBars(taskViewer.upcomingTasks[day], id);

  });

  taskRenderer.setLastFunction(renderUpcoming);
}

function createTaskBars(tasks, id = {counter:1}) {
  const taskview = document.querySelector(".taskview");
  tasks.forEach((task) => {
    const string = `<div class="taskbar" data-id=${id.counter}>
                <div class="taskbar__content ${renderPriorityBorder(task.priority)}">
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
                      <button type="button" class="taskbar__date-link">${renderDate(
                        task.date
                      )}</button>
                    </span>
                    <div class="taskbar__tagsection">
                      ${renderTags(task.tags)}
                    </div>
                  </div>
                </div>
                <div class="taskbar__trashbin">&#128465;</div>
              </div>`;

    taskview.insertAdjacentHTML("beforeend", string);

    const editLink = document.querySelector(
      `div[data-id='${id.counter}'] .taskbar__date-link`
    );
    setEditDateModal(task, editLink);

    const editTag = document.querySelector(`div[data-id='${id.counter}'] .taskbar__tagsection`);
    setEditTagModal(task, editTag)

    const editPriority = document.querySelector(`div[data-id='${id.counter}'] .taskbar__priority`);
    setEditPriorityModal(task, editPriority)

    id.counter++;
  });
}

function resetTaskView() {
  const taskview = document.querySelector(".taskview");
  const newTV = taskview.cloneNode(true);
  taskview.replaceWith(newTV);
  if (newTV.firstElementChild.nextElementSibling) {
    while (newTV.firstElementChild.nextElementSibling) {
      newTV.removeChild(newTV.firstElementChild.nextElementSibling);
    }
  }
}

function renderDescription(descript) {
  return descript
    ? `<span class="taskbar__descript">
  <span class="taskbar__descript-link"
  >${descript}</span
  >
  </span>`
    : ``;
}

function renderPriorityBorder(priority){
  switch (priority) {
    case 1:
      return `taskbar__content--onePriority`;
    case 2:
      return `taskbar__content--twoPriority`;
    case 3:
      return `taskbar__content--threePriority`;
    default:
      return ``
  }
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
  if(!tags.length){
    return `<div>Add Tag</div>`
  }
  let string = ``;
  string = tags.reduce((p, n) => {
    return p.concat(
      `<div class="taskbar__tag taskbar__tag--${n.color}">${n.name}</div>`
    );
  }, string);
  return string;
}

export const taskRenderer = (function () {
  let lastfunction;

  const reRender = function () {
    lastfunction();
  };

  const setLastFunction = function (callback) {
    lastfunction = () => callback();
  };

  return { render, renderUpcoming, reRender, setLastFunction };
})();
