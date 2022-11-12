# User Interface Functions
- All the functionality of the app is abstracted into a number of functions. SImplifies what the user has to do to use the use the app

# State Management
- Certain actions will be restricted depending on the state of the app

# You can create tasks
- Press a button to open task creation modal
- Interact with selectors
- Select a parameter
- Press a button to create a task
- Task is placed in a folder specifed or in the **Inbox**

# You can delete tasks
- Press trashbin next to taskbar
- Press ok button 

# You can edit tasks
- Open Respectice Edit Interface
    - Press name 
    - Edit name and description
    - Press Button Edit button to make change
    - Rerender task viewer
    - Press date, project
    - Edit, Push Button to make change, Rerender
    - Press tag, priorty, and folder
    - Edit (Choose on or multiple parameters), Make Change, Rerender

# Folder Management
  - Holds all folders
  - Gives ref of all folders

# You can create a folder
- Press Folder Link
- Interact with Folder Creation Interface
- Make name
- Choose color
- Make project
    - Stop creation if no name
    - Choose default color if none are chosen
    - Place project name to side menu

# You can edit folder names and colors
- Press Folder Link
- INteract with FOlder Edit Interface
- Choose a folder name
- Edit Name
- Edit Color
- Press Change Button
- FOlder is changed
- Tasks that have that folder are changed
- Task is rerendered

# You can delete a folder
- Press Folder Link
- INteract with Folder Delete Interface
- Choose folder
- Press Delete Button
- Move all tasks into Inbox
- Remove folder property from tasks
- Delete Folder
- Rerender
## There is a interface for folder creation, folder deletion, folder switching and folder editing


# Folders hold tasks
- When a task is created, it is placed in folder
- [Tasks in deleted folder are moved to **Inbox**](#you-can-create-a-folder) 
- Task can change folder through editing (Pressing the folder link on taskbar)

# There are three  default folders called 'Inbox' and "Finished"
## Created tasks are immediately placed in a specified folder or Inbox folder
## You can view all the names of folders
- Press Folder Link
- Press See All Folders Link
# You can place a task in another folder
- Press folder on taskbar to open **Change Folder**
- Click on a different folder name
- Press ok
- Task is placed in another folder
- Rerender
- A rendered task bar that is placed in another folder through **Change Folder** either remain or is removed

# Can create a tag
- Click on tag link to open **Tag Creation** interface
- Create name
- Choose color
- Press Create
- Tag is created
# You can delete a tag
1. Press **Tag** Link to open **Tag Deletion Interface**
2. Choose a tag
3. Press Delete
4. All tasks with said tag have tag removed from them
5. Delete tag
6. Rerender  
# You can append tags to task.
1. Click on tag on taskbar to open **Tag Append Interface**
2. Click on tag 
3. Click Append 
4. Tag is appened to task
5. Rerender
# Remove tags from a task
1. Click on remove button on **Tag Append Interface** to open **Tag Removal Interface**
2. CLick on tag
3. Click Remove
4. Tag is removed from task
5. Tag is removed from side menu
6. Rerender
## There is an interface for tag creation, tag deletion, tag appending, tag removing, and tag editing
# You can edit a tag's name and color
1. CLick on tag link and open **Tag Edit Interface**
2. Click on tag
3. Change name
4. Change color
5. Click on Edit
6. Tag is changed
7. All tasks with that tag are updated 
8. Link Name on Side Menu is updated
9. Rerender 

# When creating a tasks, you can choose a priority level for it
- There are 5 priority level.
1. When creating a task on **Tag Creation Interface**, open **Priority Selector Interface**
2. Click on a priority level
3. Click on button to create task
4. Priority is added to task 
5. When a task is not given a priority level, it is given a level of one.

# Task Bar are rendered with an border color depending on their level, with level 1 taskbars rendered with a thick red outline

# You can change priority of a task
1. CLick on priority symbol to open **Priority Change Interface**
2. Click on priority level
3. Press Ok 
4. Priority level is changed in task
5. Rerender

# You can add a date to a task
- On **Task Creation Interface**, click on **Add Date Interface**
- Select day, month, year, and time.
- Press create task to add date to task
- If not date is selected, "Today" value is add

## Can display time as either "Today" or "Today Time"

# You can edit a date of a task
1. Click on date on taskbar to open **Edit Date Interface**
2. Select a date
3. Press edit
4. Change date on task 
5. Rerender 

# Tasks that are past their deadlines can be viewed exclusively
- When program is loaded or task viewer rerendered, check all tasks that are overdue
- Add a `overdue` to the tasks
- CLick on *Overdue*
- Render all tasks that have `Overdue` tag with Overdue word on top
  
# Task Creation 
1. Open **Task Creation Interface**
- When creating a task, you can choose what folder to put it in.
  - Open **Select Folder Interface**
  - Select `Folder`
- When creating a task, you can choose what what tags it can have.
  - Open **Select Tag Interface**
  - Select a number of `Tag`
- When creating a task, you can choose its priority level.
  - Open **Select Priority Interface**
  - Select `Priority`
- When creating a task, you can write what the task is.
  - Open **Create Name Interface**
  - Create `Name`
- When creating a task, you can write a description of the task. 
  - Open **Create Description Interface**
  - Create `Description
- When creating a tasks, you can omit everything but the name of task
- When finished creating a task, the following happens if you omit a particular thing
    - Date: Date of task is set to 'Today'
    - Tag: No tag is added
    - Folder: Placed in Inbox
    - Priority: Set to priority four
    - Description: No description is added

# You can edit name and description
1. Click on name and open **Edit Name and Description**
2. Create name
3. Create description
4. CLick edit to change 
5. Rerender

# Tasks are viewed as task bars on the task viwewer section
- Taskbars have the task's name, description, date, priority level, folder, and tags in display 
- When page is loaded, tasks in the Inbox folder are rendered and the word Inbox is displayed up top 
- If you click on a folder name, all tasks of that folder are rendered and its name is displayed on top with its specified color
- If you click on Today, all tasks due today are rendered and the word today is specified on top
- If you click on Upcoming, tasks that are due in the next 5 days are rendered, which each group of tasks rendered under the rendered word of its date
- If you click on a tag, all tasks of that tag are rendered and the name of tag is rendered up top (**Tag Interface**)
- If you click on a priority level, all tasks of that priority are rendered. (**Priority Interface**)


# Can search for a specific task through a searchbar
1. Type into search bar
2. Press enter
3. Task bar that are close to the user input will be rendered

# Can complete a task.
- Completed tasks are removed from their folder, unrendered and place into the 'Finished' Folder

# There is a Complete Folder
- You can see completed tasks