import { getValuesFromCreateModal, getValuesFromList } from "./folderoptions";
import { positionModal, toggleModal, toggleOverlay, transformOverlay } from "./helpers";
import { resetTaskView, taskRenderer } from "./render";
import { createTagList } from "./stories/sidemenu/TagList";
import { createTagModal } from "./stories/sidemenu/TagModal";
import { createTagOptions } from "./stories/sidemenu/TagOptions";
import { createTagViewer } from "./stories/sidemenu/TagViewer";
import { SeeTasks, TagActions } from "./todo";

export function openTagOptions(button) {
  const tagOptions = createTagOptions({
    seeTags,
    createTag: openTagCreater,
    editTag: () => openTagList(),
    deleteTag: () => openTagList(),
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

function openTagList() {
  toggleOverlay();
  //const tagList = createTagList({openModal:null, buttonText = "", headingText})
}

function openTagCreater() {
    toggleOverlay()
    const tagCreater = createTagModal({onClick:makeTag});
    transformOverlay({ element:tagCreater, center: true });
  }

function makeTag(){
    const newTag = getValuesFromCreateModal()
    TagActions.makeNewTag(newTag.name, newTag.color)
    toggleOverlay()
}

function openTagCreateModal() {}


function openTagEditModal() {}
function editTag() {}
