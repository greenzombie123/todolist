export const createPriorityModal = ({ onClick }) => {
  const string = `
    <option value="1" class="task-create__priorityoption">1</option>
    <option value="2" class="task-create__priorityoption">2</option>
    <option value="3" class="task-create__priorityoption">3</option>
    <option value="4" class="task-create__priorityoption">4</option>`;
console.log(23);
  const select = document.createElement("select");
  select.classList.add("task-create__priority-selection");
  select.insertAdjacentHTML("beforeend", string);
  //   select.setAttribute('name', "priority")
  //   select.setAttribute('id', 'priority')
  Object.assign(select, { name: "priority", id: "priority" });
  select.addEventListener("click", onClick);

  return select;
};
