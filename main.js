let button = document.querySelectorAll('.btn__send');

console.log(button);


button.forEach(ev => {
    console.log(ev);
});





// let btnOpen = document.getElementById('modal-open');
// let modal = document.getElementById('modal-type');

// let overlay = document.getElementById('overlay');
// let btnClose = document.getElementById('modal-close');

// btnOpen.addEventListener('click', function () {
//     modal.classList.add('modal__active');
// });

// function closeModal() {
//     modal.classList.remove('modal__active');
// }

// overlay.addEventListener('click', closeModal);
// btnClose.addEventListener('click', closeModal);