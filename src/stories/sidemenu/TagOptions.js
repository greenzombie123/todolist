export const createTagOptions = ({
  seeTags,
  createTag,
  editTag,
  deleteTag,
}) => {
  const tagOptions = document.createElement("ul");
  tagOptions.classList.add("tagoptions");

  const seeTagsButton = document.createElement("li");
  seeTagsButton.classList.add("tagoptions__item", "tagoptions__item--seeTags");
  seeTagsButton.textContent = "See Tags";
  seeTagsButton.addEventListener("click", seeTags);
  tagOptions.appendChild(seeTagsButton);

  const createTagButton = document.createElement("li");
  createTagButton.classList.add(
    "tagoptions__item",
    "tagoptions__item--createTag"
  );
  createTagButton.textContent = "Create A Tag";
  createTagButton.addEventListener("click", createTag);
  tagOptions.appendChild(createTagButton);

  const editTagButton = document.createElement("li");
  editTagButton.classList.add("tagoptions__item", "tagoptions__item--editTag");
  editTagButton.textContent = "Edit A Tag";
  editTagButton.addEventListener("click", editTag);
  tagOptions.appendChild(editTagButton);

  const deleteTagButton = document.createElement("li");
  deleteTagButton.classList.add(
    "tagoptions__item",
    "tagoptions__item--deleteTag"
  );
  deleteTagButton.textContent = "Delete A Tag";
  deleteTagButton.addEventListener("click", deleteTag);
  tagOptions.appendChild(deleteTagButton);

  return tagOptions;
};
