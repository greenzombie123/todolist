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
import { resetModal, toggleOverlay, transformOverlay } from "./helpers";

//* Task Create

export function openTaskCreateModal() {
  const taskCreate = createTaskCreateModal();
}

export function openCreateTask() {
  const createTask = document.querySelector(".task-create");
  console.log(12);
  setDate();
  setPriority();
  setFolder();

  createTask.showModal();
}

function closeCreateTask(){
  toggleOverlay()
}

function createNewTask() {
  TaskActions.makeNewTask();
  resetTaskCreate();
  closeCreateTask();
  taskRenderer.reRender();
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

// function checkName(name) {
//   const folders = folderManager.getAllFolders();
//   let tasks = folders.map((folder) => folder.tasks.forEach((task) => task));

//   const hasName = tasks.some((task) => task.name === name);

//   return hasName;
// }

//* Task Create

function setName(e) {
  TaskCreate.setName(e.currentTarget.value);
}

function setDescript(e) {
  TaskCreate.setDescript(e.currentTarget.value);
}

//* Tags

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
  priSel.addEventListener("change", changePriority);
}

function changePriority(e) {
  const priorityLabel = document.querySelector(".task-create__priority");
  priorityLabel.textContent = e.currentTarget.value;
  setPriority();
  hidePrioritySelection();
}

function setPriority() {
  const priorityLabel = document.querySelector(".task-create__priority");
  TaskCreate.setPriority(parseInt(priorityLabel.textContent));
}

function resetOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.replaceWith(overlay.cloneNode(false));
}

//* Folder

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
  folderSelection.addEventListener("click", changeFolder, { once: true });
}

function changeFolder(e) {
  const folderLabel = document.querySelector(".task-create__folder");
  folderLabel.textContent = e.currentTarget.value;
  setFolder();
  hideFolderSelection();
}

function setFolder() {
  const folderLabel = document.querySelector(".task-create__folder");
  TaskCreate.setFolder(folderLabel.textContent);
}

//* Date

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
  setDateOnTaskCreate();
}

function setDateOnTaskCreate() {
  const datelabel = document.querySelector(".task-create__date");
  const date = TaskCreate.getDate();
  const today = new Date();
  if (date.getDate() === today.getDate()) {
    datelabel.textContent = format(
      date,
      `'Today' ${date.getHours() === 23 && date.getMinutes() === 59 ? "" : "p"}`
    );
  } else {
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
  resetModal(dateContainer, true);
  closeOverlay();
}

function formatDate(date, time) {
  const day = parseInt(date.slice(8)) || null;
  const hours = parseInt(time.slice(0, 3)) || undefined;
  const minutes = parseInt(time.slice(3)) || undefined;
  const month = parseInt(date.slice(5, 7)) || null;
  const year = parseInt(date.slice(0, 4)) || null;

  return [day, hours, minutes, month, year];
}

function resetDeadline() {
  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");
  dateInput.value = "";
  timeInput.value = "";
}

//* Refactored

const createTaskCreateModal = () => {
  const taskCreate = document.createElement("div");
  taskCreate.classList.add("task-create");
  const string = `
  <div class="overlay overlay--hidden"></div>
  <form action="" class="task-create__form">
    <div class="task-create__top">
      <label for="name" id="name" class="task-create__name-label"
        >Name</label
      >
      <button class="task-create__cancel-button">X</button>
    </div>

    <input required type="text" name="name" class="task-create__name" />
    <label for="descript" class="task-create__descript-label"
      >Description</label
    >
    <input
      name="descript"
      type="text" id="descript"
      class="task-create__descript"
    ></input>

    <div class="task-create__bottom">
      <button type="button" class="task-create__date-button">Deadline</button>

      <button type="button" class="task-create__tag-button">Tags</button>

      <button type="button" class="task-create__priority-button">Priority</button>

      <button type="button" class="task-create__folder-button">Folder</button>

      <span class="task-create__date">Today</span>

      <div class="task-create__tagcontainer">
        <span class="task-create__tag"
          >Add A Tag</span
        >
      </div>

      <span class="task-create__priority">4</span>

      <span class="task-create__folder">Inbox</span>

    </div>

    <button type="button" class="task-create__create-button">Create</button>
    <div class="poppers">
      <div
        class="task-create__date-container task-create__date-container--hidden"
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
      <ul class="task-create__taglist task-create__taglist--hidden">
        <li
          class="task-create__tag-listitem task-create__tag-listitem--green"
        >
          <label for="" class="task-create__tagname">Work</label
          ><input
            type="checkbox"
            name="tagname"
            id="tagname"
            class="task-create__tag-checkbox"
            value="work"
          />
        </li>
      </ul>
      <select
        name="priority"
        id="priority"
        class="task-create__priority-selection task-create__priority-selection--hidden"
      >
        <option value="1" class="task-create__priorityoption">1</option>
        <option value="2" class="task-create__priorityoption">2</option>
        <option value="3" class="task-create__priorityoption">3</option>
        <option value="4" class="task-create__priorityoption">4</option>
      </select>
      <select
        name="folder"
        id="folder"
        class="task-create__folder-selection task-create__folder-selection--hidden"
      >
        <option value="Inbox" class="task-create__folderoption">
          Inbox
        </option>
      </select>
    </div>
  </form>`;

  taskCreate.insertAdjacentHTML("afterbegin", string);
  transformOverlay({element:taskCreate, center:true})
  setDate();
  setPriority();
  setFolder();

  const createbutton = document.querySelector(".task-create__create-button");
  createbutton.addEventListener("click", createNewTask);

  const nameInput = document.querySelector(".task-create__name");
  const descriptInput = document.querySelector(".task-create__descript");
  nameInput.addEventListener("input", setName);
  descriptInput.addEventListener("input", setDescript);

  const tagbutton = document.querySelector(".task-create__tag-button");
  tagbutton.addEventListener("click", openTaskCreate_TagList);

  const priorityButton = document.querySelector(
    ".task-create__priority-button"
  );
  priorityButton.addEventListener("click", openPrioritySelection);

  const priSel = document.querySelector(".task-create__priority-selection");
  priSel.addEventListener("click", changePriority);

  const folderbutton = document.querySelector(".task-create__folder-button");
  folderbutton.addEventListener("click", openFolderSelection);

  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");
  dateInput.addEventListener("change", setDate);
  timeInput.addEventListener("change", setDate);

  const datebutton = document.querySelector(".task-create__date-button");
  datebutton.addEventListener("click", openDateContainer);

  return taskCreate
};
