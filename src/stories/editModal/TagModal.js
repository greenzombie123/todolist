export const createTagModal = ({ tags = [{name:"Work", color:"red"}] }) => {
  const tagList = document.createElement("ul");
  tagList.classList.add("task-create__taglist");
  tags.map(( tag ) => {
    const string = `<li
        class="task-create__tag-listitem task-create__tag-listitem--${tag.color}"
      >
        <label for="" class="task-create__tagname">${tag.name}</label
        ><input
          type="checkbox"
          name="tagname"
          id="tagname"
          class="task-create__tag-checkbox"
          value=${tag.name}
        />
      </li>`;
    tagList.insertAdjacentHTML("beforeend", string);
  });
  return tagList
};
