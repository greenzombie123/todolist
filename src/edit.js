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
  let dateContainer = document.querySelector(".task-create__date-container");
  dateContainer = resetModal(dateContainer, true);
  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");

  link.addEventListener("click", function () {
    dateInput.addEventListener("click", () => {
      editDate(task.name);
      toggleModal(dateContainer, "task-create__date-container");
      toggleOverlay();
    });
    timeInput.addEventListener("click", editDate(task.name));
    setDateInputValues(task);
    let callback = () =>
      toggleModal(dateContainer, "task-create__date-container");
    setOverlay(callback);
    positionModal(datelink, dateContainer);
    toggleModal(dateContainer, "task-create__date-container");
  });
}

function setDateInputValues(task) {
  const date = formatDateForInput(task.date);
  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");
  dateInput.value = date.dateString;
  timeInput.value = date.timeString;
}

function editDate(taskname) {
  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");

  const date = formatDateForTask(dateInput.value, timeInput.value);
  Editor.editTaskDate(taskname, ...date);
}

function formatDateForInput(date) {
  const timeString = format(date, "kk':'mm");
  const dateString = format(date, "yyyy'-'MM'-'dd");

  return { timeString, dateString };
}

function formatDateForTask(date, time) {
  const day = parseInt(date.slice(8)) || null;
  const hours = parseInt(time.slice(0, 3)) || undefined;
  const minutes = parseInt(time.slice(3)) || undefined;
  const month = parseInt(date.slice(5, 7)) || null;
  const year = parseInt(date.slice(0, 4)) || null;

  // console.log([day, hours, minutes, period, month, year]);
  return [day, hours, minutes, month, year];
}

function createDateEditContainer() {
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
  return document.querySelector('.editbox');
}
