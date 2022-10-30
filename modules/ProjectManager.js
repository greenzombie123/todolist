import { Project } from "./Project";

export class ProjectManager {
    static projects = [];
    static currentProject = null;
  
    static findProject = (name) =>
      this.projects.find((project) => project.name === name);
  
    static insertToProject = (task) =>
      this.findProject(task.project).tasks.push(task);
  
    static createProject = (name) => this.projects.push(new Project(name));
  
    static changeToCurrent = (name) =>
      (this.currentProject = this.projects.find(
        (project) => project.name === name
      ));
  }