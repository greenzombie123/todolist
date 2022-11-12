import { Task } from "../Models/Task";

export default class TaskCreater {
  constructor(
    nameSelector,
    dateSelector,
    folderSelector,
    prioritySelector,
    tagSelector
  ) {
    this.nameSelector = nameSelector;
    this.dateSelector = dateSelector;
    this.folderSelector = folderSelector;
    this.prioritySelector = prioritySelector;
    this.tagSelector = tagSelector;
  }

  createTask() {
    if (this.nameSelector.getName() === undefined) {
      console.log("Enter name!");
      return;
    }
    const name = this.nameSelector.getName();
    const descript = this.nameSelector.getDescript();
    const date = this.dateSelector.getDate();
    const folder = this.folderSelector.getFolder();
    const priority = this.prioritySelector.getPriority();
    const tags = this.tagSelector.getTags();
    const task = new Task(name, descript, date, folder, priority, tags);
    console.log(task);
    return task;
  }
}
