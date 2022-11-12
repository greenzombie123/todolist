import _ from "lodash";
import mitt from "mitt";

const emitter = new mitt();

class Task {
  name;
  descript;
  date;
  folder;
  priority;
  tags;
  overdue;
  complete;
  constructor(name, descript, date, folder, priority, tags) {
    this.name = name;
    this.descript = descript;
    if (!date) {
      this.date = new Date();
      this.date.setHours(23, 59, 59);
    } else this.date = date;
    this.folder = folder || "Inbox";
    this.priority = priority || 4;
    this.tags = tags || [];
  }
}

class Folder {
  tasks = [];
  name;
  color;
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  getTasks() {
    return this.tasks;
  }
}

class Tag {
  name;
  color;
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

class TaskData {
  name = null;
  descript = null;
  date = null;
  folder = null;
  priority = null;
  tags = [];

  setDate(
    day = null,
    hours = 23,
    minutes = 59,
    period = "pm",
    month = null,
    year = null
  ) {
    const date = new Date();
    if (day < 32 && day > 0) date.setDate(day);
    if (hours < 13 && hours > 0 && period) {
      if (period === "am" && hours === 12) date.setHours(0);
      else if (period === "am" && hours < 12) date.setHours(hours);
      else if (period === "pm" && hours === 12) date.setHours(12);
      else if (period === "pm" && hours < 12) date.setHours(hours + 12);
    }
    if (minutes < 60 && minutes > 0) date.setMinutes(minutes);
    if (month) if (month < 13 && month > 0) date.setMonth(month - 1);
    if (year) date.setFullYear(year);
    this.date = date;
  }
  setFolder(name, fm) {
    const isThere = fm.checkName(name);
    if (isThere) {
      console.log("Folder exist");
      this.folder = name;
    } else {
      console.log("Folder exist");
      this.folder = name;
    }
  }
  setPriority(number) {
    if (number > 0 && number < 5) {
      this.priority = number;
      console.log(number);
    } else console.log("Enter correct number");
  }
  setTag(name, tm) {
    const isThere = tm.checkTag(name);
    if (isThere) {
      console.log("Tag exist");
      this.tags.push(tm.getTag(name));
    } else {
      console.log("No tag of that name exit");
    }
  }
  setName(name) {
    this.name = name;
  }
  setDescript(descript) {
    this.descript = descript;
  }
  getDate() {
    return date;
  }
  getFolder() {
    return this.folder;
  }
  getPriority() {
    return this.priority;
  }
  getTags() {
    return this.tags;
  }
  getName() {
    return this.name;
  }
  getDescript() {
    return this.descript;
  }
  getDate() {
    return this.date;
  }

  reset = () => {
    this.name = null;
    this.descript = null;
    this.date = null;
    this.folder = null;
    this.priority = null;
    this.tags = [];
  };
}

class ColorStorage {
  colors = ["red"];
  checkColor(color) {}
}

class FolderManager {
  folders = [];
  currentTasks = [];
  inbox;
  constructor() {
    this.inbox = new Folder("Inbox", "black");
    this.inbox.tasks.push(new Task("Do laundry"));
    this.folders.push(new Folder("Private", "green"))
  }
  //Place in folder
  insertTaskToFolder = (task) => {
    const folder = this.getFolder(task.folder);
    // console.log(folder);
    folder.tasks.push(task);
    emitter.emit("rerender");
  };
  insertFolder() {}
  getFolder(name) {
    const folders = this.getAllFolders();
    return folders.find((folder) => folder.name == name);
  }
  getAllFolders() {
    return [...this.folders, this.inbox];
  }

  checkName(name) {
    const folders = this.getAllFolders();
    return folders.some((folder) => folder.name == name);
  }
}

class TagManager {
  tags = [
    new Tag("Stuff", "blue"),
    new Tag("Work", "green"),
    new Tag("School", "yellow"),
  ];

  insertTag() {}
  getAllTags() {
    return this.tags;
  }
  getTag(name) {
    const tags = this.getAllTags();
    return tags.find((tag) => tag.name === name);
  }
  checkTag(name) {
    const tags = this.getAllTags();
    return tags.some((tag) => tag.name === name);
  }
  CheckHasTag(task, tagNames) {
    return task.tags.some((tag) =>
      tagNames.forEach((tagName) => tagName === tag.name)
    );
  }
  seeAllTags() {}
}

//TODO Set up current view functionality

function seeTaskByFolder(name, fm, tv) {
  const folder = fm.getFolder(name);
  tv.currentTasks = folder.tasks.map((task) => task);
  //change current name
  tv.currentName = folder.name;
  //rerender
  tv.lastSeeTaskFunc = seeTaskByFolder;
  tv.render();
}

class TaskViewer {
  currentName;
  currentTasks = [];
  upcomingTasks = {};
  lastSeeTaskFunc;
  constructor(tasks, name) {}
  render() {
    console.log(`${this.currentName}`);
    this.currentTasks.forEach(function (task) {
      console.log(
        `${task.name}\n${task.descript ? `${task.descript}` : ""} \n${
          task.date
        } ${task.folder} Tags:${task.tags.reduce(
          (p, n) => `${p} ${n.name}`,
          ""
        )} ${task.priority}`
      );
    });
  }
  renderUpcoming() {}
  getCurrentTask(name) {
    return this.currentTasks.find((task) => task.name === name);
  }
  getAllCurrentTasks() {
    return this.currentTasks;
  }
  getCurrentName() {}
}

function update() {}

function createTask(taskdata) {
  if (taskdata.getName() === undefined) {
    console.log("Enter name!");
    return;
  }
  const name = taskdata.getName();
  const descript = taskdata.getDescript();
  const date = taskdata.getDate();
  const folder = taskdata.getFolder();
  const priority = taskdata.getPriority();
  const tags = taskdata.getTags();
  const task = new Task(name, descript, date, folder, priority, tags);
  console.log(task);
  emitter.emit("taskCreated", { task });
}

function deleteTask(name, taskViewer, folderManager) {
  const deltask = taskViewer.getCurrentTask(name);
  const folder = folderManager.getFolder(deltask.folder);
  _.remove(folder.tasks, (task) => task.name === deltask.name);
  console.log(folder.tasks);
  emitter.emit("rerender");
}

class Editor {
  editName(name, newName, taskViewer) {
    const task = taskViewer.getCurrentTask(name);
    task.name = newName;
    emitter.emit("rerender");
  }
  editDescript(name, newDescript, taskViewer) {
    const task = taskViewer.getCurrentTask(name);
    task.descript = newDescript;
    emitter.emit("rerender");
  }
  addTags(taskName, tagNames, tv, tm) {
    const task = tv.getCurrentTask(taskName);
    const tagnames = [...tagNames];
    for (let index = 0; index < tagnames.length; index++) {
      const isThere = tm.checkTag(tagnames[index]);
      const hasTag = task.tags.some((tag) => tag.name === tagnames[index].name);
      if (!isThere || hasTag) {
        console.log("Tag is not here!");
        return;
      }
    }
    tagnames.forEach((tagname) => task.tags.push(tm.getTag(tagname)));
    emitter.emit("rerender");
  }
  removeTags(taskName, tagNames, tv, tm) {
    const task = tv.getCurrentTask(taskName);
    const tagnames = [...tagNames];
    for (let index = 0; index < tagnames.length; index++) {
      const isThere = tm.checkTag(tagnames[index]);
      const hasTag = task.tags.some((tag) => tag.name === tagnames[index].name);
      if (!isThere || hasTag) {
        console.log("Tag is not here!");
        return;
      }
    }
    tagnames.forEach((tagname) =>
      _.remove(task.tags, (tag) => tag.name === tagname)
    );
    emitter.emit("rerender");
  }
  editDate(taskName, tv, day, hours, minutes, period, month, year) {
    const task = tv.getCurrentTask(taskName);
    if (day < 32 && day > 0) task.date.setDate(day);
    if (hours < 13 && hours > 0 && period) {
      if (period === "am" && hours === 12) task.date.setHours(0);
      else if (period === "am" && hours < 12) task.date.setHours(hours);
      else if (period === "pm" && hours === 12) task.date.setHours(12);
      else if (period === "pm" && hours < 12) task.date.setHours(hours + 12);
    }
    if (minutes < 60 && minutes > 0) task.date.setMinutes(minutes);
    if (month) if (month < 13 && month > 0) task.date.setMonth(month - 1);
    if (year) task.date.setFullYear(year);
    emitter.emit("rerender");
  }
  editPriority(taskName, tv, number) {
    const task = tv.getCurrentTask(taskName);
    if (number > 0 && number < 5 && number !==task.priority) {
      task.priority = number;
      emitter.emit("rerender");
    } else console.log("Enter correct number");
  }
  changeFolder(taskName, newFolder, tv, fm) {
    const task = tv.getCurrentTask(taskName);
    const folder = fm.getFolder(task.folder)
    const hasFolder = fm.checkName(newFolder)
    hasFolder
    const IsInFolder = folder.name === newFolder
    IsInFolder
    if(hasFolder && !IsInFolder){
      task.folder = newFolder
      _.remove(folder.tasks, (task)=>task.name === taskName)
      const newfolder = fm.getFolder(newFolder)
      newfolder.tasks.push(task)
      emitter.emit("rerender")
    }
    else
      console.log("WRONG!");
  }
}

const folderManager = new FolderManager();
const tagManager = new TagManager();
const taskData = new TaskData();
const taskViewer = new TaskViewer();
const editor = new Editor();

emitter.on("taskCreated", (e) => {
  folderManager.insertTaskToFolder(e.task);
});
emitter.on("taskCreated", taskData.reset);
emitter.on("rerender", () =>
  taskViewer.lastSeeTaskFunc(taskViewer.currentName, folderManager, taskViewer)
);

seeTaskByFolder("Inbox", folderManager, taskViewer);

taskData.setDate(15, 7, 5, "pm", 1, 2060);
taskData.setFolder("Inbox", folderManager);
taskData.setDescript("DO it!");
taskData.setName("Hello!");
taskData.setTag("Stuff", tagManager);
taskData.setPriority(2);
createTask(taskData);

editor.editName("Hello!", "Buy!", taskViewer);
editor.addTags("Do laundry", ["Work", "School"], taskViewer, tagManager);
editor.removeTags("Do laundry", ["Work", "School"], taskViewer, tagManager);
editor.editDate("Do laundry", taskViewer, 13, 4, 15, "pm");
editor.editPriority("Do laundry", taskViewer, 1)
editor.changeFolder("Do laundry", "Private", taskViewer, folderManager)
console.log(folderManager.folders[0]);
// console.log(taskViewer.currentTasks);

// deleteTask("Do laundry", taskViewer, folderManager);
// console.log(folderManager.inbox);

// taskViewer
