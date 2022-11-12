import { union } from "lodash";

export default class TagSelector {
  tags = [];
  constructor(tagmanager) {
    this.tagmanager = tagmanager;
  }

  selectTag(name) {
    const hasTag = this.checkTag(name);
    if (!hasTag) {
      console.log("Select an existing tag.");
      return;
    }
    this.tags = union(this.tags, [hasTag]);
    const text = this.tags.reduce((start, next, curInd, array)=>  start +  `${curInd + 1 < array.length ?  next.name + `, ` : next.name}`, "Selected tags: ")
    console.log(text);
  }

  checkTag(name) {
    const tags = this.tagmanager.getAllTags();
    return tags.find((tag) => tag.name === name);
  }

  getTags() {
    return this.tags
  }

  resetValues(){
    this.tags = []
  }
}
