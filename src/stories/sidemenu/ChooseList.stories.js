import { createChooseList } from "./ChooseList";

export default {
  title:"Choose List"
}

const Template = (arg)=>createChooseList({...arg})

export const Default = Template.bind({})