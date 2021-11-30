

export const hideFocus = function () {
    const cardBackdrop = document.querySelectorAll('.gallery__item');
    if(document.body.classList.contains("modal-open")) {
        cardBackdrop.forEach(element => {    
            element.style.transform != "scale(1.0)" ? element.style.transform = "scale(1.0)" : element.style.removeProperty('transform');
        });
    } else {
       return;
    }
};