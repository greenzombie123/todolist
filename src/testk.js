import { compareDesc } from "date-fns";

const date1 = new Date();
const date2 = new Date();
date2.setDate(12);

const result = compareDesc(date1, date2);

result;

function display(num) {
  switch (num) {
    case -1:
        return `date1 is after date2`

    case 0:
        return "equal"

    case 1:
        return "date1 is before date2"

    default:
      break;
  }
}

console.log(display(result))
