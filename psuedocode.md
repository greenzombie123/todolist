```javascript
class Task{
    name;
    descript;
    date = date || "Today 12:00am";
    folder = folder || "Inbox";
    priority = priority || 4;
    tags = tags || [];
    overdue;
    constructor(){

    }

    getName(){}
    setName(){}
    getDescript(){}
    setDescript(){}
    getDate(){}
    setDate(){}
    getFolder(){}
    setFolder(){}
    getPriority(){}
    setPriority(){}
    getTags(){}
    setTags(){}
    setOverdue(){}
}


/*
States
Open

Task Creation
Task Editing
Task Deletion

Project Creation
Project Editing
Project Deletion

Tag Creation
Tag Editing
Tag Deletion
*/


class ToDoList{
    //Task Creation
    startTaskCreation(){}
    selectDate(){}
    selectFolder(){}
    selectPriority(){}
    selectTags(){}
    createName(){}
    createDescript(){}
    createTask(){}

    selectTask(){}
    changeDate(){}

    changeFolder(){}

    changePriority(){}

    appendTags(){}

    removeTags(){}

    startNameEditing(){}
    editName(){}
    editDescript(){}
    finishNameEditing(){}

    deleteTask(){}

    completeTask(){}

    startTagCreation()
    createName(){}
    chooseColor(){}
    createTag(){}

    chooseTagforEdit(){}
    changeName(){}
    changeColor(){}
    editTag()

    deleteTag(){}
    
    startProjectCreation()
    createName(){}
    chooseColor(){}
    createProject(){}

    chooseProjectforEdit(){}
    changeName(){}
    changeColor(){}
    editProject(){}

    deleteProject(){}

    seeTasksInProject(){}
    seeAllProjects(){}

    seeTasksinTag(){}
    seeAllTags(){}

    seeTasksDueToday(){}

    seeUpcomingTasks(){}

    seeOverDueTasks(){}

    seeCompletedTasks(){}

    searchForTask(){}
}

#Modal
class TaskCreaterModal(){
    open(){}
}
class NameMakerModal{}
class DescriptMakerModal{}
class DateSelectorModal{}
class FolderSelectorModal{}
class PrioritySelectorModal{}
class TagSelectorModal{}
class TaskDeleterModal{}

#Makers and Selectors
class TagSelector{}
class FolderSelector{}
class PrioritySelector{}
class DateSelector{}
class NameMaker{}
class DescripMaker{}
class DateSelector{}

# Folder
class FolderManager {
    folders;
    DisplayedTasks;
    Inbox;
    Completed;
    constructor(){
        this.folders = [new Folder("Inbox"), new Folder("Completed")]
    }
    insertTask(task){}
    insertProject(project){}
    findDisplayedTask(){}
    getAllProjects(){}
    getProject(){}
    seeAllProjects(){}
    getAllTasks(){}
}

class Folder{
    name;
    color;
    tasks;
    findTask(name){}
}

class TaskDeleter{
    deleteTask(){}
}

```

# [TaskEditing](#you-can-edit-tasks)
```javascript
class NameEditor{
    editedName;
    chosenTask;
    chooseTask(name){}
    createName(){}
    editName(){}
    reset(){}
}
class NameEditorModal{
    open(){}
    close(){}
}

class DescriptEditor{
    editedDescript;
    chosenTask;
    chooseTask(name){}
    createDescript(){}
    editDescript(){}
    reset(){}
}
class DescriptEditorModal{
    open(){}
    close(){}
}

class DateEditor{
    editedDate;
    chosenTask;
    chooseTask(name){}
    selectDate(){}
    editDate(){}
    reset(){}
}
class DateEditorModal{
    open(){}
    close(){}
}

class PriorityEditor{
    editedPriority;
    chosenTask;
    chooseTask(name){}
    selectPriority(){}
    editPriority(){}
    reset(){}
}
class PriorityEditorModal{
    open(){}
    close(){}
}

class TagAppender{
    addedTags;
    chosenTask;
    chooseTask(name){}
    selectTag(){}
    addTags(){}
    reset(){}
}
class TagAppenderModal{
    open(){}
    close(){}
}

class TagRemover{
    TagsToRemove;
    chosenTask;
    chooseTask(name){}
    selectTag(){}
    removeTags(){}
    reset(){}
}
class TagAppenderModal{
    open(){}
    close(){}
}

```

# Folder Creater
```javascript
class FolderCreater{
    folderName;
    folderColor;

    createName(name){}
    chooseColor(color){}
    createFolder(){}
    reset(){}
}

```

# Color Storage
```javascript
class ColorStorage{
    color;
    checkColor(name){}
}

```

# Folder Changer
```javascript
class FolderChanger{
    prevFolder;
    newFolder;
    selectedTask;

    chooseTask(name){}
    chooseNewFolder(){}
    changeFolders(){}   
}

```

# Tag Manager
```javascript
class TagManager{
    tags;

    TagManager.insertTag(){}
    TagManager.getAllTags(){}
    seeAllTags(){}
}

```

# Tag Creation
```javascript

class TagCreater{
    createdName;
    chosenColor;

    TagCreater.createName(){}
    TagCreater.chooseColor(){}
    TagCreater.createTag(){}
}
```


# Tag Deletion

```javascript
class TagDeletion{
    selectedTag;

    TagDeleter.chooseTag(){}
    TagDeleter.deleteTag(){}
}
```

```javascript
class TagAppender{
    selectedTags;
    selectedTask;

    TagAppender.chooseTask(name)
    TagAppender.selectTag()
    TagAppender.appendTags
```

```javascript
class TagRemoval{
    selectedTags;
    selectedTask;

    TagRemoval.chooseTask(name)
    TagRemoval.selectTags()
    TagRemoval.removeTags
    TagRemoval.removeTagFromAll()
```

```javascript

class TagEditor{
    chosenTag;

    chooseTag(){}
    changeName(){}
    changeColor(){}
    editTag()
    editTagOnAll(){
        //fire changedTag
    }
}

```

# User Interface Functions
 
# [You can create tasks](stuff.md/)
 1. `Selector.set(value)`
    1. Check if valve exists (example: ProjectManager.checkName)
    2. `selected = value`
 2. `TaskCreater.createTask()`
    1. Create new task
    2. `Task.prop = Selector.get()`
 3. `FolderManager.insertTask(task)`
     1. Find folder
     2. Put task in folder
- Dispatch `createdTask`
    - `Taskviewer.render()`
    - `Selector.reset()` on all selector

# Folder Management
- Has `projects`
- Has `DisplayedTasks`
- Has `getAllProjects`
- Has `insertTask`

# You can delete tasks
- Call `TaskDeleter.deleteTask(task.name)`
    1. Find the task by calling `ProjectManager.findDisplayedTask`
       1. return `Task`
    2. Get folder by calling `ProjectManager.getProject(task)` 
    3. `pull` task from folder
       1. `_pull.(folder, task)`
    4. Fire `rerender` event

# [You can edit tasks](#taskediting)
## You can edit the date of a task
1. `chooseName(name)`
   1. return task through `ProjectManager.findDisplayedTask`
   2. Assign to `chosenTask`
2. `selectDate()` and return value to `selectedDate`
3. `changeDate(task, date)`
   1. `chosenTask.date = selectedDate`
   2. `reset()` to delete value from `chosenTask` and `selectedTask`
   3. Fire `rerender` event
**All editing will follow this format** 

# [You can create a folder](#folder-creater)
1. `FolderCreation.createName(name)`
   1. `FolderName = Name`
2. `FolderCreation.chooseColor(color)`
   1. Check if color exist in color storage
      1. `checkColor(name)`
   2. `Foldercolor = color`
3. `FolderCreation.createFolder`
   1. Create folder
   2. Assign values to folder
   3. `FolderManager.insertProject(folder)`

# You can view all folders
1. `FolderManager.seeAllProjects(){}`

# You can place a task in another folder
1. `FolderChanger.chooseName()`
   1. Get both task and folder that is in task
2. `FolderChanger.chooseFolder()`
   1. Gets the folder from FolderManager
3. `FolderChanger.changeFolders()`
   1. Remove task from previous folder (``)
   2. Change folder prop of task 
   3. Insert task into folder (`FolderManager.insertFolder()`)
   4. Fire `Rerender`

# You can create a tag
1. `TagCreater.createName()`
2. `TagCreater.chooseColor()`
3. `TagCreater.createTag()`
   1. `TagManager.insertTag()`

# You can delete a tag
1. `TagDeleter.chooseTag()`
2. `TagDeleter.deleteTag()`
   1. `TagRemover.removeTagFromAll()`
      1. Get all tags that have this tag
      2. Remove from their array
   2. Remove tag from `TagManager`
   3. Fire `Rerender`

# You can append tags to a task 
1. `TagAppender.chooseTask(name)`
2. `TagAppender.selectTag()`
3. `TagAppender.appendTags()`
   1. Fire `rerender`

# You can remove tags from a task

# You can edit a tag's name and color

```javascript
class PriorityManager{
    '1' = 1;
    '2' = 2;
    '5' = 5;
}   

class Priority Selector{}
selectedpriority;
choosePriority(){}
```
# When creating a task, you can choose a priority level for it

```javascript
class TaskViewer{
    formatter;

    renderTasks(formatter){}
    borderRender(){}
    renderOverDueTasks(){}
    seeTasksInProject(){}
    seeTasksinTag(){}
    seeAllTags(){}
    seeTasksDueToday(){}
    seeUpcomingTasks(){}
    seeCompletedTasks(){}

}   

class Priority Selector{}
selectedpriority;
choosePriority(){}
```
# Task Bar are rendered with an border color depending on their level, with level 1 taskbars rendered with a thick red outline


```javascript
class PriorityChanger{
    selectedPriority;

    chooseTask(){}
    changePriority(){}
}
```
# You can change the priority level of a task

```javascript
class DateSelector{
    selectedDate;

    chooseTask(){}
    selectDate(){}
}
```
# You can add a date to a task

```javascript
class DateChanger{
    selectedDate;

    chooseTask(name){}
    changeDate(){}
}
```
# You can edit date of a task

```javascript
class OverdueChecker{
    checkOverDue(){}
}
```
# Tasks that are past their deadlines can be viewed exclusively
1. When `rerendered` is fired, after all other event handlers are called, `checkOverDue()` is called
   1. Get all tasks
   2. Get current time date
   3. If date os tasks has passed the current date and time, assign `true` to its prop
2. `TaskViewer.renderOverDueTasks()`


```javascript
class EditName{
    newName;
    newDescript;
    chosenTask;

    chooseTask(name){}
    createName(name){}
    createDescrip(){}
    editName(){}
}
```

# You can edit name and description

```javascript
class SearchManager{
    searchTask(){}
}

class 


```

Index.js 
  const todo = new todo()
    
    ToDOList.js
      class ToDo
        
        NameSelector.js
          createName(){}
        TaskCreation.js
          createTask(){}


ToDo
    chooseName
        NameSelector.chooseName
    chooseTag
        TagSelector.chooseTag
            TagManager.checkTag

TagDeleter
TagRemover
TagAppender
TagEditer
TagCreater
    TagManager


```javascript

```
// Currently displayed tasks are in here
currentTasks = []
currentName;

//Choose a folder to see (folder, inbox, today)
selectFolder(name){
    currentTasks = ??????
}

selectToday(){}
selectInbox(){}
selectCompleted(){}
selectOverDue(){}

renderCurrentTasks(){}

//! Upcoming

//Get all upcoming tak
getUpcomingTasks(){
    get 5 date items
    currentTasks 
    upcomingCalender
    render
}

upcomingCalendar = {}
renderUpcomingTasks(){}
