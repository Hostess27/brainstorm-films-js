const refs = {
    spinner: document.querySelector('.spinner'),
    spinnerWraper: document.querySelector('.spin-wrapper'),
};

function addSpinner() {
  refs.spinner.classList.remove('visually-hidden');
  refs.spinnerWraper.classList.remove('visually-hidden');
};

function removeSpinner() {
  refs.spinner.classList.add('visually-hidden');
  refs.spinnerWraper.classList.add('visually-hidden');
};