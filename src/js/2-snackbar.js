import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const buttonEl = document.querySelector('button');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const state = form.elements.state.value;

    settingPromise(delay, state)
        .then(onFulfilled)
        .catch(onRegected);
  form.reset();
}

function settingPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function onFulfilled(delay) {
  iziToast.success({
    message: `✅ Fulfilled promise in ${delay}ms`,
    icon: '',
    backgroundColor: 'green',
    messageColor: 'white',
    position: 'topRight',
    close: false,
  });
}

function onRegected(delay) {
  iziToast.error({
    backgroundColor: 'light red',
    messageColor: 'white',
    position: 'topRight',
    message: `❌ Rejected promise in ${delay}ms`,
    close: false,
    iconColor: 'red',
    icon: '',
  });
}
