export const createTaskCreateModal = () => {

  const taskView = document.querySelector('.taskview');
  const taskCreate = document.createElement("div");
  taskCreate.classList.add("task-create");
  const string = `
  <div class="overlay overlay--hidden"></div>
  <form action="" class="task-create__form">
    <div class="task-create__top">
      <label for="name" id="name" class="task-create__name-label"
        >Name</label
      >
      <button class="task-create__cancel-button">X</button>
    </div>

    <input required type="text" name="name" class="task-create__name" />
    <label for="descript" class="task-create__descript-label"
      >Description</label
    >
    <input
      name="descript"
      type="text" id="descript"
      class="task-create__descript"
    ></input>

    <div class="task-create__bottom">
      <button type="button" class="task-create__date-button">Deadline</button>

      <button type="button" class="task-create__tag-button">Tags</button>

      <button type="button" class="task-create__priority-button">Priority</button>

      <button type="button" class="task-create__folder-button">Folder</button>

      <span class="task-create__date">Today</span>

      <div class="task-create__tagcontainer">
        <span class="task-create__tag"
          >Add A Tag</span
        >
      </div>

      <span class="task-create__priority">4</span>

      <span class="task-create__folder">Inbox</span>

    </div>

    <button type="button" class="task-create__create-button">Create</button>
    <div class="poppers">
      <div
        class="task-create__date-container task-create__date-container--hidden"
      >
        <label class="task-create__date-container__date-label" for="date"
          >Deadline</label
        >
        <label class="task-create__date-container__time-label" for="time"
          >Time</label
        >
        <input type="date" name="date" class="task-create__date-input" />

        <input
          type="time"
          name="time"
          class="task-create__time-input"
        />
    </div>
      <ul class="task-create__taglist task-create__taglist--hidden">
        <li
          class="task-create__tag-listitem task-create__tag-listitem--green"
        >
          <label for="" class="task-create__tagname">Work</label
          ><input
            type="checkbox"
            name="tagname"
            id="tagname"
            class="task-create__tag-checkbox"
            value="work"
          />
        </li>
      </ul>
      <select
        name="priority"
        id="priority"
        class="task-create__priority-selection task-create__priority-selection--hidden"
      >
        <option value="1" class="task-create__priorityoption">1</option>
        <option value="2" class="task-create__priorityoption">2</option>
        <option value="3" class="task-create__priorityoption">3</option>
        <option value="4" class="task-create__priorityoption">4</option>
      </select>
      <select
        name="folder"
        id="folder"
        class="task-create__folder-selection task-create__folder-selection--hidden"
      >
        <option value="Inbox" class="task-create__folderoption">
          Inbox
        </option>
      </select>
    </div>
  </form>`;

  taskView.insertAdjacentHTML("afterbegin", string);

  const createbutton = document.querySelector(".task-create__create-button");
  createbutton.addEventListener("click", createNewTask);

  const nameInput = document.querySelector(".task-create__name");
  const descriptInput = document.querySelector(".task-create__descript");
  nameInput.addEventListener("input", setName);
  descriptInput.addEventListener("input", setDescript);

  const tagbutton = document.querySelector(".task-create__tag-button");
  tagbutton.addEventListener("click", openTaskCreate_TagList);

  const priorityButton = document.querySelector(
    ".task-create__priority-button"
  );
  priorityButton.addEventListener("click", openPrioritySelection);

  const priSel = document.querySelector(".task-create__priority-selection");
  priSel.addEventListener("change", changePriority);

  const folderbutton = document.querySelector(".task-create__folder-button");
  folderbutton.addEventListener("click", openFolderSelection);

  const dateInput = document.querySelector(".task-create__date-input");
  const timeInput = document.querySelector(".task-create__time-input");
  dateInput.addEventListener("change", setDate);
  timeInput.addEventListener("change", setDate);

  const datebutton = document.querySelector(".task-create__date-button");
  datebutton.addEventListener("click", openDateContainer);
};
