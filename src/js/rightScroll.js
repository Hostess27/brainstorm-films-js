const refs = {
    themeSwitch: document.querySelector('.toolbar'),
    userRegistration: document.querySelector('.user-registration'),
    upButton: document.querySelector('.up-btn-container'),
    teamModal: document.querySelector('.modal-team'),
    filmModal: document.querySelector('.modal'),
} 


export const addScrollHideWidth = function () {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        if (document.body.classList.contains("modal-open") || document.body.classList.contains("modal-team-open")) {
            document.body.style.marginRight = '10px';
            refs.themeSwitch.style.right = '10px';
            refs.userRegistration.style.right = '30px';
            refs.upButton.style.right = 'calc(3% + 10px)';
            refs.teamModal.style.left = 'calc(50% - 5px)';
            refs.filmModal.style.left = 'calc(50% - 5px)';
        } else {
            document.body.style.marginRight = '0';
            refs.themeSwitch.style.right = '0';
            refs.userRegistration.style.right = '20px';
            refs.upButton.style.right = '3%';
            refs.teamModal.style.left = '50%';
            refs.filmModal.style.left = '50%';
        }
    } else {
        return;
    }
};