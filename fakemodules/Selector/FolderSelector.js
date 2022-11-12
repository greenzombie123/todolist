export default class FolderSelector {
  folderName = null
  constructor(foldermanager) {
    this.foldermanager = foldermanager;
  }

  selectFolder(name) {
    if (!this.checkFolderName()) {
      this.folderName = name;
      console.log(`Selected ${this.folderName}`);
    } else console.log(`There is no folder with the name '${name}'`);
  }

  checkFolderName(name) {
    const folders = this.foldermanager.getAllFolders();
    return folders.some((folder) => folder.name === name);
  }

  getFolder() {
    return this.folderName;
  }

  resetValues(){
    this.folderName = null
    console.log(`${this.folderName === null ? "Folder Selector was reset" : "Error!"}`);
  }
}
