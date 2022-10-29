//T Initial Page Load

//T Task Class
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

//T Project Class
class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}

//T Tag Class
class Tag {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

//T Render taskbars
const ProjectRenderer = (function () {
  function renderCurrentProject() {}
  function renderTaskbarsByTag() {}
  function renderTaskbarsByToday() {}
  function renderTaskbarsbyIncoming() {}
  function renderTaskBarsbySearch() {}

  const projMana = Object.create(new eventTarget());

  Object.assign(projMana, {
    renderCurrentProject,
    renderTaskbarsByTag,
    renderTaskbarsByToday,
    renderTaskbarsbyIncoming,
    renderTaskBarsbySearch,
  });

  projMana.addEventListener("tasktCreated", renderCurrentProject, false);
  projMana.addEventListener("taskEdited", renderCurrentProject, false);

  return projMana;
})();

//T Create, delete and manage projects
class ProjectManager extends Event {
  projects = [];
  current;

  constructor() {}

  findProject(name) {}
  findTask() {}
  createProject() {}
  deleteProject() {}
  changeCurrentProject(name) {}
}

//T Manage UI of task creation
class TaskCreaterView {
  constructor() {
    this.sideLink_date = {};
    this.sideLink.addEventListener("DateChanged", () => this.changeTopLink());
  }
  open() {}
  close() {}
  changeTopLink() {}
  //! Just use selector
  openSelector(selector) {
    selector.selectValue(manager);
  }
}

//T Assigns values to various things
class BaseManager {
  setDate(value) {}
  setTag(value) {}
  setPriority(value) {}
  setProject(value) {}
}

//Manage and set values for task creation
class TaskCreaterManager extends BaseManager {
  constructor() {
    super();
    this.name = "";
    this.decript = "";
    this.date = "Today";
    this.tag = [];
    this.project = "Inbox";
    this.priority = 1;
  }

  setDate(value) {}
  setTag(value) {}
  setPriority(value) {}
  setProject(value) {}
  createTask() {}
  resetProps() {}
}

// Manage and edit values for task editing
class TaskEditorManager extends BaseManager {
  constructor() {
    super();
    this.task;
  }

  EditTask() {}
  setValue() {}
  openSelector(selector) {}
  setDate(value) {}
  setTag(value) {}
  setPriority(value) {}
  setProject(value) {}
  getTask() {}
}

//Base selector class
class Selector {
  constructor() {}

  setValue() {}
  applyValue() {}
  open() {}
  close() {}
}

class ProjectSelector extends Selector{
  constructor(){
    super()
  }
  open() {}
  close() {}
}



//Manage UI of project selector

const createTaskButton = document.createElement("button");

function loadPage() {
  const task1 = new Task();
  const task2 = new Task();
  const task3 = new Task();

  const inbox = new Project("inbox");
  inbox.tasks.push(task1, task2, task3);
  renderTaskbars(findProject("inbox"));
  createTaskButton.addEventListener("click", TaskCreater.createElement, false);
}
