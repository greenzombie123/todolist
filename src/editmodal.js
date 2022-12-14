import { format } from "date-fns";
import {
  createEditDateContainer,
  createFolderSelection,
  createPrioritySelection,
  createTagList,
  formatDateForTask,
  getTagNames,
  setDateInputValues,
} from "./edit";
import {
  deleteModal,
  positionModal,
  resetModal,
  setOverlay,
  toggleOverlay,
} from "./helpers";
import { taskRenderer } from "./render";
import { createEditModal } from "./stories/editModal/EditModal";
import FolderModalStories from "./stories/editModal/FolderModal.stories";
import { Editor } from "./todo";

function createEditModalOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("editModal-overlay");
  document.body.appendChild(overlay);
  return overlay;
}

export function setEditModal(namelink, task) {
  const { name, descript, tags: Tags, folder: folderName, priority } = task;
  let { date } = task;
  date = formatDateOnEditModal(date);

  namelink.addEventListener("click", () => {
    const overlay = createEditModalOverlay();
    const editModal = createEditModal({
      name,
      descript,
      date,
      openDate: (e) => {
        openDate(e.currentTarget, task);
      },
      openFolder: (e) => {
        openFolder(e.currentTarget, task);
      },
      openPriority: (e) => {
        openPriority(e.currentTarget, task);
      },
      openTag: (e) => {
        openTag(e.currentTarget, task);
      },
      changeName:(e)=>{changeName(e, task)},
      changeDescript:(e)=>{changeDescript(e, task)},
      closeEditModal: () => {
        deleteModal(overlay);
        taskRenderer.reRender();
      },
      Tags,
      folderName,
      priority,
    });
    overlay.appendChild(editModal);
    overlay.addEventListener("click", (e) => {
      if (e.target !== overlay) return;
      deleteModal(overlay);
      taskRenderer.reRender();
    });
  });
}

function openEditModal() {}
function setDate() {}
function openDateModal() {}

function changeDateText(date) {
  const datelabel = document.querySelector(
    ".editModal-overlay .task-create__date"
  );

  datelabel.textContent = formatDateOnEditModal(date);
}

function formatDateOnEditModal(date) {
  const today = new Date();
  if (date.getDate() === today.getDate()) {
    return format(
      date,
      `'Today' ${date.getHours() === 23 && date.getMinutes() === 59 ? "" : "p"}`
    );
  }

  return format(
    date,
    `MMM do eee ${
      date.getHours() === 23 && date.getMinutes() === 59 ? "" : "p"
    }`
  );
}

function openDate(button, task) {
  let dateContainer = createEditDateContainer();
  const dateInput = dateContainer.querySelector(
    ".editbox .task-create__date-input"
  );
  const timeInput = dateContainer.querySelector(
    ".editbox .task-create__time-input"
  );
  timeInput.addEventListener("change", (e) => {
    editDate(task);
  });
  dateInput.addEventListener("change", (e) => {
    editDate(task);
    toggleOverlay();
  });
  setDateInputValues(task);
  setOverlay();
  toggleOverlay();
  positionModal(button, dateContainer);
}

function editDate(task) {
  const dateInput = document.querySelector(
    ".main-overlay .task-create__date-input"
  );
  const timeInput = document.querySelector(
    ".main-overlay .task-create__time-input"
  );

  const date = formatDateForTask(dateInput.value, timeInput.value);
  Editor.editTaskDate(task.name, ...date);
  changeDateText(task.date);
}

function openTag(button, task) {
  const { tags, name } = task;
  const tagList = createTagList(tags);
  setOverlay(() => editTags(task, name));
  toggleOverlay();
  positionModal(button, tagList);
}

function editTags(task, taskname) {
  Editor.removeTags(taskname);
  const tagnames = getTagNames();
  Editor.addNewTags(taskname, tagnames);
  changeTagContainer(task);
}

function changeTagContainer({ tags }) {
  let tagContainer = document.querySelector(
    ".editModal-overlay .task-create__tagcontainer"
  );
  tagContainer = resetModal(tagContainer);

  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.classList.add("task-create__tag", `task-create__tag--${tag.color}`);
    span.textContent = tag.name;
    tagContainer.appendChild(span);
  });
  if (!tags.length) tagContainer.textContent = "Add A Tag";
}

function openPriority(button, { name }) {
  const priSel = createPrioritySelection();
  priSel.addEventListener("click", (e) => {
    editPriority(name, e.currentTarget.value);
    changePriority(e.currentTarget.value);
  });
  setOverlay();
  toggleOverlay();
  positionModal(button, priSel);
}

function editPriority(taskname, priority) {
  Editor.editTaskPriority(taskname, parseInt(priority));
}

function changePriority(priority) {
  const priorityLabel = document.querySelector(
    ".editModal-overlay .task-create__priority"
  );
  priorityLabel.textContent = priority;
  toggleOverlay();
}

function openFolder(button, { name }) {
  const folderSel = createFolderSelection();
  folderSel.addEventListener("click", (e) => {
    changeFolder(name, e.currentTarget.value);
    changeFolderText(e.currentTarget.value);
  });
  setOverlay();
  toggleOverlay();
  positionModal(button, folderSel);
}

function changeFolder(taskname, foldername) {
  Editor.changeFolder(taskname, foldername);
}

function changeFolderText(folderName) {
  const folderLabel = document.querySelector(
    ".editModal-overlay .task-create__folder"
  );
  folderLabel.textContent = folderName;
  toggleOverlay();
}

function changeName(e, {name}){
    const newName= e.currentTarget.value
    Editor.editTaskName(name, newName)
}

function changeDescript(e, {name}){
    const newDescript= e.currentTarget.value
    Editor.editTaskDescript(name, newDescript)
}
