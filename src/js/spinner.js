const refs = {
    spinner1: document.querySelectorAll('.inner'),
    spinner2: document.querySelectorAll('.block'),
    spinner3: document.querySelectorAll('.spinnerV3'),
    spinner4: document.querySelectorAll('.spinnerV4'),
    spinner5: document.querySelectorAll('.wave'),
    spinner6: document.querySelectorAll('.ring'),
    spinner7: document.querySelectorAll('.no-freeze-spinner'),
};

document.addEventListener('keydown', function (event) {
    removeAllSpinners()
    if (event.key == 1) {
      addSpinner1();
    };
    if (event.key == 2) {
      addSpinner2();
    };
    if (event.key == 3) {
      addSpinner3();
    };
    if (event.key == 4) {
      addSpinner4();
    };
    if (event.key == 5) {
      addSpinner5();
    };
    if (event.key == 6) {
      addSpinner6();
    };
    if (event.key == 7) {
      addSpinner7();
    };
});

function removeAllSpinners() {
    refs.spinner1.forEach(elem => elem.classList.add('visually-hidden'));
    refs.spinner2.forEach(elem => elem.classList.add('visually-hidden'));
    refs.spinner3.forEach(elem => elem.classList.add('visually-hidden'));
    refs.spinner4.forEach(elem => elem.classList.add('visually-hidden'));
    refs.spinner5.forEach(elem => elem.classList.add('visually-hidden'));
    refs.spinner6.forEach(elem => elem.classList.add('visually-hidden'));
    refs.spinner7.forEach(elem => elem.classList.add('visually-hidden'));
};

// Spiner1
function addSpinner1() {
    refs.spinner1.forEach(elem=>elem.classList.remove('visually-hidden'));
};

// Spiner2
function addSpinner2() {
    refs.spinner2.forEach(elem=>elem.classList.remove('visually-hidden'));
};

// Spiner3
function addSpinner3() {
    refs.spinner3.forEach(elem=>elem.classList.remove('visually-hidden'));
};

// Spiner4
function addSpinner4() {
    refs.spinner4.forEach(elem=>elem.classList.remove('visually-hidden'));
};

// Spiner5
function addSpinner5() {
    refs.spinner5.forEach(elem=>elem.classList.remove('visually-hidden'));
};

// Spiner6
function addSpinner6() {
    refs.spinner6.forEach(elem=>elem.classList.remove('visually-hidden'));
};

// Spiner7
function addSpinner7() {
    refs.spinner7.forEach(elem=>elem.classList.remove('visually-hidden'));
};