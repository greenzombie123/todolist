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

  //T Initial Page