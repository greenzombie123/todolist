import format from "date-fns/format";

function createTaskBars(tasks){
    const taskview = document.querySelector(".taskview");
    let counter = 1;
    tasks.forEach((task) => {
        const string = `<div class="taskbar" data-id=${counter}>
                  <div class="taskbar__content">
                    <input
                      type="checkbox"
                      name="completed"
                      id=""
                      class="taskbar__checkbox"
                    />
                    <div class="taskbar__top">
                      <span class="taskbar__name">
                        <a href="" class="taskbar__name-link">${task.name}</a>
                      </span>
                      <span class="taskbar__folder">
                        ${renderFolder(task.folder)}
                      </span>
                    </div>
                    <div class="taskbar__priority">
                      &#9650;
                      
                    </div>
                    ${renderDescription(task.descript)}
                    <div class="taskbar__bottom">
                      <span class="taskbar__date">
                        <button type="button" class="taskbar__date-link">${renderDate(
                          task.date
                        )}</button>
                      </span>
                      <div class="taskbar__tagsection">
                        ${renderTags(task.tags)}
                      </div>
                    </div>
                  </div>
                  <div class="taskbar__trashbin">&#128465;</div>
                </div>`;
    
        taskview.insertAdjacentHTML("beforeend", string);
    
        const editLink = document.querySelector(
          `div[data-id='${counter}'] .taskbar__date-link`
        );
        setEditDateModal(task, editLink);
    
        counter++;
      });
}

const token = {counter:1}

function g(h){
    h.counter++
}

g(token)

token