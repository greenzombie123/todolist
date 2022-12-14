import { createFolderModal } from "./FolderModal";

export default {
  title: "FolderModal",
  argTypes: { onClick: { action: "Clicked!" } },
};

const Template = (args) => createFolderModal({ ...args });

export const Default = Template.bind({});
