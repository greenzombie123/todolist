export const createFolderList = ({
  folders = [{ name: "Jokes", color: "orange" }],
}) => {
  const folderList = document.createElement("ul");

  folders.forEach((folder) => {
    const {name, color} = folder
    const listItem = document.createElement('li');
    listItem.textContent = name
  });
};
