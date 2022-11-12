import Folder from "../Models/Folder";
import Tag from "../Models/Tag";
import { Task } from "../Models/Task";

export default class FolderManager {
  folders = [];
  inbox;
  completed;

  constructor() {
    this.inbox = new Folder("Inbox", "blue");
    this.completed = new Folder("Completed", "yellow");
    this.folders.push(new Folder("Inbox", "green"));

    this.inbox.tasks.push(
      new Task("Get some milk", null, "Tomorrow 12:34", "Inbox", 4, [
        new Tag("Stuff", "blue"),
      ])
    );
  }
  insertTask(task) {
    const folder = this.getFolder(task.folder);
    folder.tasks.push(task);
    console.log(`Inserted ${task.name} into ${folder.name}`);
  }
  insertFolder(project) {}
  findDisplayedTask() {}
  getAllFolders() {
    return [...this.folders, this.inbox];
  }
  getFolder(name) {
    const folders = [...this.folders, this.inbox];
    return folders.find((folder) => folder.name === name);
  }
  setDisplayedTasks(){
    
  }
  seeAllFolders() {}
  getAllTasks() {}
}
