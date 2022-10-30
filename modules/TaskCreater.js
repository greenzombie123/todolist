import { Task } from "./Task.js";

export class TaskCreater {
    static idCounter = 1;
  
    static createTask(name, descript, date, project, tags, priority) {
      if (tags === [] || tags.forEach((tag) => TagManager.checkTagList(tag))) {
        return;
      }
  
      const task = new Task(name, descript, date, project, tags, priority);
      task.id = this.idCounter;
      this.idCounter++;
      ProjectManager.insertToProject(task);
      console.log(`Task inserted into ${task.project}`);
    }
  }