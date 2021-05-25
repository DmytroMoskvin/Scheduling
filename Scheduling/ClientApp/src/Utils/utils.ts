export function validateEmail(email: string):boolean {
  const emailRegularEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegularEx.test(email);
}

export function getAllWorkHoursOfMonth():number {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let workDays = 0;

  for (let day = 1; day <= 31; day++) {
      let t = new Date(year, month, day);

      if (t.getMonth() > month) {
          return workDays * 8;
      }
      if (t.getDay() === 0 || t.getDay() === 6) {
          continue; 
      }
      workDays++;
  }
  return workDays * 8;  
}