export default class PrioritySelector {
  level = null
  selectPriority(level) {
    if(level > 4 || level < 1){
        console.log("Set a level between 1 to 4");
        return;
    }
      this.level = level
      console.log(`Selected Priority Level: ${level}`)
  }
  getPriority(){
    return this.level
  }

  resetValues(){
    this.level = null
  }
}
