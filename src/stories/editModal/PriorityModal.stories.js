import { createPriorityModal } from "./PriorityModal";

export default {
  title: "PriorityModal",
  argTypes: {
    onClick: { action: "234"},
  },
};

const Template = (args) => {
  return createPriorityModal({ ...args });
};

export const Default = Template.bind({});
// Default.args={action}

// export const NameOnly = Template.bind({});
// NameOnly.args = { name: `Eat Some Cookies` };
