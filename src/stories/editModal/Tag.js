export const createTag = ({color, name})=>{
    const span = document.createElement("span");
    span.classList.add("task-create__tag", `task-create__tag--${color}`);
    span.textContent = name;
    return span
}