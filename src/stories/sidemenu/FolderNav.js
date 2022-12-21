export const createFolderNav = ({
  folders = [{ name: "Work", color: "blue" }],
  renderFolder,
  listName = null,
  listItemName = null,
  change = false
}) => {
  const folderNav = document.createElement("ul");
  folderNav.classList.add(listName || "side-menu__bottom");

  folders.forEach((folder) => {
    const { name, color } = folder;
    if (name === "Inbox") return;
    const listItem = document.createElement("li");
    listItem.classList.add(listItemName || "side-menu__folder");
    listItem.textContent = name;
    listItem.style.setProperty("--color", color);
    // listItem.addEventListener('click', ()=>renderFolder(name))
    if (!change)
      listItem.addEventListener("click", () => renderFolder(name));
    else listItem.addEventListener("click", renderFolder);
    folderNav.appendChild(listItem);
  });

  return folderNav;
};
