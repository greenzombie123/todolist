export const createFolderOptions = ({
  seeFolders,
  createFolder,
  editFolder,
  deleteFolder,
}) => {
  const folderOptions = document.createElement("ul");
  folderOptions.classList.add("folderoptions");

  const seeFolderListItem = document.createElement("li");
  seeFolderListItem.classList.add(
    "folderoptions__item",
    "folderoptions__item--seeFolder"
  );
  seeFolderListItem.textContent = "See Folders";
  seeFolderListItem.addEventListener("click", seeFolders);
  folderOptions.appendChild(seeFolderListItem);

  const createFolderListItem = document.createElement("li");
  createFolderListItem.classList.add(
    "folderoptions__item",
    "folderoptions__item--createFolder"
  );
  createFolderListItem.textContent = "Create A Folder";
  createFolderListItem.addEventListener("click", createFolder);
  folderOptions.appendChild(createFolderListItem);

  const editFolderListItem = document.createElement("li");
  editFolderListItem.classList.add(
    "folderoptions__item",
    "folderoptions__item--editFolder"
  );
  editFolderListItem.textContent = "Edit A Folder";
  editFolderListItem.addEventListener("click", editFolder);
  folderOptions.appendChild(editFolderListItem);

  const deleteFolderListItem = document.createElement("li");
  deleteFolderListItem.classList.add(
    "folderoptions__item",
    "folderoptions__item--deleteFolder"
  );
  deleteFolderListItem.textContent = "Delete A Folder";
  deleteFolderListItem.addEventListener("click", deleteFolder);
  folderOptions.appendChild(deleteFolderListItem);

  return folderOptions;
};
