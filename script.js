let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1; // Добавляем 1, чтобы получить текущий месяц

function range(count) {
  let mas = [];
  for (let i = 1; i <= count; i++) {
    mas.push(i);
  }
  return mas;
}

function getLastDay(year, month) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

function getFirstWeekDay(year, month) {
  const firstDayOfMonth = new Date(year, month - 1, 1); // Вычитаем 1, чтобы учесть корректные индексы месяцев
  let firstWeekDay = firstDayOfMonth.getDay();
  return (firstWeekDay + 6) % 7; // Исправляем для правильного начала с понедельника
}

function getLastWeekDay(year, month) {
  const lastDayOfMonth = new Date(year, month, 0);
  let lastWeekDay = lastDayOfMonth.getDay();
  return (lastWeekDay + 6) % 7; // Исправляем для правильного начала с понедельника
}

function normalize(arr, left, right) {
  const normalizedArray = [...Array(left).fill(""), ...arr, ...Array(right).fill("")];
  return normalizedArray;
}

function chunk(arr, n) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}

function createTable(parent, arr) {
  for (let i = 0; i < arr.length; i++) {
    let row = parent.insertRow();
    for (let j = 0; j < arr[i].length; j++) {
      let cell = row.insertCell();
      cell.textContent = arr[i][j] || ""; // Добавляем проверку на пустые ячейки
      if (arr[i][j] === date.getDate() && month === date.getMonth() + 1 && year === date.getFullYear()) {
        cell.classList.add("today"); // Выделение ячейки для текущей даты
      }
    }
  }
}

let arr = range(getLastDay(year, month));
let firstWeekDay = getFirstWeekDay(year, month);
let lastWeekDay = getLastWeekDay(year, month);

let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
let tableBody = document.querySelector('.body');

createTable(tableBody, nums);
