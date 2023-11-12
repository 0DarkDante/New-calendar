let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

function range(count) {
	let mas = [];
  for(let i = 1; i <= count; i++) {
    mas.push(i);
  }
  return mas;
}

function getLastDay(year, month) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

function getFirstWeekDay(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay();
}

function getLastWeekDay(year, month) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth.getDay();
}