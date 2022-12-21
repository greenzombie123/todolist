import { folderManager } from "../../todo";
import { createFolderNav } from "./FolderNav";

export const createChooseList = ({
  openEditModal,
  chooseItem,
  headingText = "Choose a folder to edit",
  buttonText = "Edit",
  change = false
}) => {
  const chooseList = document.createElement("div");
  chooseList.classList.add("chooseList");

  const heading = document.createElement("h2");
  heading.classList.add("chooseList__heading");
  heading.textContent = headingText;

  const folders = folderManager.getAllFolders();
  const listName = "chooseList__bottom";
  const listItemName = "chooseList__folder";

  const list = createFolderNav({
    folders,
    renderFolder: chooseItem,
    listName,
    listItemName,
    change
  });

  const button = document.createElement("button");
  button.classList.add("chooseList__button");
  button.textContent = buttonText;
  button.addEventListener('click', openEditModal)

  chooseList.appendChild(heading);
  chooseList.appendChild(list);
  chooseList.appendChild(button);

  return chooseList;
};
