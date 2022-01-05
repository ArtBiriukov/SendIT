//scroll

const navLinks = document.querySelectorAll('.navbar__link'),
  footerLinks = document.querySelectorAll('.footer__link');

const scrollEvent = event => {
  event.preventDefault();

  const itemHash = event.currentTarget.getAttribute('href');
  document.querySelector('' + itemHash).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

navLinks.forEach(navLink => {
  navLink.addEventListener('click', scrollEvent);
});

footerLinks.forEach(footerLink => {
  footerLink.addEventListener('click', scrollEvent);
});


//modal window

const overlay = document.querySelector('.overlay'),
  modalWindow = document.querySelector('.modal');

const modalOpen = () => {
  overlay.classList.toggle('active-modal')
  modalWindow.classList.toggle('active-modal');
};

document.addEventListener('click', event => {
  const target = event.target;

  //открытие модального окна
  if (target.closest('.btn__send')) {
    event.preventDefault();
    modalOpen()
  }

  //нажатие за оверлей
  if (target.classList.contains('overlay')) {
    if (modalWindow.classList.contains('active-modal')) {
      modalOpen();
    }
  }

  //кнопка закрытия
  if (target.closest('.modal__close')) {
      modalOpen();
    }

})
