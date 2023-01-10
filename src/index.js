import { openCreateTask, openTaskCreateModal } from "./TaskCreate";
import { taskRenderer, resetTaskView } from "./render";
import { folderManager, SeeTasks } from "./todo";
import { createFolderNav } from "./stories/sidemenu/FolderNav";
import { openFolderOptions } from "./folderoptions";
import "../style.css";
import { openTagOptions } from "./tagoptions";
import "./IDB";

const openbutton = document.querySelector(".header__create-task-button");
// openbutton.addEventListener("click", openCreateTask);
openbutton.addEventListener("click", openTaskCreateModal);

const searchButton = document.querySelector(".header__searchButton");
searchButton.addEventListener("click", searchTasks);

const sideMenu = document.querySelector(".side-menu");
const folderNav = createFolderNav({
  folders: folderManager.getAllFolders(),
  renderFolder: (name) => {
    SeeTasks.seeFolder(name);
    taskRenderer.render();
  },
});
sideMenu.appendChild(folderNav);

const inbox = document.querySelector(".side-menu__inbox");
inbox.addEventListener("click", () => {
  SeeTasks.seeInbox();
  taskRenderer.render();
});

const today = document.querySelector(".side-menu__today");
today.addEventListener("click", () => {
  SeeTasks.seeToday();
  taskRenderer.render();
});

const upcoming = document.querySelector(".side-menu__upcoming");
upcoming.addEventListener("click", () => {
  SeeTasks.seeUpcoming();
  taskRenderer.renderUpcoming();
});

const folderOptions = sideMenu.querySelector(".side-menu__option--folder");
folderOptions.addEventListener("click", () => openFolderOptions(folderOptions));

const tagOptions = sideMenu.querySelector(".side-menu__option--tag");
tagOptions.addEventListener("click", () => openTagOptions(tagOptions));

function searchTasks() {
  const searchInput = document.querySelector(".header__searchBar");
  const pattern = searchInput.value;
  if(pattern){
    SeeTasks.seeSearch(pattern)
    taskRenderer.render();
  }
}

SeeTasks.seeInbox();
taskRenderer.render();
