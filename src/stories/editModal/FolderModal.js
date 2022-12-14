import { createFolderOptions } from "../../edit";

export const createFolderModal = ({ foldername = "Inbox", onClick }) => {
  const folderSelect = document.createElement("select");
  folderSelect.classList.add("task-create__folder-selection");
  createFolderOptions(folderSelect, foldername);
  folderSelect.addEventListener("click", onClick)
  return folderSelect
};
