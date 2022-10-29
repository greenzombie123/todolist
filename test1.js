class Task {
  constructor(name, descript, date, project, tags, priority) {
    this.name = name;
    this.descript = descript;
    this.date = date || "Today";
    this.project = project || "Inbox";
    this.tags = tags || [];
    this.priority = priority || 1;
  }
}

class Tag {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

const task = new Task(
  "Do dishes",
  "Clean up the dishes as soon as you get home",
  "Oct 31 2022",
  "Inbox",
  [new Tag("Sally", "blue")],
  2
);

task;

const PriorityManager = (function () {
  let priorityLevels = [1, 2, 3, 4];
  function setPriorityLevel(task, level) {
    task.priority = priorityLevels[level - 1];
  }
  return { setPriorityLevel };
})();

PriorityManager.setPriorityLevel(task, 3);

task;

//T  Managing and creating tasks

const TagsManager = (function () {
  const tags = [];

  function createTag(name, color) {
    const newTag = new Tag(name, color);
    tags.push(newTag);
    console.log(`Created a new tag: ${newTag.name}`);
  }

  return { tags, createTag };
})();

//T Set tags to a task
const TagSetter = (function () {
  let tags = [];
  const selectedTags = [];

  function getAllTags() {
    tags = [...TagsManager.tags];
    console.log(...tags);
  }

  function showAvailableTags() {
    getAllTags();
    const availTags = tags.filter((tag) => !selectedTags.includes(tag));
    console.log(...availTags);
  }

  function showSelectedTags() {
    console.log(...selectedTags);
  }

  function selectTag(tagName) {
    getAllTags();
    const selectedTag = tags.find((tag) => tag.name === tagName);

    if (!selectedTag) {
      console.log("Tag does not exist");
      return;
    }

    if (selectedTags.includes(selectedTag)) {
      console.log("Tag is already selected");
      return;
    }

    selectedTags.push(selectedTag);
    console.log("Selected a tag");
  }

  function setTagsToTask(task) {
    if (!selectedTags.length) {
      console.log("Pleaese select a tag");
      return;
    }
    selectedTags.forEach((selectedTag) => {
      if (task.tags.includes(selectedTag)) {
        console.log("Task already has tag");
        return;
      }
      task.tags.push(selectedTag);
      console.log(`Added tag to task: ${selectedTag.name}`);
    });
  }

  return { showAvailableTags, showSelectedTags, selectTag, setTagsToTask };
})();

const Inbox = new Project("Inbox");

class ProjectManager {
  constructor() {
    this.projects = [Inbox];
  }

  findProject(name) {
    const target = this.projects.find((project) => project.name === name);
    return target ? target : false;
  }
  createProject(name) {
    if (!findProject(name)) return;
    this.projects.push(new Project(name));
  }
  deleteProject(name) {
    const target = this.findProject(name);
    if (target) return;
    const index = this.projects.indexOf(target);
    this.projects.splice(index);
  }
  getProject(name) {
    return this.findProject(name);
  }
}

function getStuff(){}

class TaskManager {
  constructor() {
    this.task = {
      name: "",
      descript: "",
      date: "Today",
      project: "Inbox",
      tags: [],
      priority: 1,
    };
  }

  selectDate() {
    this.date = getStuff() || "Oct 30 2022";
  }
  selectProject() {}
  selectTags() {}
  selectPriority() {}

  createTask() {
    return new Task(
      this.task.name,
      this.task.descript,
      this.task.date,
      this.task.project,
      this.task.tags,
      this.task.priority
    );
  }
}

class TaskEditer {
    constructor() {
        this.task;
    }
  
    editDate(task, date) {
      this.date = getStuff() || "Oct 30 2022";
    }
    selectProject() {}
    selectTags() {}
    selectPriority() {}
  
    createTask() {
      return new Task(
        this.task.name,
        this.task.descript,
        this.task.date,
        this.task.project,
        this.task.tags,
        this.task.priority
      );
    }
  }


