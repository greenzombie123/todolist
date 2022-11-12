export class Task {
  name;
  descript;
  date;
  folder;
  priority;
  tags;
  overdue;
  constructor(name, descript, date, folder, priority, tags) {
    this.name = name;
    this.descript = descript;
    this.date = date || "Today 12:00am";
    this.folder = folder || "Inbox";
    this.priority = priority || 4;
    this.tags = tags || [];
  }
}
