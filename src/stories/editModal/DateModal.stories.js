import { createDateModal } from "./DateModal";

export default {
  title: "DateModal",
  argTypes: {
    date: { control: "date" },
  },
};

const Template = (args) => {
  return createDateModal({ ...args });
};

export const Default = Template.bind({});

export const DateEntered = Template.bind({});
DateEntered.args = { date: new Date(2022, 11, 12, 10, 34) };
