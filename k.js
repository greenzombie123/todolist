function createDate(date, time) {
    console.log({date, time});
    const today = new Date();
    const day = parseInt(date.slice(8)) || today.getDay();
    console.log(parseInt(date.slice(8)));  
    console.log(day);
    const hours = parseInt(time.slice(0, 3)) || 23;
    const minutes = parseInt(time.slice(3)) || 59;
    //const period = !hours ? null : parseInt(hours) < 12 ? "am" : "pm";
    const month = parseInt(date.slice(5, 7)) || today.getMonth();
    const year = parseInt(date.slice(0, 4)) || today.getFullYear();
    console.log(add(today, { year, month, day, hours, minutes }))
  
    return add(today, { year, month, day, hours, minutes });
  }

  createDate("12:12:11",'')