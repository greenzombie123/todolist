import { createEditModal } from "./EditModal";
import { createTag } from "./Tag";

export default {
  title: "EditModal",
  argTypes: {
    backgroundColor: { control: "color" },
    openDate: { action: "Opening Date Modal" },
    openFolder: { action: "Opening Folder Modal" },
    openPriority: { action: "Opening Priority Modal" },
    openTag: { action: "Opening Tag Modal" },
    closeEditModal: { action: "Closing Edit Modal" },
    changeName:{action:"Changing name"},
    changeDescript:{action:"Changing description"}
  },
};

const Template = ({ ...args }) => {
  return createEditModal({ ...args });
};

export const Default = Template.bind({});

export const NameOnly = Template.bind({});
NameOnly.args = { name: `Eat Some Cookies` };

export const TagAdded = Template.bind({});
TagAdded.args = {
  Tags: [
    { color: "red", name: "work" },
    { color: "blue", name: "class" },
    { color: "blue", name: "class" },
    { color: "green", name: "October" },
  ],
};
