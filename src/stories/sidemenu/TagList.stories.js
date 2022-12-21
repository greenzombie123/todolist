import { createTagList } from "./TagList";

export default{
  title:"Tag List"
} 

const Template = (args)=>createTagList({args})

export const Default = Template.bind({})