/*preloader*/
const preloaderEl = document.createElement('div');
const body = document.querySelector('body');

preloaderEl.innerHTML = ` 
  <div class="preloader">
    <div class="loading">
      <div class="sk-folding-cube">
        <div class="sk-cube sk-cube-1"></div>
        <div class="sk-cube sk-cube-2"></div>
        <div class="sk-cube sk-cube-4"></div>
        <div class="sk-cube sk-cube-3"></div>
      </div>
    </div>
  </div> `;

body.style.overflow = 'hidden';
body.append(preloaderEl);

window.onload = function () {
  body.style.overflow = '';
  preloaderEl.remove();
}

/*Анимация*/
AOS.init();

/*smoothScroll*/
const navItemsEl = document.querySelectorAll('.nav__item');

/*Mobile Navbar */
const headerMobile = document.getElementById('header__mobile');

const smoothScroll = event => {
  event.preventDefault();
  const itemHash = event.target.getAttribute('href');

  if (itemHash) {
    document.querySelector('' + itemHash).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

navItemsEl.forEach(navItem => navItem.addEventListener('click', smoothScroll));

/*modal window*/
const modal = document.createElement('div'),
  overlay = document.querySelector('.overlay');

/*Добавляем класс к созданному элементу*/
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

  <form action="#" class="modal__form">
    <input class="modal__form-input text" type="text" name="name" placeholder="Ваше имя">
    <input class="modal__form-input text" type="tel" name="tel" placeholder="Ваш телефон">
    <button class="modal__form-btn btn order-btn" type="submit">Заказать звонок</button>
  </form>`;

/*Функции*/
//Показать / спрятать оверлай 
const overlayToggel = () => overlay.classList.toggle('overlay-open');

//Показать / спрятать мобильное меню
const toggelMenu = () => headerMobile.classList.toggle('nav__active');

//Показать модальное окно
const modalWindowOpen = () => {
  body.append(modal);
  overlayToggel();
  modal.classList.add('modal__show');
};

//Скрыть модальное окно
const modalWindowClose = () => {
  overlayToggel();
  modal.remove();
};

/*Accordion*/
const faqItems = document.querySelectorAll('.faq__item-heading');

faqItems.forEach(faqItem => {

  faqItem.addEventListener('click', () => {

    faqItem.classList.toggle('active');

    const faqBody = faqItem.nextElementSibling,
      faqBodyHeight = faqBody.scrollHeight;

    if (faqItem.classList.contains('active')) {
      faqBody.style.height = `${faqBodyHeight}px`;
    } else {
      faqBody.style.height = 0;
    }
  })
})

/* Делегирование */
document.addEventListener('click', event => {
  const target = event.target;

  /*Убираем дефолтное поведение кнопок*/
  if (target.closest('.btn')) {
    event.preventDefault();
  }

  if (target.closest('.btn__send')) {
    event.preventDefault();
    modalWindowOpen();
  }

  if (target.closest('.modal__close')) {
    modalWindowClose();
  }

  /*Скрывать мобильное меню*/
  if (target.closest('.nav__button') || target.closest('.nav__mobile-close') || target.closest('.nav__mobile-link')) {
    overlayToggel();
    toggelMenu();
  }

  /*Если клик по оверлай */
  if (target.classList.contains('overlay')) {

    /*закрыть модально окно */
    if (modal.classList.contains('modal__show')) {
      modalWindowClose();
    }
    /*Скрыть мобильное меню */
    if (headerMobile.classList.contains('nav__active')) {
      overlayToggel();
      toggelMenu();
    }
  }
})

/*Slider*/

class Slider {

  constructor({
    wrapper,
    sliders,
    nextButton,
    prewButton
  }) {
    this.wrapper = document.querySelector(wrapper);
    this.sliders = document.querySelectorAll(sliders);
    this.nextButton = document.querySelector(nextButton);
    this.prewButton = document.querySelector(prewButton);

    this.position = 0;
    this.interval = 4000;
  }

  init() {
    this.controlSlider();
    this.addSliderParams();
    this.startSlide();
  }

  addSliderParams() {
    /*Ширина слайдера*/
    this.sliderViewport = +this.wrapper.offsetWidth;

    for (const slider of this.sliders) {
      /*Ширина одного слайда*/
      this.sliderWidth = +slider.offsetWidth;

      /*Если ширина экрана меняется, то перезаписывается ширина слайда */
      window.addEventListener('resize', () => {
        this.sliderWidth = +slider.offsetWidth;
      });
    }

    /*Количество слайдов на экране */
    this.slidersCoutView = Math.ceil(this.sliderViewport / this.sliderWidth);
    console.log(this.slidersCoutView);
    /*Количество страниц со слайдами*/
    this.countSliderViewports = Math.ceil(this.sliders.length - this.slidersCoutView);
  }

  controlSlider() {
    this.prewButton.addEventListener('click', this.prevSlider.bind(this));
    this.nextButton.addEventListener('click', this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.position >= 0) {
      --this.position;
      if (this.position < 0) {
        this.position = this.countSliderViewports;
      }
    }
    this.wrapper.style.transform = `translateX(-${this.sliderWidth * this.position}px)`;
  }

  nextSlider() {
    if (this.position <= this.countSliderViewports) {
      ++this.position;
      if (this.position > this.countSliderViewports) {
        this.position = 0;
      }
    }
    this.wrapper.style.transform = `translateX(-${this.sliderWidth * this.position}px)`;
  }

  autoPlay() {
    this.play = setInterval(this.nextSlider.bind(this), this.interval);
  }

  startSlide() {
    this.autoPlay();

    this.prewButton.addEventListener('mouseout', this.autoPlay.bind(this));
    this.nextButton.addEventListener('mouseout', this.autoPlay.bind(this));

    this.prewButton.addEventListener('mouseover', this.stopSlide.bind(this));
    this.nextButton.addEventListener('mouseover', this.stopSlide.bind(this));
  }

  stopSlide() {
    clearInterval(this.play);
  }
}

const reviewConfigSlider = {
  wrapper: '.review__wrapper',
  sliders: '.review__slide',
  nextButton: '.review__button-next',
  prewButton: '.review__button-prev',
}

const warrantyConfigSlider = {
  wrapper: '.warranty__slider-wrapper',
  sliders: '.warranty__slider-slide',
  nextButton: '.warranty__button-next',
  prewButton: '.warranty__button-prev',
}

const partnersConfigSlider = {
  wrapper: '.partners__wrapper',
  sliders: '.partners__slide',
  nextButton: '.partners__button-next',
  prewButton: '.partners__button-prev',
}

const sliderReview = new Slider(reviewConfigSlider);
const sliderWarranty = new Slider(warrantyConfigSlider);
const sliderPartners = new Slider(partnersConfigSlider);

// sliderReview.init();
// sliderWarranty.init();
sliderPartners.init();