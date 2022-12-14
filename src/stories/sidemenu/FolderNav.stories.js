import { folderManager } from "../../todo";
import { createFolderNav } from "./FolderNav";

export default {
  title: "Folder Navigation",
  argTypes: {
    renderFolder: { action: "234" },
  },
};

const Template = (args) => {
  return createFolderNav({ ...args });
};

export const Default = Template.bind({});

export const Filled = Template.bind({})
Filled.args = {
    folders:folderManager.getAllFolders()
}

export const FolderViewerList = Template.bind({})
FolderViewerList.args = {
    folders:folderManager.getAllFolders(),
    listName:"folderviewer__folderlist",
    listItemName:"folderviewer__folder"
}