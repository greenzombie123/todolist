import { TaskCreater } from "./modules/TaskCreater.js";
import { Editor } from "./modules/Editor.js";
import { TaskViewer } from "./modules/TaskViewer.js";
import { ProjectManager } from "./modules/ProjectManager.js";
import { TagManager } from "./modules/TagManager.js";
import mitt from "./node_modules/mitt";

const emitter = new mitt();

class EventManager extends mitt {
  static events = [];

  static on = function (type, handler) {
    this.on(type, handler);
  };

  static emit = function (type, evt) {
    this.emit(type, evt);
  };
}

emitter.on("taskEdited", TaskViewer.viewAllTasks);
emitter.on("changedProject", TaskViewer.viewAllTasks);
emitter.on("addedTag", TaskViewer.viewAllTasks);

function pageLoad() {
  ProjectManager.createProject("Inbox");
  ProjectManager.changeToCurrent("Inbox");
  TagManager.createTag("Quick", "blue");

  TaskCreater.createTask(
    "20 minute Workout",
    "Workout",
    "Today 8:30pm 2022",
    "Inbox",
    null,
    null
  );
  TaskCreater.createTask(
    "Go shopping",
    "Head over to the supermarket after work",
    "Dec 15 8:30pm 2022",
    "Inbox",
    ["Quick"],
    4
  );
  TaskViewer.viewAllTasks();
  Editor.editName(1, "30 Minute Workout");
  Editor.editDate(1, "Today");
  // Editor.editTags(1, "Today")

  TagManager.seeAllTags();
}

pageLoad();
// TaskViewer.viewAllTasks()
