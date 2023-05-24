const monthWrapper = document.querySelector('.month-wrapper');
const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function saveInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function changeHabitActivity(button, action) {
  const btnElement = document.querySelector(`[class="${button.classList}"]`);
  const monthWrap =
    btnElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      .parentNode;
  const monthSummary = monthWrap.querySelector('.done-habit');
  if (action === 'add') {
    monthSummary.textContent = parseInt(monthSummary.textContent) + 1;
  } else if (action === 'remove') {
    monthSummary.textContent = parseInt(monthSummary.textContent) - 1;
  }
}

function changeStatusColor(button, dayObject) {
  if (button.classList.contains('bg-base-300')) {
    button.classList.add('bg-primary-focus');
    button.classList.remove('bg-base-300');
    dayObject.status = 'done';
    changeHabitActivity(button, 'add');
  } else if (button.classList.contains('bg-primary-focus')) {
    button.classList.add('bg-error-content');
    button.classList.remove('bg-primary-focus');
    dayObject.status = 'remove';
    changeHabitActivity(button, 'remove');
  } else if (button.classList.contains('bg-error-content')) {
    button.classList.add('bg-base-300');
    button.classList.remove('bg-error-content');
    dayObject.status = 'none';
  }
}

function statusBtnHandler(button) {
  const monthName = button.classList[0].split('-')[1];
  const year = button.classList[0].split('-')[2];
  const monthKey = `${year}-${monthList.indexOf(monthName)}`;
  const monthValue = localStorage.getItem(monthKey);

  const btnElement = document.querySelector(`[class="${button.classList}"]`);
  const dayWrapper = btnElement.parentNode.parentNode.parentNode;
  const dayNumber = dayWrapper.querySelector('.day-number').textContent;
  const parsedMonthValue = JSON.parse(monthValue);
  const dayObject = parsedMonthValue[dayNumber - 1];

  changeStatusColor(button, dayObject);
  saveInLocalStorage(`${year}-${monthList.indexOf(monthName)}`, [
    ...parsedMonthValue,
  ]);
}

function checkDayNameColor(dayName) {
  if (dayName == 'Saturday' || dayName == 'Sunday') {
    return 'badge badge-secondary badge-md';
  } else {
    return 'badge badge-md';
  }
}

function checkStatusFromLocalStorage(status) {
  if (status == 'done') {
    return 'bg-primary-focus';
  } else if (status == 'remove') {
    return 'bg-error-content';
  } else {
    return 'bg-base-300';
  }
}

function createRow(day, dayName, status, monthName, year) {
  const rowDay = `<tr>
    <th>
      <div class="w-8 h-8 rounded-full flex items-center justify-center">
        <div class="${day}-${monthName}-${year} ${checkStatusFromLocalStorage(
    status
  )} w-6 h-6 rounded-full btn-status-${year}-${monthName}"></div>
      </div>
    </th>
    <td>
      <div class="flex items-center space-x-3">
        <div class="font-bold day-number">${day}</div>
      </div>
    </td>
    <td>
      <span class="${checkDayNameColor(dayName)}">${dayName}</span>
    </td>
  </tr>`;

  return rowDay;
}

function generateMonth(year, monthName, days) {
  const rowsDays = [];
  let statusCounter = 0;

  days.forEach((day) => {
    rowsDays.push(createRow(day.day, day.dayName, day.status, monthName, year));
    statusCounter += day.status == 'done' ? 1 : 0;
  });

  const schema = `<div class="flex w-64 bg-base-content rounded-t-lg">
      <div class="w-42">${monthName} ${year}</div>
      <div class="w-22 ml-auto day-tracker"><span class="done-habit">${statusCounter}</span>/${
    days.length
  }</div>
    </div>

    <div class="w-64 max-h-80 overflow-y-auto overflow-x-hidden">
    <table class="table table-compact w-64">
      <!-- head -->
      <thead>
        <tr class="sticky top-0">
          <th>Status</th>
          <th>Day</th>
          <th>Name of Day</th>
        </tr>
      </thead>
      <tbody>
        ${rowsDays.join('')}
      </tbody>
    </table>
  </div>`;

  return schema;
}

function addMonth(year, monthNumber, days) {
  const monthCard = document.createElement('div');
  monthCard.classList.add('overflow-x-auto', 'w-1/5', 'mx-auto', 'my-4');
  monthCard.innerHTML = generateMonth(year, monthList[monthNumber], days);
  monthWrapper.appendChild(monthCard);
}

export { statusBtnHandler, addMonth, monthList, saveInLocalStorage };
