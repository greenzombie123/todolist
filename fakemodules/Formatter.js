import TaskCreater from "./Creators/TaskCreater";

export default class Formatter {
  formatter = this.renderProject;
  currentName;

  constructor() {}
  changeFormat(format, name) {
    switch (format) {
      case "Project":
        this.formatter = this.renderProject;
        this.currentName = name;
        break;
      case "Inbox":
        this.formatter = this.renderInbox
        this.currentName = name;
        break;

      default:
        break;
    }
  }

  renderProject(tasks) {
    console.log(`${this.currentName}`);
    tasks.forEach(function (task) {
      console.log(
        `${task.name} ${task.descript ? `\n${task.descript}` : ""} \n ${
          task.date
        } ${task.folder} Tags:${task.tags.reduce(
          (p, n) => `${p} ${n.name}`,
          ""
        )} ${task.priority}`
      );
    });
  }

  renderInbox(tasks) {
    console.log(`${this.currentName}`);
    tasks.forEach(function (task) {
      console.log(
        `${task.name} ${task.descript ? `\n${task.descript}` : ""} \n ${
          task.date
        } ${task.folder} Tags:${task.tags.reduce(
          (p, n) => `${p} ${n.name}`,
          ""
        )} ${task.priority}`
      );
    });
  }

  renderByTag() {}
  renderTodayTasks() {}

  render(tasks) {
    this.formatter(tasks);
  }
}
