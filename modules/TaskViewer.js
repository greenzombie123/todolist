export class TaskViewer {
    static currentProject;
  
    static setCurrentProject = () =>
      (this.currentProject = ProjectManager.currentProject);
  
    static viewAllTasks = () => {
      this.setCurrentProject();
      this.currentProject.tasks.forEach((task) =>
        console.log(
          `Name: ${task.name} ID:${task.id}\n Description: ${
            task.project
          }\n Date:${task.date} Tags:${
            task.tags.length
              ? task.tags.reduce((prev, next) => ` ${prev}` + `${next.name},`, "")
              : "No Tags"
          } Priority: ${task.priority}`
        )
      );
    };
  
    static findTask = (name) => {
      if (!this.currentProject) this.setCurrentProject();
      return this.currentProject.tasks.find((task) => task.name === name);
    };
  }