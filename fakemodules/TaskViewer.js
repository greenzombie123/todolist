import Formatter from "./Formatter";

export default class TaskViewer {
  currentTasks = [];
  currentName;
  upcoming = {};
  formatter;
  constructor(foldermanager) {
    this.foldermanager = foldermanager;
    this.formatter = new Formatter();
  }

  //Choose a folder to see (folder, inbox, today)
  selectFolder(name) {
    const folder = this.foldermanager.getFolder(name);
    this.currentTasks = folder.getTasks().map((task) => task);
    this.currentName = name
    const format = this.currentName !== "Inbox" ? "Project" : "Inbox"
    //Change formatter
    this.formatter.changeFormat(format, name);
  }
  selectToday() {}
  selectInbox() {}
  selectCompleted() {}
  selectOverDue() {}

  renderTasks = () => this.formatter.render(this.currentTasks);

}
