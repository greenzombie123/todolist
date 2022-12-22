import { tagManager } from "../../todo";

export const createTagList = ({
  openModal,
  headingText = "Choose a tag to edit",
  buttonText = "Edit"
}) => {
  const chooseList = document.createElement("div");
  chooseList.classList.add("chooseList");

  const heading = document.createElement("h2");
  heading.classList.add("chooseList__heading");
  heading.textContent = headingText;

  const tagList = document.createElement("ul");
  tagList.classList.add("tagList");

  const tags = tagManager.getAllTags();

  tags.forEach((tag) => {
    const { name, color } = tag;
    const tagItem = document.createElement("li");
    tagItem.classList.add("tagList__item");
    tagItem.textContent = name;
    tagItem.style.setProperty("--color", color);

    tagItem.addEventListener("click", toggleChosen);
    tagList.appendChild(tagItem);
  });

  const button = document.createElement("button");
  button.classList.add("chooseList__button");
  button.textContent = buttonText;
  button.addEventListener("click", openModal);

  chooseList.appendChild(heading);
  chooseList.appendChild(tagList);
  chooseList.appendChild(button);

  return chooseList;
};

function toggleChosen(e) {
  const listItems = document.querySelectorAll(
    ".chooseList .tagList__item"
  );
  listItems.forEach((listItem) =>
    listItem.classList.remove("tagList__item--chosen")
  );
  e.target.classList.toggle("tagList__item--chosen");
}
