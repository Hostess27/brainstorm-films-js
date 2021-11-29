const themeSwitch = document.querySelector('.toolbar');
const userRegistration = document.querySelector('.user-registration');
const upButton = document.querySelector('.up-btn-container');

export const addScrollHideWidth = function () {
    if (document.body.classList.contains("modal-open") || document.body.classList.contains("modal-team-open")) {
        document.body.style.marginRight = '10px';
        themeSwitch.style.right = '10px';
        userRegistration.style.right = '30px';
        upButton.style.right = 'calc(3% + 10px)';
    } else {
        document.body.style.marginRight = '0';
        themeSwitch.style.right = '0';
        userRegistration.style.right = '20px';
        upButton.style.right = '3%';
    }
};