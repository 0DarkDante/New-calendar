let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');
let info = calendar.querySelector('.info');

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

draw(body, year, month);

function draw(body, year, month) {
  let arr = range(getLastDay(year, month));

  let firstWeekDay = getFirstWeekDay(year, month);
  let lastWeekDay = getLastWeekDay(year, month);

  let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
  createTable(body, nums, year, month);
  
  // Оновлення інформації про місяць та рік
  info.textContent = getMonthName(month) + ' ' + year;
}

function createTable(parent, arr, year, month) {
  parent.textContent = '';
  let cells = [];

  for (let sub of arr) {
    let tr = document.createElement('tr');

    for (let num of sub) {
      let td = document.createElement('td');
      td.textContent = num;
      tr.appendChild(td);

      cells.push(td);

      // Підсвічування поточного дня
      if (num === date.getDate() && month === date.getMonth() && year === date.getFullYear()) {
        td.classList.add('today');
      }
    }

    parent.appendChild(tr);
  }

  return cells;
}

function normalize(arr, left, right) {
  for (let i = 0; i < left; i++) {
    arr.unshift('');
  }
  for (let i = 0; i < right; i++) {
    arr.push('');
  }

  return arr;
}

function getFirstWeekDay(year, month) {
  let date = new Date(year, month, 1);
  let num = date.getDay();

  return (num === 0) ? 6 : num - 1;
}

function getLastWeekDay(year, month) {
  let date = new Date(year, month + 1, 0);
  let num = date.getDay();

  return (num === 0) ? 6 : num - 1;
}

function getLastDay(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

function range(count) {
  let arr = [];

  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }

  return arr;
}

function chunk(arr, n) {
  let result = [];
  let count = Math.ceil(arr.length / n);

  for (let i = 0; i < count; i++) {
    let elems = arr.splice(0, n);
    result.push(elems);
  }

  return result;
}

function getMonthName(month) {
  const monthNames = [
    'Січень', 'Лютий', 'Березень',
    'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень',
    'Жовтень', 'Листопад', 'Грудень'
  ];
  return monthNames[month];
}

// Функція для отримання наступного року
function getNextYear(currentYear, currentMonth) {
  return (currentMonth === 11) ? currentYear + 1 : currentYear;
}

// Функція для отримання наступного місяця
function getNextMonth(currentMonth) {
  return (currentMonth === 11) ? 0 : currentMonth + 1;
}

// Функція для отримання попереднього року
function getPrevYear(currentYear, currentMonth) {
  return (currentMonth === 0) ? currentYear - 1 : currentYear;
}

// Функція для отримання попереднього місяця
function getPrevMonth(currentMonth) {
  return (currentMonth === 0) ? 11 : currentMonth - 1;
}

// Обробник для кнопки "Вперед"
next.addEventListener('click', function () {
  year = getNextYear(year, month);
  month = getNextMonth(month);
  draw(body, year, month);
});

// Обробник для кнопки "Назад"
prev.addEventListener('click', function () {
  year = getPrevYear(year, month);
  month = getPrevMonth(month);
  draw(body, year, month);
});
