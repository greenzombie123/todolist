import Tag from "../Models/Tag"

export default class TagManager{
    tags = [new Tag("Stuff","blue"), new Tag("Work","green")]

    insertTag(){}
    getAllTags(){
        return this.tags
    }
    seeAllTags(){}
}