import { createTagModal } from "./TagModal";

export default {
  title: "TagModal"
};

const Template = (args) => {
  return createTagModal({ ...args });
};

export const Default = Template.bind({})

export const Filled = Template.bind({})
Filled.args = {
    tags:[{name:"Work", color:"blue"},{name:"Work", color:"blue"},{name:"Work", color:"blue"}]
}
