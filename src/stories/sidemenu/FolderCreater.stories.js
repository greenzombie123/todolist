import { createFolderCreater } from "./FolderCreater";

export default {
  title: "Folder Creater",
  argTypes: {
    createFolder: { action: "createFolder" },
  },
};

const Template = (args) => {
  return createFolderCreater({ ...args });
};

export const Default = Template.bind({});
