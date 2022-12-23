import { createEditModalOverlay } from "./editmodal";
import {
  changeOverlay,
  deleteModal,
  getOverlay,
  positionModal,
  setOverlay,
  toggleOverlay,
} from "./helpers";
import { resetTaskView, taskRenderer } from "./render";
import { createConfirmBox } from "./stories/editModal/ConfirmationBox";
import { createChooseList } from "./stories/sidemenu/ChooseList";
import { createFolderCreater } from "./stories/sidemenu/FolderCreater";
import { createFolderNav } from "./stories/sidemenu/FolderNav";
import { createFolderOptions } from "./stories/sidemenu/FolderOptions";
import { Default as FolderOptions } from "./stories/sidemenu/FolderOptions.stories";
import { createFolderViewer } from "./stories/sidemenu/FolderViewer";
import { FolderActions, folderManager, SeeTasks, TaskActions } from "./todo";

export function openFolderOptions(button) {
  const folderOptions = createFolderOptions(FolderOptions.args);
  const overlay = getOverlay(folderOptions);
  setOverlay();
  toggleOverlay();
  positionModal(button, folderOptions, "right", null, -50);
  setFolderOptions();
}

function setFolderOptions() {
  const seeFoldersButton = document.querySelector(
    ".folderoptions__item--seeFolder"
  );

  seeFoldersButton.addEventListener("click", seeFolders);

  const createFolderButton = document.querySelector(
    ".folderoptions__item--createFolder"
  );

  createFolderButton.addEventListener("click", openCreateFolder);

  const editFolderButton = document.querySelector(
    ".folderoptions__item--editFolder"
  );

  editFolderButton.addEventListener("click", openChooseFolderList);

  const deleteFolderButton = document.querySelector(
    ".folderoptions__item--deleteFolder"
  );

  deleteFolderButton.addEventListener("click", openFolderDelete);
}

function seeFolders() {
  resetTaskView(false);
  const taskView = document.querySelector(".taskview");
  const renderFolder = (name) => {
    SeeTasks.seeFolder(name);
    taskRenderer.render();
  };
  const folderViewer = createFolderViewer({ renderFolder });
  taskView.appendChild(folderViewer);
  toggleOverlay();
}

function openCreateFolder() {
  toggleOverlay();

  const createFolder = () => {
    const newFolder = getValuesFromCreateModal();
    //TODO Check Name
    FolderActions.createNewFolder(newFolder.name, newFolder.color);
    toggleOverlay();
    changeOverlay("main-overlay--center");
    changeFolderNav();
  };
  const folderCreater = createFolderCreater({ createFolder });
  getOverlay(folderCreater);
  changeOverlay("main-overlay--center");
  setOverlay(() => changeOverlay("main-overlay--center"));
  toggleOverlay();
}

export function getValuesFromCreateModal() {
  const folderCreater = document.querySelector(".createmodal");
  const nameInput = folderCreater.querySelector(".createmodal__nameinput");
  const chosenColorItem = folderCreater.querySelector(
    ".createmodal__color-item--chosen"
  );

  return { name: nameInput.value, color: chosenColorItem.dataset.color };
}

//TODO Do something at some point
function checkName(name) {
  const isThere = folderManager.checkName(name);
}

//TODO Do something at some point
function reportError(formControlName, message) {
  const formControl = document.querySelector(formControlName);
  formControl.classList.toggle(`${formControlName}--error`);
}

function changeFolderNav() {
  const oldFolderNav = document.querySelector(".side-menu__bottom");
  const newFolderNav = createFolderNav({
    folders: folderManager.getAllFolders(),
    renderFolder: (name) => {
      SeeTasks.seeFolder(name);
      taskRenderer.render();
    },
  });
  oldFolderNav.replaceWith(newFolderNav);
}

//* Edit Folder
function openChooseFolderList() {
  toggleOverlay();

  const openEditModal = () => {
    const folder = getFolderFromList();
    toggleOverlay();
    changeOverlay("main-overlay--center");
    createEditModal(folder);
  };

  const chooseList = createChooseList({
    openEditModal,
    chooseItem: toggleChosen,
    change: true,
  });
  getOverlay(chooseList);
  changeOverlay("main-overlay--center");
  setOverlay(() => changeOverlay("main-overlay--center"));
  toggleOverlay();
}

export function toggleChosen(e) {
  const listItems = document.querySelectorAll(
    ".chooseList .chooseList__folder"
  );
  listItems.forEach((listItem) =>
    listItem.classList.remove("chooseList__folder--chosen")
  );
  e.target.classList.toggle("chooseList__folder--chosen");
}

function getFolderFromList() {
  const chosen = document.querySelector(".chooseList__folder--chosen");
  const folderName = chosen.textContent;
  const folder = folderManager.getFolder(folderName);
  return folder;
}

function createEditModal({ name, color }) {
  const createFolder = () => {
    const { name: newName, color: newColor } = getValuesFromCreateModal();
    FolderActions.editAFolder(name, newName, newColor);
    toggleOverlay();
    changeOverlay("main-overlay--center");
    changeFolderNav();
    taskRenderer.reRender();
  };
  const editFolderModal = createFolderCreater({ createFolder, name, color });
  getOverlay(editFolderModal);
  changeOverlay("main-overlay--center");
  setOverlay(() => changeOverlay("main-overlay--center"));
  toggleOverlay();
}

//* Delete Folder

function openFolderDelete() {
  toggleOverlay();

  const chooseList = createChooseList({
    openEditModal:openConfirmationBox,
    chooseItem: toggleChosen,
    change: true,
    headingText:"Choose a folder to delete.",
    buttonText:"Delete"
  });
  getOverlay(chooseList);
  changeOverlay("main-overlay--center");
  setOverlay(() => changeOverlay("main-overlay--center"));
  toggleOverlay();
}

function openConfirmationBox() {
  const folder = getFolderFromList();
  const args = {
    headingText: "Do you want to delete this folder?",
    onClickYes: () => deleteFolder(folder),
    onClickNo: () => cancelConBox(),
    chosenText:folder.name
  };
  const confirmBox = createConfirmBox(args);
  toggleOverlay();
  // changeOverlay("main-overlay--center");
  getOverlay(confirmBox)
  setOverlay(() => changeOverlay("main-overlay--center"));
  toggleOverlay();
}


function deleteFolder({ name }) {
  //TODO Inplement a better alternative
  FolderActions.deleteAFolder(name);
  toggleOverlay();
  changeOverlay("main-overlay--center")
  changeFolderNav()
  taskRenderer.reRender()
}

export function cancelConBox() {
  toggleOverlay();
}
