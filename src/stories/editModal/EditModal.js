import { createTag } from "./Tag";

export const createEditModal = ({
  name = "Hello Wow",
  descript = "Stuff",
  date = "Fri July 13 2023",
  openDate,
  openFolder,
  openPriority,
  openTag,
  changeName,
  changeDescript,
  closeEditModal,
  Tags = [],
  folderName = "Inbox",
  priority = 3,
}) => {
  // const { openDate, openFolder, openPriority, openTag } = callbacks;

  const string = `<form action="" class="task-create__form">
      <div class="task-create__top">
        <label for="name" id="name" class="task-create__name-label"
          >Name</label
        >
      </div>

      <input required type="text" name="name" class="task-create__name"/>
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

        <span class="task-create__date"></span>

        <div class="task-create__tagcontainer"><span class="task-create__tag">Add A Tag</span>
        </div>

        <span class="task-create__priority"></span>

        <span class="task-create__folder"></span>

      </div>

      <button type="button" class="task-create__create-button">Finished</button>
    </form>`;

  const taskcreateModal = document.createElement("div");
  taskcreateModal.classList.add("task-create");
  taskcreateModal.insertAdjacentHTML("afterbegin", string);

  const nameText = taskcreateModal.querySelector(".task-create__name");
  nameText.addEventListener('change', changeName)
  nameText.value = name;

  const descriptText = taskcreateModal.querySelector(".task-create__descript");
  descriptText.addEventListener('change', changeDescript)
  descriptText.value = descript;

  const foldertext = taskcreateModal.querySelector(".task-create__folder");
  foldertext.textContent = folderName;
  const folderButton = taskcreateModal.querySelector(
    ".task-create__folder-button"
  );
  folderButton.addEventListener("click", openFolder);

  const priorityText = taskcreateModal.querySelector(".task-create__priority");
  priorityText.textContent = priority;
  const priorityButton = taskcreateModal.querySelector(
    ".task-create__priority-button"
  );
  priorityButton.addEventListener("click", openPriority);

  const datetext = taskcreateModal.querySelector(".task-create__date");
  datetext.textContent = date;
  const dateButton = taskcreateModal.querySelector(".task-create__date-button");
  dateButton.addEventListener("click", openDate);

  const tagContainer = taskcreateModal.querySelector(
    ".task-create__tagcontainer"
  );
  addTags(tagContainer, Tags);

  const tagButton = taskcreateModal.querySelector(".task-create__tag-button");
  tagButton.addEventListener("click", openTag);

  const createButton = taskcreateModal.querySelector(
    ".task-create__create-button"
  );
  createButton.addEventListener("click", closeEditModal);

  return taskcreateModal;
};

function addTags(tagContainer, tags) {
  if (!tags.length) return;

  while (tagContainer.firstChild) {
    tagContainer.removeChild(tagContainer.firstChild);
  }
  tags.forEach((tag) => {
    tagContainer.appendChild(createTag(tag));
  });
}
