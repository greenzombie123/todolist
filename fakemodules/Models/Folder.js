export default class Folder{
    tasks = []
    name;
    color;
    constructor(name, color){
        this.name = name;
        this.color = color
    }
    getTasks(){return this.tasks}
}