const habitName = document.querySelector('.habit-name');
const habitWrapper = document.querySelector('.habit-input-wrapper');
const habitInput = document.querySelector('.input-habit');
const habitText = document.querySelector('.habit-text');
const monthWrapper = document.querySelector('.month-wrapper');

function changeHabitVisibility() {
  habitName.classList.toggle('hidden');
  habitWrapper.classList.toggle('hidden');
}

function removeHabit() {
  changeHabitVisibility();
  monthWrapper.innerHTML = '';
  localStorage.clear();
}

function submitHabit() {
  changeHabitVisibility();
  localStorage.setItem('habit', habitInput.value);
  habitText.textContent = habitInput.value;
  habitInput.value = '';
}

function generateHabitFromLocalStorage() {
  if (localStorage.getItem('habit')) {
    changeHabitVisibility();
    habitText.textContent = localStorage.getItem('habit');
    habitInput.value = '';
  }
}

function submitHabitBtnHandler() {
  if (habitInput.value === '') {
    alert('Please enter a name for your habit');
  } else {
    submitHabit();
  }
}

function removeHabitBtnHandler() {
  removeHabit();
}

export { submitHabitBtnHandler, removeHabitBtnHandler, generateHabitFromLocalStorage };
