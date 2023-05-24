import { statusBtnHandler, addMonth, monthList, saveInLocalStorage } from './calendar.js';

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function generateNewMonthDays(year, monthNumber) {
  const monthsCollection = [];

  const firstDay = new Date(year, monthNumber, 1);

  const daysInMonth = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth() + 1,
    0
  ).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    firstDay.setDate(day);
    const dayOfWeek = weekDays[firstDay.getDay()];
    monthsCollection.push({
      day: day,
      dayName: dayOfWeek,
      status: 'none',
    });
  }
  saveInLocalStorage(`${year}-${monthNumber}`, [...monthsCollection])

  return monthsCollection;
}

function getMonthDaysFromLocalStorage(dayList) {
  const monthsCollection = [];

  dayList.forEach((day) => {
    monthsCollection.push({
      day: day.day,
      dayName: day.dayName,
      status: day.status,
    });
  });

  return monthsCollection;
}

function resetMonthName(yearSelect, monthSelect) {
  yearSelect.value = 'Select year';
  monthSelect.value = 'Select month';
}

function validateMonthValue(yearSelect, monthSelect) {
  if (
    yearSelect.value === 'Select year' ||
    monthSelect.value === 'Select month'
  ) {
    alert('Please select year and month!');
    return false;
  } else if (!localStorage.getItem('habit')) {
    alert('Please add habit first!');
    return false;
  } else if (localStorage.getItem(`${yearSelect.value}-${monthSelect.value}`)) {
    alert('This month has already been created! ');
    resetMonthName(yearSelect, monthSelect);
    return false;
  }
  return true;
}

function generateMonth(year, monthNumber, days) {
  addMonth(year, monthNumber, days);
  const monthName = monthList[monthNumber];
  const buttonsStatus = document.querySelectorAll(
    `.btn-status-${year}-${monthName}`
  );
  buttonsStatus.forEach((button) => {
    button.addEventListener('click', () => statusBtnHandler(button));
  });
}

function generateMonthBtnHandler() {
  const yearSelect = document.querySelector('.year');
  const monthSelect = document.querySelector('.month');

  if (!validateMonthValue(yearSelect, monthSelect)) {
    return false;
  } else {
    const days = generateNewMonthDays(yearSelect.value, monthSelect.value);
    generateMonth(yearSelect.value, monthSelect.value, days)
  }

  resetMonthName(yearSelect, monthSelect);
}

function generateMonthFromLocalStorage() {
  const monthIndex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  const monthsSaved = Object.keys(localStorage).sort();
  monthsSaved.forEach((month) => {
    const year = month.split('-')[0];
    const monthNumber = month.split('-')[1];
    if (monthIndex.includes(monthNumber)) {
      const dayList = JSON.parse(
        localStorage.getItem(`${year}-${monthNumber}`)
      );
      const days = getMonthDaysFromLocalStorage(dayList);
      generateMonth(year, monthNumber, days)
    }
  });
}

export { generateMonthBtnHandler, generateMonthFromLocalStorage };
