import { formatDateForInput } from "../../edit";

export const createDateModal = ({ date = null}) => {
    const {timeString, dateString} = date ? formatDateForInput(date) : {timeString:null, dateString:null} 

  const string = `<div
    class="task-create__date-container"
  >
    <label class="task-create__date-container__date-label" for="date"
      >Deadline</label
    >
    <label class="task-create__date-container__time-label" for="time"
      >Time</label
    >
    <input type="date" name="date" class="task-create__date-input" value="${dateString || ''}"/>

    <input
      type="time"
      name="time"
      class="task-create__time-input"
      value="${timeString || ''}"
    />`;
    return string
};

