import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');



let userSelectedDate = 0;
let timerId = null;
let changeDate = null;

btnStartEl.disabled = true;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkDate(selectedDates[0]);
   },
});


function checkDate(date) {
  if (date < Date.now()) {
    iziToast.error({
      backgroundColor: 'red',
      messageColor: 'white',
      position: 'topRight',
      message: 'Please choose a date in the future',
      closeOnClick: true,
      close: false,
      timeout: 2000,
      iconUrl: 'https://www.svgrepo.com/show/437366/xmark-circle.svg',
    });
    return;
  } else {
    btnStartEl.disabled = false;
  }
  userSelectedDate = date.getTime() - Date.now();
  changeDate = convertMs(userSelectedDate);
  timerEnd(changeDate);
}

  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


btnStartEl.addEventListener('click', initializeClock);

function initializeClock() {
  timerId = setInterval(function() {
  btnStartEl.disabled = true;
  inputEl.disabled = true;

  userSelectedDate -= 1000;

  if (userSelectedDate <=0) {
    clearInterval(timerId);
    btnStartEl.disabled = false;
    inputEl.disabled = false;
  } else {
    changeDate = convertMs(userSelectedDate);
    timerEnd(changeDate);
  }
}, 1000);
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timerEnd(changeDate) {
  daysEl.textContent = changeDate.days;
  hoursEl.textContent = changeDate.hours;
  minutesEl.textContent = changeDate.minutes;
  secondsEl.textContent = changeDate.seconds;
}