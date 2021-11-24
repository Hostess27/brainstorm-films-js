document.querySelector('.search-form__label').addEventListener('click', function (e) {
  upItem(e);
});

function upItem(e) {
  e.target.style.transform = 'translateY(-120%)';
}
