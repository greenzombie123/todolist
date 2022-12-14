import { createFolderViewer } from "./FolderViewer";

export default {
  title: "Folder Viewer",
  argTypes: {
    renderFolder: { action: "234" },
  },
};

const Template = (args) => createFolderViewer({ ...args });

export const Default = Template.bind({});
