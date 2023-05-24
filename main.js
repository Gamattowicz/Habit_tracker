import {
  submitHabitBtnHandler,
  removeHabitBtnHandler,
  generateHabitFromLocalStorage,
} from './src/habitGenerator.js';
import { generateMonthBtnHandler, generateMonthFromLocalStorage } from './src/monthGenerator.js';

const removeHabitBtn = document.querySelector('.remove-habit-button');
const submitHabitBtn = document.querySelector('.submit-habit-button');
const generateMonthBtn = document.querySelector('.generate-month-button');

document.addEventListener('DOMContentLoaded', () => {
  generateHabitFromLocalStorage();
  generateMonthFromLocalStorage();
});

submitHabitBtn.addEventListener('click', submitHabitBtnHandler);
removeHabitBtn.addEventListener('click', removeHabitBtnHandler);
generateMonthBtn.addEventListener('click', generateMonthBtnHandler);
