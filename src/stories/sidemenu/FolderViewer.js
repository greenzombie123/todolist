import { taskRenderer } from "../../render";
import { folderManager, SeeTasks } from "../../todo";
import { createFolderNav } from "./FolderNav";

export const createFolderViewer = function ({ renderFolder }) {
  const folders = folderManager.getAllFolders();

  const folderViewer = document.createElement("div");
  folderViewer.classList.add("folderviewer");

  folderViewer.insertAdjacentHTML(
    "afterbegin",
    '<h2 class="folderviewer__title">Projects</h2>'
  );

  const folderNav = createFolderNav({
    folders,
    renderFolder,
    listName: "folderviewer__folderlist",
    listItemName: "folderviewer__folder",
  });

  folderViewer.appendChild(folderNav);

  return folderViewer;
};
