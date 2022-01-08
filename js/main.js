/*preloader*/
const preloaderEl = document.createElement('div');
const body = document.querySelector('body');

preloaderEl.classList.add('preloader');
preloaderEl.innerHTML = ` 
  <div class="loading">
    <div class="sk-folding-cube">
      <div class="sk-cube sk-cube-1"></div>
      <div class="sk-cube sk-cube-2"></div>
      <div class="sk-cube sk-cube-4"></div>
      <div class="sk-cube sk-cube-3"></div>
    </div>
  </div>`;
body.style.overflow = 'hidden';
body.append(preloaderEl);

window.onload = function () {
  body.style.overflow = '';
  preloaderEl.remove();
}

/*smoothScroll*/
const navItemsEl = document.querySelectorAll('.nav__item');

const smoothScroll = event => {
  event.preventDefault();

  const itemHash = event.target.getAttribute('href');

  if(itemHash) {
    document.querySelector('' + itemHash).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

};

navItemsEl.forEach(navItem => {
  navItem.addEventListener('click', smoothScroll);
});


/*modal window*/
const overlay = document.createElement('div'),
      modal = document.createElement('div'),
      buttons = document.querySelectorAll('.btn');

/*Убираем дефолтное поведение кнопок*/
buttons.forEach(button => button.addEventListener('click', event => {
  event.preventDefault();
}));

/*Добавляем классы к созданным элементам*/
overlay.classList.add('overlay');
modal.classList.add('modal');

modal.innerHTML = `
<div class="modal__close">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.3502 1.74379C12.5455 1.54853 12.5455 1.23195 12.3502 1.03669C12.155 0.841425 11.8384 0.841425 11.6431 1.03669L12.3502 1.74379ZM1.03653 11.6433C0.841269 11.8386 0.841268 12.1551 1.03653 12.3504C1.23179 12.5457 1.54838 12.5457 1.74364 12.3504L1.03653 11.6433ZM11.5562 12.2635C11.7515 12.4587 12.068 12.4587 12.2633 12.2635C12.4586 12.0682 12.4586 11.7516 12.2633 11.5563L11.5562 12.2635ZM1.6567 0.949748C1.46144 0.754486 1.14485 0.754486 0.94959 0.949748C0.754328 1.14501 0.754328 1.46159 0.94959 1.65685L1.6567 0.949748ZM11.6431 1.03669L6.33983 6.33999L7.04694 7.04709L12.3502 1.74379L11.6431 1.03669ZM6.33983 6.33999L1.03653 11.6433L1.74364 12.3504L7.04694 7.04709L6.33983 6.33999ZM6.33983 7.0471L11.5562 12.2635L12.2633 11.5563L7.04694 6.33999L6.33983 7.0471ZM7.04694 6.33999L1.6567 0.949748L0.94959 1.65685L6.33983 7.0471L7.04694 6.33999Z"
        fill="#008DCD" />
    </svg>
  </div>

  <h2 class=" modal__heading">Оставьте заявку, и мы Вам перезвоним!</h2>

  <form action="#" class="form__modal">
    <input class="form__modal-input text" type="text" name="name" placeholder="Ваше имя">
    <input class="form__modal-input text" type="tel" name="tel" placeholder="Ваш телефон">
    <button class="form__modal-btn btn order-btn" type="submit">Заказать звонок</button>
  </form>`;

/*Функции*/
const modalWindowOpen = () => {
  body.append(modal);
  body.append(overlay);

  modal.style.display = "block";
  overlay.style.display = "block";
};

const modalWindowClose = () => {
  overlay.remove();
  modal.remove();
};

document.addEventListener('click', event => {
  const target = event.target;

  if(target.closest('.btn__send')) {
    event.preventDefault();
    modalWindowOpen();
  }

  if(target.closest('.modal__close') || target.closest('.overlay')) {
    modalWindowClose();
  }

})

/*Accordion*/

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(faqItem => {
  faqItem.addEventListener('click', event => {
    const target = event.target;
    const itemContent = document.querySelector('.faq__item-content'); 

    target.classList.add('active-item');
    itemContent.classList.add('show-item');


  })
})
