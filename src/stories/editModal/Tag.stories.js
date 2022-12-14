import { createTag } from "./Tag";

export default {
  title: "Tag",
  argTypes: {
    name: { control: "text" },
    color: { control: { type: "select" }, options: ["red", "yellow", "green"] },
  },
};

const Story = (args) => createTag(args);

export const Work = Story.bind({});
Work.args = { name: "Work", color: "green" };
