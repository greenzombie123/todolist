import { createFolderOptions } from "./FolderOptions";

export default {
  title: "Folder Options",
};

const Template = (args) => {
  return createFolderOptions({ ...args });
};

export const Default = Template.bind({});
Default.args = {
  seeFolder: null,
  createFolder: null,
  editFolder: null,
  deleteFolder: null,
};
