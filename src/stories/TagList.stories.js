
import '../../style.css'

export default {title:"PriorityList"}

// export const PriorityList = () => {
//     return `<select
//     name="priority"
//     id="priority"
//     class="task-create__priority-selection"
//   >
//     <option value="1" class="task-create__priorityoption">1</option>
//     <option value="2" class="task-create__priorityoption">2</option>
//     <option value="3" class="task-create__priorityoption">3</option>
//     <option value="4" class="task-create__priorityoption">4</option>
//   </select>`;
// }

 const Template = (args) => {
    return `<select
    name="priority"
    id="priority"
    class="task-create__priority-selection"
  >
    <option value="1" class="task-create__priorityoption">${args.first}</option>
    <option value="2" class="task-create__priorityoption">${args.second}</option>
    <option value="3" class="task-create__priorityoption">${args.third}</option>
    <option value="4" class="task-create__priorityoption">${args.fourth}</option>
  </select>`;
}

export const Primary = Template.bind({})
Primary.args = {
    first:1,
    second:2,
    third:3,
    fourth:4
}

export const Animals = Template.bind({})
Animals.args = {
    first:"Dogs",
    second:"Cats",
    third:"Dolphins",
    fourth:"Whales"
}