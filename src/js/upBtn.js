document.addEventListener('DOMContentLoaded', () => {
    let toTopBtn = document.querySelector('.up-btn');
    window.onscroll = function () {
        if (window.pageYOffset > 400) {
            toTopBtn.style.display = 'block'
        } else {
            toTopBtn.style.display = 'none'
        }
    }
});