import { tagManager } from "../../todo";

export const createTagList = ({// onTagClick,
    // OnButtonClick,
    headingText = "Choose a folder to edit"
  }) => {
    const chooseList = document.createElement("div");
    chooseList.classList.add("chooseList");
  
    const heading = document.createElement("h2");
    heading.classList.add("chooseList__heading");
    heading.textContent = headingText;
    const tags = tagManager.getAllTags()

    const tagList = document.createElement("ul");
    tagList.classList.add("tagList");
  
    tags.forEach((tag) => {
      const { name, color } = tag;
      if (name === "Inbox") return;
      const tagItem = document.createElement("li");
      tagItem.classList.add("tagList__item");
      tagItem.textContent = name;
      tagItem.style.setProperty("--color", color);
      
      tagItem.addEventListener("click", onClick);
      tagList.appendChild(tagItem);
    });
  
    return tagList;
  };