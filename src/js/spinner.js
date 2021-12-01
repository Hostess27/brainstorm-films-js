const refs = {
    spinner: document.querySelector('.spinner'),
    spinnerWraper: document.querySelector('.spin-wrapper'),
};

export const addSpinner = function () {
  refs.spinner.classList.remove('visually-hidden');
  refs.spinnerWraper.classList.remove('visually-hidden');
};

export const removeSpinner = function () {
  refs.spinner.classList.add('visually-hidden');
  refs.spinnerWraper.classList.add('visually-hidden');
};