const refs = {
    closeModalTeamBtn: document.querySelector('[data-modal-team-close]'),
    modalTeam: document.querySelector('[data-modal-team]'),
    footerLink: document.querySelector('.developed'),
    modalTeamBackdrop: document.querySelector('.backdrop-team'),
    modalTeamFlip: document.querySelectorAll('.flipper')
};

    refs.closeModalTeamBtn.addEventListener('click', CloseModalTeam);
    refs.footerLink.addEventListener('click', OpenModalTeam);

function CloseModalTeam() {
    document.body.classList.remove('modal-team-open');
    refs.modalTeam.classList.add('backdrop--is-hidden');
};

function OpenModalTeam() {
    document.body.classList.add('modal-team-open');
    refs.modalTeam.classList.remove('backdrop--is-hidden');
};

refs.modalTeamBackdrop.addEventListener('click', evt => {
    const element = evt.target.closest('.modal-team');
    if(element) return;
    CloseModalTeam();
});

window.addEventListener('keydown', evt => {
    if(evt.code === "Escape" && document.body.classList.contains('modal-team-open')) CloseModalTeam();
});

// Функція для повороту фото члена команди на qrcode і назад
(() => {
    refs.modalTeamFlip.forEach(element => {
        element.addEventListener('click', evt => {
            evt.currentTarget.style.transform != 'rotateY(180deg)' ? evt.currentTarget.style.transform = 'rotateY(180deg)' : evt.currentTarget.style.removeProperty('transform');
        });
    });
})();