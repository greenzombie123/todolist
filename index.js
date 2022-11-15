import {
  SeeTasks,
  TaskActions,
  TagActions,
  FolderActions,
  TaskCreate,
  Editor,
  folderManager,
  taskViewer,
  tagManager,
  colorManager,
} from "./todo";


TaskCreate.setDate()
TaskCreate.setName("Pay the taxes!")
TaskCreate.setPriority(3)
TaskCreate.setTag("Work")
TaskActions.makeNewTask()

SeeTasks.seeFolder("Private")
SeeTasks.seeInbox()
// console.log(taskViewer.currentTasks.length);
Editor.changeFolder("Pay the taxes!", "Private")
SeeTasks.seeFolder("Private")
Editor.editTaskDate("Pay the taxes!", 16, 4, 0, "pm")
TagActions.editATag("Work", "Thing", "pink")
FolderActions.createNewFolder("Alvin", "green")
SeeTasks.seeFolder("Alvin")
SeeTasks.seeUpcoming()
SeeTasks.seeInbox()
TaskActions.completeATask("Pay bills")
console.log(folderManager.completed);