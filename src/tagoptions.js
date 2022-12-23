import { cancelConBox, getValuesFromCreateModal } from "./folderoptions";
import { positionModal, toggleOverlay, transformOverlay } from "./helpers";
import { resetTaskView, taskRenderer } from "./render";
import { createConfirmBox } from "./stories/editModal/ConfirmationBox";
import { createTagList } from "./stories/sidemenu/TagList";
import { createTagModal } from "./stories/sidemenu/TagModal";
import { createTagOptions } from "./stories/sidemenu/TagOptions";
import { createTagViewer } from "./stories/sidemenu/TagViewer";
import { SeeTasks, TagActions, tagManager } from "./todo";

export function openTagOptions(button) {
  const tagOptions = createTagOptions({
    seeTags,
    createTag: openTagCreater,
    editTag: () =>
      openTagList({
        buttonText: "Edit",
        headingText: "Choose a tag to edit.",
        openModal: openTagEditModal,
      }),
    deleteTag: () =>
      openTagList({
        buttonText: "Delete",
        headingText: "Choose a tag to delete.",
        openModal: openTagDeleteConBox,
      }),
  });
  transformOverlay({ element: tagOptions });
  positionModal(button, tagOptions, "right", null, -50);
}

function seeTags() {
  resetTaskView(false);
  const taskView = document.querySelector(".taskview");
  const renderTasksByTag = (tagname) => {
    SeeTasks.seeTag(tagname);
    taskRenderer.render();
  };
  const tagViewer = createTagViewer({ renderTasksByTag });
  taskView.appendChild(tagViewer);
  toggleOverlay();
}

function openTagList({ buttonText, openModal, headingText }) {
  toggleOverlay();
  const tagList = createTagList({
    openModal,
    buttonText,
    headingText,
  });
  transformOverlay({ element: tagList, center: true });
}

function openTagCreater() {
  toggleOverlay();
  const tagCreater = createTagModal({ onClick: makeTag });
  transformOverlay({ element: tagCreater, center: true });
}

function makeTag() {
  const newTag = getValuesFromCreateModal();
  TagActions.makeNewTag(newTag.name, newTag.color);
  toggleOverlay();
}

function openTagEditModal() {
  const tagValues = getFolderFromTagList();
  toggleOverlay();
  const tagEditModal = createTagModal({
    onClick: () => editTag(tagValues),
    buttonText: "Edit",
    name: tagValues.name,
    color: tagValues.color,
  });
  transformOverlay({ element: tagEditModal, center: true });
}

function editTag({ name }) {
  const newTag = getValuesFromCreateModal();
  const { name: newName, color: newColor } = newTag;
  TagActions.editATag(name, newName, newColor);
  taskRenderer.reRender();
  toggleOverlay();
}

function getFolderFromTagList() {
  const chosen = document.querySelector(".tagList__item--chosen");
  const tagName = chosen.textContent;
  const tag = tagManager.getTag(tagName);
  return tag;
}

function openTagDeleteConBox() {
  const tag = getFolderFromTagList();
  const { name } = tag;
  toggleOverlay();
  const conBox = createConfirmBox({
    headingText: "Do you want to delete this tag?",
    onClickYes: () => deleteTag(name),
    onClickNo: () => cancelConBox(),
    chosenText: name,
  });
  transformOverlay({ element: conBox, center: true });
}

function deleteTag(name) {
  TagActions.deleteATag(name);
  toggleOverlay();
  taskRenderer.reRender();
}
