export class Task {
    constructor(name, descript, date, project, tags, priority) {
      this.name = name;
      this.descript = descript;
      this.date = date || "Today";
      this.project = project || "Inbox";
      this.tags = tags || [];
      this.priority = priority || 1;
      this.id;
    }
  }