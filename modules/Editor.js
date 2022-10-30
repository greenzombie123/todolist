export class Editor {
    static editName = (id, name) => {
      const task = TaskViewer.currentProject.tasks.find((task) => task.id === id);
      task.name = name;
      emitter.emit("taskEdited");
    };
    static editDecript = (id, descript) => {
      const task = TaskViewer.currentProject.tasks.find((task) => task.id === id);
      task.descript = descript;
      emitter.emit("taskEdited");
    };
    static editDate = (id, date) => {
      const task = TaskViewer.currentProject.tasks.find((task) => task.id === id);
      task.date = date;
      emitter.emit("taskEdited");
    };
    static editPriority = (id, priority) => {
      const task = TaskViewer.currentProject.tasks.find((task) => task.id === id);
      task.priority = priority;
      emitter.emit("taskEdited");
    };
    static editTags = (id, tags) => {
      const task = TaskViewer.currentProject.tasks.find((task) => task.id === id);
      task.tags = tags;
      emitter.emit("taskEdited");
    };
    static editProject = (id, project) => {
      const task = TaskViewer.currentProject.tasks.find((task) => task.id === id);
      task.project = project;
      emitter.emit("taskEdited");
      emitter.emit("changedProject");
    };
  }
  