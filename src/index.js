import { openCreateTask } from "./TaskCreate";
import { taskRenderer, resetTaskView } from "./render";
import { SeeTasks } from "./todo";

const openbutton = document.querySelector(".header__create-task-button");
openbutton.addEventListener("click", openCreateTask);

// SeeTasks.seeUpcoming()
// taskRenderer.renderUpcoming()

SeeTasks.seeInbox()
taskRenderer.render()