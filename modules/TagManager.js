import { Tag } from "./Tag";

export class TagManager {
    static tags = [];
    static colors = [
      "red",
      "blue",
      "yellow",
      "green",
      "purple",
      "orange",
      "pink",
      "teal",
    ];
  
    static createTag = (name, color) => {
      const IsInTagList = this.checkTagList(name);
      if (!IsInTagList && this.checkValidColors()) return;
      this.tags.push(new Tag(name, color));
    };
  
    static setTags = (tagnames) => {
      tagnames.forEach((tagname) => {
        const foundTag = this.tags.find(tag=>tag.name===tagname)
        if(!foundTag)return
  
      });
    };
  
    static checkValidColors = (selectedColor) =>
      this.colors.find((color) => color === selectedColor);
  
    static findTag = (name) => this.tags.find((tag) => tag.name === name);
  
    static appendTag = (name, task) => {
      const IsInTagList = this.checkTagList(name);
      if (!IsInTagList) return;
      const IsInTask = checkTagInTask(task);
      if (!IsInTask) return;
      task.tags.push(tag);
      emitter.emit("");
    };
  
    static checkTagList = (name) => {
      const tag = this.tags.find((tag) => tag.name === name);
      if (tag) {
        return this.tags.include(tag);
      }
    };
  
    static checkTagInTask = (task) => {
      const tag = task.tags.find((tag) => tag.name === name);
      if (tag) {
        return this.tags.include(tag);
      }
    };
  
    static seeAllTags = () => {
      console.log("-----Tags-------");
      this.tags.forEach((tag) => console.log(tag));
    };
  }