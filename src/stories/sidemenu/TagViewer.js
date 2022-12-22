import { tagManager } from "../../todo";

export const createTagViewer = function ({ renderTasksByTag }) {

  const tagViewer = document.createElement("div");
  tagViewer.classList.add("folderviewer");

  tagViewer.insertAdjacentHTML(
    "afterbegin",
    '<h2 class="folderviewer__title">Tags</h2>'
  );

  const tagList = document.createElement("ul");
  tagList.classList.add("tagList");

  const tags = tagManager.getAllTags();

  tags.forEach((tag) => {
    const { name, color } = tag;
    const tagItem = document.createElement("li");
    tagItem.classList.add("tagList__item");
    tagItem.textContent = name;
    tagItem.style.setProperty("--color", color);

    tagItem.addEventListener("click", ()=>renderTasksByTag(name));
    tagList.appendChild(tagItem);
  });

  tagViewer.appendChild(tagList);

  return tagViewer;
};
