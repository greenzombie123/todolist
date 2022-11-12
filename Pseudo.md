# You can create tasks

```javascript
class Task{}
class Folder{}
class Tag{}
```

```javascript

    class TaskData{
        name:null,
        descript:null,
        date:null,
        folder:null,
        priority:null
        tags:[]

        setDate(date){}
        setFolder(){}
        setPriority(){}
        setTag(){}
        setName(){}
        setDescrip(){}
        getDate(date){}
        getFolder(){}
        getPriority(){}
        getTag(){}
        getName(){}
        getDescrip(){}
    }

    class ColorStorage{
        colors = ["red"]
        checkColor(color){}
    }

    class FolderManager{
        folders = []
        currentTasks = []
        inbox = []
        //Place in folder
        insertTaskToFolder(task){}
        insertFolder(){}
        getFolder(){}
        getCurrentTask(){}
        checkName(){}
    }

    //Make a text
    makeNewTask(taskdata){
        //Grab stuff from TaskCreator
        //make new Task
    }

    //Make task and put into folder
    createTask(){
        const task = makeNewTask(TaskData)
        insertTaskToFolder(task)
    }

    deleteTask(name, folderManager){
        task = folderManager.getCurrentTask(name)
        folder = getFolder(name)
        // remove task from folder
        // update current tasks
        // reRender current tasks
    }

    class Editor{
        editName(){}
        editDescript(name, newDescript, fm){}
        addTags(name, TagArray, fm ){}
        removeTags(name, TagArray, fm){}
        editDate(){}
        editPriority(){}
        changeFolder(name, newFolder, fm){
            // get task
            // get folder
            // remove from folder
            // insert into folder
            // update current tasks
            // rerender current tasks
        }
    }

    //Priority Change
    change

    //Create a folder
    createFolder(name, color, fm, cm){
        fm.checkName
        cm.checkColor
        make folder //default colors
        fm.insertFolder
        // Place folder name on side menu
    }

    //Edit a folder
    editFolder(name, newName, newColor, fm){
        // edit folder prop of all tasks in the folder
        // change name or color of folder
        // call seeFolder(name)
    }

    editTag(){
        // 
    }



    deleteFolder(name, fm){
        fm.getFolder()
        folder.forEach //change to Inbox
        fm.inbox.push
        //rerender
    }

    class TagManager{
        tags = []
        checkTag(){}

    }

    createTag(name, color, tm, cs){

    }

    deleteTag(name, tm, fm){}



    seeTaskByFolder(name, fm){
        const folder = fm.getFolder(name)
        //put all tasks into currentFolder
        fm.currentTasks = folder.map()
        //change current name
        fm.currentName = folder.name
        //rerender
    }

    seeTasksByInbox(name, fm){}
    seeTasksbyTag(tagname, fm){}
    seeTasksbyPriority(priority, fm){}
    seeTasksByToday(){}
    seeTasksByIncoming(){}

    emitter.on("ref")

   

    //Task Viewer
    currentTasks = ["Do the dishes."]
    currentTasks = {Today:[], Tuesday:[], Wednesday:[]}
    
    TaskViewer
    UpcomingViewer

    class TaskViewer {
        currentName;
        currentTasks = []
        lastSeeTaskFunc;
        constructor(tasks, name){

        }
        render(){}
    }

    class UpcomingViewer {
        currentName;
        currentTasks = []
        upcomingTasks = {}
        constructor(tasks, name){

        }
        render(){}
    }
```