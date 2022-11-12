
export default class FolderCreator{
    name;
    color;
    
    createName(name){
        //TODO Check to see if name already exist in Folder Manager
        this.name = name
        console.log(this.name);
    }
    chooseColor(color){
        this.color = color
        console.log(this.color);
    }

    getName(){
        return this.name
    }

    getColor(){
        return this.color
    }

    createFolder(){
        //TODO Send folder folder manager
    }
}