import { createConfirmBox } from "./ConfirmationBox";

export default {
  title: "Confirm Box",
};

const Template = (args) => {
  return createConfirmBox({ ...args });
};

export const Default = Template.bind({});
