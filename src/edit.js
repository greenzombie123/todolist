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
import { taskRenderer } from "./render";
import format from "date-fns/format";
import {
  positionModal,
  resetModal,
  setOverlay,
  toggleModal,
  toggleOverlay,
} from "./helpers";

export function setEditDateModal(task, datelink) {
  const link = datelink;

  link.addEventListener("click", function () {
    let dateContainer = createEditDateContainer();
    const dateInput = dateContainer.querySelector(
      ".editbox .task-create__date-input"
    );
    const timeInput = dateContainer.querySelector(
      ".editbox .task-create__time-input"
    );
    timeInput.addEventListener("change", (e) => {
      editDate(task.name);
    });
    dateInput.addEventListener("change", (e) => {
      editDate(task.name);
      toggleOverlay();
    });
    setDateInputValues(task);
    setOverlay();
    toggleOverlay();
    positionModal(datelink, dateContainer);
  });
}

export function setDateInputValues(task) {
  const date = formatDateForInput(task.date);
  const dateInput = document.querySelector(
    ".main-overlay .task-create__date-input"
  );
  const timeInput = document.querySelector(
    ".main-overlay .task-create__time-input"
  );
  dateInput.value = date.dateString;
  timeInput.value = date.timeString;
}

function editDate(taskname) {
  const dateInput = document.querySelector(
    ".main-overlay .task-create__date-input"
  );
  const timeInput = document.querySelector(
    ".main-overlay .task-create__time-input"
  );

  const date = formatDateForTask(dateInput.value, timeInput.value);
  Editor.editTaskDate(taskname, ...date);
  taskRenderer.reRender();
}

export function formatDateForInput(date) {
  const timeString = format(date, "kk':'mm");
  const dateString = format(date, "yyyy'-'MM'-'dd");

  return { timeString, dateString };
}

export function formatDateForTask(date, time) {
  const day = parseInt(date.slice(8)) || null;
  const hours = parseInt(time.slice(0, 3)) || undefined;
  const minutes = parseInt(time.slice(3)) || undefined;
  const month = parseInt(date.slice(5, 7)) || null;
  const year = parseInt(date.slice(0, 4)) || null;

  return [day, hours, minutes, month, year];
}

export function createEditDateContainer() {
  const overlay = document.querySelector(".main-overlay");
  const string = `
  <div class="editbox">
  <div
  class="task-create__date-container"
>
  <label class="task-create__date-container__date-label" for="date"
    >Deadline</label
  >
  <label class="task-create__date-container__time-label" for="time"
    >Time</label
  >
  <input type="date" name="date" class="task-create__date-input" />

  <input
    type="time"
    name="time"
    class="task-create__time-input"
  />
</div>
  </div>
  `;
  overlay.insertAdjacentHTML("afterbegin", string);
  return document.querySelector(".editbox");
}

//* Tag

export function setEditTagModal(task, tagdiv) {
  //const tagdiv = document.querySelector('.main-overlay .taskbar__tagsection');

  tagdiv.addEventListener("click", function (e) {
    const tagList = createTagList(task.tags);
    setOverlay(() => editTags(task.name));
    toggleOverlay();
    positionModal(tagdiv, tagList);
  });
}

export function createTagList(tags) {
  const overlay = document.querySelector(".main-overlay");
  const string = `<ul class="task-create__taglist"></ul>`;

  overlay.insertAdjacentHTML("afterbegin", string);

  const tagList = document.querySelector(".main-overlay .task-create__taglist");

  createTagListItems(tags, tagList);

  return tagList;
}

function createTagListItems(taskTags, taglist) {
  const tags = tagManager.getAllTags();
  tags.forEach((tag) => {
    const string = `<li
    class="task-create__tag-listitem task-create__tag-listitem--${tag.color}"
  >
    <label for="" class="task-create__tagname">${tag.name}</label
    ><input
      type="checkbox"
      name="tagname"
      id="tagname"
      class="task-create__tag-checkbox"
      value="${tag.name}"
      ${taskTags.some((taskTag) => taskTag.name === tag.name) ? `checked` : ``}
    />
  </li>`;

    taglist.insertAdjacentHTML("beforeend", string);
  });
}

export function getTagNames() {
  const tagListItems = document.querySelectorAll(
    ".main-overlay .task-create__tag-checkbox"
  );
  const tagnames = [];
  tagListItems.forEach((listItem) => {
    if (listItem.checked) tagnames.push(listItem.value);
  });
  return tagnames;
}

function editTags(taskname) {
  Editor.removeTags(taskname);
  const tagnames = getTagNames();
  Editor.addNewTags(taskname, tagnames);
  taskRenderer.reRender();
}

//* Priority

export function setEditPriorityModal(task, pri) {
  pri.addEventListener("click", function (e) {
    const priSel = createPrioritySelection();
    priSel.addEventListener("click", (e) =>
      editPriority(task.name, e.currentTarget.value)
    );
    setOverlay();
    toggleOverlay();
    positionModal(pri, priSel);
  });
}

export function createPrioritySelection() {
  const overlay = document.querySelector(".main-overlay");
  const string = `<select
  name="priority"
  id="priority"
  class="task-create__priority-selection"
>
  <option value="1" class="task-create__priorityoption">1</option>
  <option value="2" class="task-create__priorityoption">2</option>
  <option value="3" class="task-create__priorityoption">3</option>
  <option value="4" class="task-create__priorityoption">4</option>
</select>`;

  overlay.insertAdjacentHTML("beforeend", string);

  const priSel = document.querySelector(
    ".main-overlay .task-create__priority-selection"
  );

  return priSel;
}

function editPriority(taskname, priority) {
  Editor.editTaskPriority(taskname, parseInt(priority));
  taskRenderer.reRender();
  toggleOverlay();
}

//* Folder
//taskbar__folder-link
export function setEditFolderModal(task, folderLink) {

  folderLink.addEventListener('click', function(e){
    const folSel = createFolderSelection(task.name)
    folSel.addEventListener('click', (e)=>changeFolder(task.name, e.currentTarget.value))
    setOverlay()
    toggleOverlay()
    positionModal(folderLink, folSel)
  })
}

function changeFolder(taskname, foldername) {
  Editor.changeFolder(taskname, foldername)
  taskRenderer.reRender();
  toggleOverlay();
}

export function createFolderSelection(foldername) {
  const overlay = document.querySelector(".main-overlay");
  const string = `<select
  name="folder"
  id="folder"
  class="task-create__folder-selection "
>
  
    Inbox
  </option>
</select>`;

  overlay.insertAdjacentHTML("beforeend", string);

  const folSel = document.querySelector(
    ".main-overlay .task-create__folder-selection"
  );

  createFolderOptions(folSel, foldername)

  return folSel;
}

export function createFolderOptions(folderSelection, taskFolderName){
  const folders = folderManager.getAllFolders();
  folders.forEach((folder) => {
    const option = document.createElement("option");
    option.setAttribute("value", `${folder.name}`);
    option.classList.add("task-create__folder-option");
    option.style.setProperty("color", `${folder.color}`);
    option.textContent = folder.name;
    folderSelection.appendChild(option);
    if(folder.name === taskFolderName)option.setAttribute("selected", '')
  });
}
