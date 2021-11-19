const refs = {
    spinner: document.querySelectorAll('.inner')
};
function addSpinner() {
    refs.spinner.forEach(elem=>elem.classList.remove('visually-hidden'));
};
function removeSpinner() {
    refs.spinner.forEach(elem=>elem.classList.add('visually-hidden'));
};
console.log("o", refs.spinner);
// addSpinner();
// removeSpinner();