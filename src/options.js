import {
  getOverlay,
  positionModal,
  setOverlay,
  toggleOverlay,
} from "./helpers";
import { resetTaskView, taskRenderer } from "./render";
import { createFolderOptions } from "./stories/sidemenu/FolderOptions";
import { Default as FolderOptions } from "./stories/sidemenu/FolderOptions.stories";
import { createFolderViewer } from "./stories/sidemenu/FolderViewer";
import { SeeTasks } from "./todo";

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
