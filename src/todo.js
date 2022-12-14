import _ from "lodash";
import mitt from "mitt";
import { compareDesc, format, isSameDay } from "date-fns";
// import Fuse from 'fuse.js'

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
    this.date = date;
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

class CreateTask {
  name = null;
  descript = null;
  date = null;
  folder = null;
  priority = null;
  tags = [];

  setDate(day = null, hours = 23, minutes = 59, month = null, year = null) {
    const date = new Date();
    if (day) date.setDate(day);
    date.setHours(hours);
    date.setMinutes(minutes, 0, 0);
    if (month) date.setMonth(month - 1);
    if (year) date.setFullYear(year);
    this.date = date;
  }

  setFolder(name, fm) {
    const isThere = fm.checkName(name);
    if (isThere) {
      this.folder = name;
    } else {
      this.folder = name;
    }
  }
  setPriority(number) {
    if (number > 0 && number < 5) {
      this.priority = number;
    } else console.log("Enter correct number");
  }
  setTag(name, tm) {
    const isThere = tm.checkTag(name);
    if (isThere) {
      this.tags.push(tm.getTag(name));
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
  getTag(tagname) {
    const hasTag = this.tags.some((tag) => tagname === tag.name);
    const tag = this.tags.find((tag) => tag.name === tagname);
    if (hasTag) return tag ? tag : false;
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

  removeTag(tagname) {
    const hasTag = this.tags.some((tag) => tagname === tag.name);
    if (hasTag) {
      _.remove(this.tags, (tag) => tagname === tag.name);
    }
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
  colors = [
    "red",
    "yellow",
    "blue",
    "purple",
    "green",
    "black",
    "orange",
    "pink",
  ];
  checkColor(color) {
    return this.colors.some((storedColor) => storedColor === color);
  }
}

class FolderManager {
  folders = [];
  currentTasks = [];
  inbox;
  completed;
  constructor() {
    this.inbox = new Folder("Inbox", "black");
    this.completed = new Folder("Completed", "black");
    this.inbox.tasks.push(
      new Task("Do laundry", null, new Date(2023, 0, 12, 9, 12), "Inbox", 1, [
        new Tag("Work", "green"),
        new Tag("School", "yellow"),
      ]),
      new Task(
        "Pay bills",
        "Go to Walgreens",
        new Date(2023, 0, 13, 11, 2),
        "Inbox",
        3,
        [new Tag("Work", "green")]
      ),
      new Task(
        "Buy new towel",
        "Oh yeah!",
        new Date(2023, 0, 10, 8, 10),
        null,
        2,
        [new Tag("Stuff", "blue")]
      )
    );
    this.folders.push(
      new Folder("Private", "green"),
      new Folder("Hobby", "purple")
    );
    this.folders[0].tasks.push(
      new Task("Buy shoes", null, new Date(2023, 0, 14, 17, 43), "Private", 1, [
        new Tag("Stuff", "blue"),
      ])
    ),
      this.folders[1].tasks.push(
        new Task(
          "Eat pasta",
          "Do it!",
          new Date(2022, 11, 15, 21, 2),
          "Hobby",
          4,
          [new Tag("School", "yellow")]
        )
      );

    const num = 15;
    for (let index = 0; index < num; index++) {
      const task = new Task(
        "Do things",
        null,
        new Date(2023, 0, 14 + index),
        "Inbox",
        4,
        [new Tag("Stuff", "blue")]
      );
      this.inbox.tasks.push(task);
    }
  }
  //Place in folder
  insertTaskToFolder = (task) => {
    const folder = this.getFolder(task.folder);
    // console.log(folder);
    folder.tasks.push(task);
    emitter.emit("rerender");
  };
  insertFolder(folder) {
    this.folders.push(folder);
  }
  getFolder(name) {
    const folders = this.getAllFolders();
    return folders.find((folder) => folder.name == name);
  }
  getAllFolders() {
    return [...this.folders, this.inbox];
  }

  getCompletedFolder() {
    return this.completed;
  }

  checkName(name) {
    const folders = this.getAllFolders();
    return folders.some((folder) => folder.name == name);
  }

  getAllTasks() {
    const allTasks = [];
    const allFolders = this.getAllFolders();
    allFolders.forEach((folder) =>
      folder.tasks.forEach((task) => allTasks.push(task))
    );
    return allTasks;
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
  setTag(tag) {
    this.tags.push(tag);
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

function seeTasksByInbox(fm, tv) {
  const folder = fm.getFolder("Inbox");
  tv.currentTasks = folder.tasks.map((task) => task);
  tv.currentName = "Inbox";
  tv.lastSeeTaskFunc = () => seeTasksByInbox(fm, tv);
  tv.render();
}

function seeTaskByFolder(name, fm, tv) {
  tv.currentTasks = [];
  const folder = fm.getFolder(name);
  tv.currentTasks = folder.tasks.map((task) => task);
  tv.currentName = folder.name;
  tv.lastSeeTaskFunc = () => seeTaskByFolder(name, fm, tv);
  tv.render();
}

function seeNothing(tv) {
  tv.currentName = "";
  tv.currentTasks = [];
  tv.lastSeeTaskFunc = () => seeNothing(tv);
}

function seeTasksbyTag(tagname, fm, tm, tv) {
  tv.currentTasks = [];
  const isThere = tm.checkTag(tagname);
  if (!isThere) return;
  const folders = fm.getAllFolders();
  const allTasks = [];
  folders.forEach((folder) =>
    folder.tasks.forEach((task) => allTasks.push(task))
  );

  tv.currentTasks = allTasks.filter((task) =>
    task.tags.some((tag) => tag.name === tagname)
  );
  tv.currentName = tagname;
  tv.lastSeeTaskFunc = (e) => {
    seeTasksbyTag(tagname, fm, tm, tv);
  };
  tv.render();
}

function seeTasksbyPriority(number, fm, tv) {
  tv.currentTasks = [];
  const folders = fm.getAllFolders();
  const allTasks = [];
  folders.forEach((folder) =>
    folder.tasks.forEach((task) => allTasks.push(task))
  );

  tv.currentTasks = allTasks.filter((task) => task.priority === number);

  tv.currentName = "Priority" + " : " + number;
  tv.lastSeeTaskFunc = () => seeTasksbyPriority(number, fm, tv);
  tv.render();
}

function seeTasksByToday(fm, tv) {
  const folders = fm.getAllFolders();
  const allTasks = [];
  folders.forEach((folder) =>
    folder.tasks.forEach((task) => allTasks.push(task))
  );

  const today = new Date().getDate();
  tv.currentTasks = allTasks.filter((task) => task.date.getDate() === today);

  tv.currentName = "Today";
  tv.lastSeeTaskFunc = () => seeTasksByToday(fm, tv);
}

function seeTasksByCompleted(fm, tv) {
  const folder = fm.getCompletedFolder;
  tv.completedTasks = folder.tasks.map((task) => task);
  tv.currentName = "Completed";
  tv.lastSeeTaskFunc = () => seeTasksByCompleted(fm, tv);
  tv.renderCompleted();
}

function seeTasksByIncoming(fm, tv) {
  tv.currentTasks = [];
  const folders = fm.getAllFolders();
  const allTasks = [];
  folders.forEach((folder) =>
    folder.tasks.forEach((task) => allTasks.push(task))
  );

  let numberOfDays = 5;
  const upcomingDays = {};

  for (let index = 0; index < numberOfDays; index++) {
    const date = new Date();
    const day = date.getDate();
    date.setDate(day + index + 1);
    upcomingDays[format(date, "iiii")] = [];
    //If isSameDay() returns true, task's date and date of upcoming day is the same
    const tasks = allTasks.filter((task) => isSameDay(task.date, date));
    tasks.forEach((task) => tv.currentTasks.push(task));
    upcomingDays[format(date, "iiii")] = tasks;
  }

  tv.currentName = "Upcoming";

  tv.upcomingTasks = upcomingDays;

  tv.lastSeeTaskFunc = () => seeTasksByIncoming(fm, tv);

  tv.renderUpcoming();
}

const options = {
  threshold: 0.4,
  keys: ["name"],
};

function seeTasksBySearch(pattern, fm, tv) {
  const allTasks = fm.getAllTasks();
  const fuse = new Fuse(allTasks, options);
  const results = fuse.search(pattern);

  tv.currentTasks = results.map((result) => result.item);
  tv.currentName = "Search";
  tv.lastSeeTaskFunc = () => {
    //if()
    seeTasksBySearch(pattern, fm, tv);
  };
}

class TaskViewer {
  currentName;
  currentTasks = [];
  completedTasks = [];
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
  renderUpcoming() {
    const days = Object.getOwnPropertyNames(this.upcomingTasks);

    console.log(`${this.currentName}\n`);
    days.forEach((day) => {
      console.log(`${day}\n`);
      this.upcomingTasks[day].forEach(function (task) {
        console.log(
          `${task.name}\n${task.descript ? `${task.descript}` : ""} \n${
            task.date
          } ${task.folder} Tags:${task.tags.reduce(
            (p, n) => `${p} ${n.name}`,
            ""
          )} ${task.priority}`
        );
      });
    });
  }

  renderCompleted() {}

  getCompletedTask(name) {
    return this.completedTasks.find((task) => task.name === name);
  }

  getCurrentTask(name) {
    return this.currentTasks.find((task) => task.name === name);
  }
  getAllCurrentTasks() {
    return this.currentTasks;
  }
  getCurrentName() {}
}

function createNewTask(CreateTask) {
  if (CreateTask.getName() === undefined) {
    return;
  }
  const name = CreateTask.getName();
  const descript = CreateTask.getDescript();
  const date = CreateTask.getDate();
  const folder = CreateTask.getFolder();
  const priority = CreateTask.getPriority();
  const tags = CreateTask.getTags();
  const task = new Task(name, descript, date, folder, priority, tags);
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
        return;
      }
    }
    tagnames.forEach((tagname) =>
      _.remove(task.tags, (tag) => tag.name === tagname)
    );
    emitter.emit("rerender");
  }

  editDate(taskName, tv, day, hours, minutes, month, year) {
    const task = tv.getCurrentTask(taskName);

    task.date.setDate(day);
    task.date.setHours(hours);
    task.date.setMinutes(minutes, 0, 0);
    task.date.setMonth(month - 1);
    task.date.setFullYear(year);
    emitter.emit("rerender");
  }

  editPriority(taskName, tv, number) {
    const task = tv.getCurrentTask(taskName);
    if (number > 0 && number < 5 && number !== task.priority) {
      task.priority = number;
      emitter.emit("rerender");
    }
  }
  changeFolder(taskName, newFolder, tv, fm) {
    const task = tv.getCurrentTask(taskName);
    const folder = fm.getFolder(task.folder);
    const hasFolder = fm.checkName(newFolder);
    const IsInFolder = folder.name === newFolder;
    if (hasFolder && !IsInFolder) {
      task.folder = newFolder;
      _.remove(folder.tasks, (task) => task.name === taskName);
      const newfolder = fm.getFolder(newFolder);
      newfolder.tasks.push(task);
      emitter.emit("rerender");
    }
  }

  removeAllTags(taskName, tv) {
    const task = tv.getCurrentTask(taskName);
    task.tags = [];
    console.log(task.tags);
  }
}

function createFolder(name, color, fm, cm) {
  const isThere = fm.checkName(name);
  const hasColor = cm.checkColor(color);
  if (!isThere && hasColor && name !== "Inbox") {
    const folder = new Folder(name, color);
    fm.insertFolder(folder);
  }
}

function editFolder(name, newName, newColor, fm, cs, tv) {
  const isThere = fm.checkName(name);
  if (isThere && name !== "Inbox" && newName !== "Inbox") {
    const folder = fm.getFolder(name);
    newColor = cs.checkColor(newColor) ? newColor : folder.color;
    const sameColor = folder.color === newColor;
    if (newName === name) {
      folder.color = !sameColor ? newColor : folder.color;
    } else {
      const oldName = folder.name;
      folder.tasks.forEach((task) => (task.folder = newName));
      folder.name = newName;
      folder.color = !sameColor ? newColor : folder.color;
      if (tv.currentName === oldName) {
        tv.lastSeeTaskFunc = () => seeTaskByFolder(newName, fm, tv);
      }
    }
    emitter.emit("rerender");
  }
}

function deleteFolder(name, fm, tv) {
  const folder = fm.getFolder(name);
  if (folder && name !== "Inbox") {
    const Inbox = fm.getFolder("Inbox");
    folder.tasks.forEach((task) => {
      task.folder = "Inbox";
      Inbox.tasks.push(task);
    });
    _.remove(fm.folders, (folder) => folder.name === name);
    if (tv.currentName === name) tv.lastSeeTaskFunc = () => seeNothing(tv);
    emitter.emit("rerender");
  }
}

function createTag(name, color, cs, tm) {
  const isThere = tm.checkTag(name);
  const HasColor = cs.checkColor(color);
  if (!isThere && HasColor) {
    const newTag = new Tag(name, color);
    tm.setTag(newTag);
  }
}

function deleteTag(name, tm, fm, tv) {
  const isThere = tm.checkTag(name);
  if (isThere) {
    const allFolders = fm.getAllFolders();
    allFolders.forEach((folder) =>
      folder.tasks.forEach((task) => {
        _.remove(task.tags, (tag) => tag.name === name);
      })
    );
    _.remove(tm.tags, (tag) => tag.name === name);
    if (tv.currentName === name) tv.lastSeeTaskFunc = () => seeNothing(tv);
    emitter.emit("rerender");
  }
}

function editTag(name, newName, newColor, tm, fm, cs, tv) {
  const isThere = tm.checkTag(name);
  if (isThere) {
    const tag = tm.getTag(name);
    newColor = cs.checkColor(newColor) ? newColor : tag.color;
    const folders = fm.getAllFolders();
    const allTasks = [];
    folders.forEach((folder) =>
      folder.tasks.forEach((task) => allTasks.push(task))
    );
    allTasks.forEach((task) =>
      task.tags.forEach((tag) => {
        if (tag.name === name) {
          tag.name = newName;
          tag.color = newColor;
        }
      })
    );
    tag.name = newName;
    tag.color = newColor;
    if (tv.currentName === name) {
      tv.lastSeeTaskFunc = () => seeTasksbyTag(newName, fm, tm, tv);
    }
    emitter.emit("rerender", { newName });
  }
}

function completeTask(name, fm, tv) {
  const task = tv.getCurrentTask(name);
  const folder = fm.getFolder(task.folder);
  task.complete = true;
  task.folder = "Completed";
  _.remove(folder.tasks, (task) => task.name === name);
  fm.completed.tasks.push(task);
  console.log(fm.completed.tasks);
  emitter.emit("rerender");
}

function uncompleteTask(name, fm, tv) {
  const HasTask = fm.checkName(name);
  if (HasTask) return;
  const task = tv.getCompletedTask(name);
  task.completed = false;
  task.folder = "Inbox";
  fm.insertTaskToFolder(task);
  emitter.emit("rerender");
}

const folderManager = new FolderManager();
const tagManager = new TagManager();
const createTask = new CreateTask();
const taskViewer = new TaskViewer();
const editor = new Editor();
const colorManager = new ColorStorage();

emitter.on("taskCreated", (e) => {
  folderManager.insertTaskToFolder(e.task);
});
emitter.on("taskCreated", createTask.reset);
emitter.on("rerender", (e) => taskViewer.lastSeeTaskFunc(e));

// seeTasksBySearch("Buy", folderManager)

export const TaskCreate = (function () {
  const fm = folderManager;
  const tm = tagManager;

  const setName = (name) => createTask.setName(name);
  const setDescript = (descript) => createTask.setDescript(descript);
  const setDate = (d, h, mi, p, mo, y) =>
    createTask.setDate(d, h, mi, p, mo, y);
  const setPriority = (number) => createTask.setPriority(number);
  const setFolder = (name) => createTask.setFolder(name, fm);
  const setTag = (name) => createTask.setTag(name, tm);
  const removeTag = (name) => createTask.removeTag(name);
  const getTag = (tagname) => createTask.getTag(tagname);
  const getTags = () => createTask.getTags();
  const getDate = () => createTask.getDate();

  return {
    setName,
    setDescript,
    setDate,
    setPriority,
    setFolder,
    setTag,
    removeTag,
    getTag,
    getTags,
    getDate,
  };
})();
export const SeeTasks = (function () {
  const fm = folderManager;
  const tm = tagManager;
  const tv = taskViewer;

  const seeFolder = function (name) {
    seeTaskByFolder(name, fm, tv);
  };
  const seeToday = function () {
    seeTasksByToday(fm, tv);
  };
  const seePriority = function (number) {
    seeTasksbyPriority(number, fm, tv);
  };
  const seeInbox = function () {
    seeTasksByInbox(fm, tv);
  };
  const seeUpcoming = function () {
    seeTasksByIncoming(fm, tv);
  };
  const seeTag = function (tagname) {
    seeTasksbyTag(tagname, fm, tm, tv);
  };
  const seeCompleted = function () {
    seeTasksByCompleted(fm, tv);
  };
  const seeSearch = function (pattern) {
    seeTasksBySearch(pattern, fm, tv);
  };

  return {
    seeFolder,
    seeToday,
    seePriority,
    seeInbox,
    seeUpcoming,
    seeTag,
    seeCompleted,
    seeSearch,
  };
})();
export const TaskActions = (function () {
  const fm = folderManager;
  const tv = taskViewer;
  const ct = createTask;

  const makeNewTask = function () {
    createNewTask(ct);
  };
  const deleteATask = function (name) {
    deleteTask(name, tv, fm);
  };
  const completeATask = function (name) {
    completeTask(name, fm, tv);
  };
  const uncompleteATask = function (name) {
    uncompleteTask(name, fm, tv);
  };

  return { makeNewTask, deleteATask, completeATask, uncompleteATask };
})();
export const FolderActions = (function () {
  const fm = folderManager;
  const cs = colorManager;
  const tv = taskViewer;

  const createNewFolder = function (name, color) {
    createFolder(name, color, fm, cs);
  };
  const deleteAFolder = function (name) {
    deleteFolder(name, fm, tv);
  };
  const editAFolder = function (name, newName, color) {
    editFolder(name, newName, color, fm, cs, tv);
  };

  return { createNewFolder, deleteAFolder, editAFolder };
})();
export const TagActions = (function () {
  const fm = folderManager;
  const tm = tagManager;
  const cs = colorManager;
  const tv = taskViewer;

  const makeNewTag = function (name, color) {
    createTag(name, color, cs, tm);
  };
  const editATag = function (name, newName, newColor) {
    editTag(name, newName, newColor, tm, fm, cs, tv);
  };
  const deleteATag = function (name) {
    deleteTag(name, tm, fm, tv);
  };

  return { makeNewTag, editATag, deleteATag };
})();
const edit = (function () {
  const fm = folderManager;
  const tm = tagManager;
  const tv = taskViewer;

  const editTaskName = (name, newName) => editor.editName(name, newName, tv);
  const editTaskDescript = (name, newDescript) =>
    editor.editDescript(name, newDescript, tv);
  const addNewTags = (taskName, tagNames) =>
    editor.addTags(taskName, tagNames, tv, tm);
  const removeSomeTags = (taskName, tagNames) =>
    editor.removeTags(taskName, tagNames, tv, tm);
  const editTaskDate = (taskName, day, hours, minutes, period, month, year) =>
    editor.editDate(taskName, tv, day, hours, minutes, period, month, year);
  const editTaskPriority = (taskName, number) =>
    editor.editPriority(taskName, tv, number);
  const changeFolder = (taskName, newFolder) =>
    editor.changeFolder(taskName, newFolder, tv, fm);
  const removeTags = (taskName) => editor.removeAllTags(taskName, tv);

  return {
    editTaskName,
    editTaskDescript,
    addNewTags,
    removeSomeTags,
    editTaskDate,
    editTaskPriority,
    changeFolder,
    removeTags,
  };
})();
//export { createTask as CreateTask };
export { edit as Editor };
export { folderManager, taskViewer, tagManager, colorManager };
