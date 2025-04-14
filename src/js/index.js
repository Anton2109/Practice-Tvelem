/* Popup */

document.addEventListener("DOMContentLoaded", () => {
  const locationBlock = document.querySelector(".main-header__location");
  const popup = document.querySelector(".main-header__address-popup");
  const cityElement = document.querySelector(".main-header__city");
  const addressElement = document.querySelector(".main-header__address");
  const items = document.querySelectorAll(".main-header__address-item");
  const overlay = document.querySelector(".overlay");
  const confirmButton = document.querySelector(".main-header__address-button");
  const closeButton = document.querySelector(".main-header__close-popup");

  const togglePopup = (isOpen) => {
    if (isOpen) {
      overlay.style.display = "block";
      popup.style.display = "block";
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        overlay.classList.add("show");
        popup.classList.add("show");
      }, 10);
    } else {
      overlay.classList.remove("show");
      popup.classList.remove("show");

      setTimeout(() => {
        overlay.style.display = "none";
        popup.style.display = "none";
        document.body.style.overflow = "";
      }, 300);
    }
  };

  locationBlock.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopup(popup.style.display !== "block");
  });

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      items.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  confirmButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const activeItem = document.querySelector(
      ".main-header__address-item.active"
    );

    if (activeItem) {
      cityElement.textContent = activeItem.dataset.city;
      addressElement.textContent = activeItem.querySelector(
        ".main-header__address-street"
      ).textContent;
    }

    togglePopup(false);
  });

  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopup(false);
  });

  document.addEventListener("click", (e) => {
    const isInsidePopup =
      popup.contains(e.target) || locationBlock.contains(e.target);
    if (!isInsidePopup) togglePopup(false);
  });
});

/* Slider */

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  slidesPerGroup: 1,
  speed: 600,
  navigation: {
    nextEl: ".popular-products__nav-btn--next",
    prevEl: ".popular-products__nav-btn--prev",
  },
});

/* Checkbox */

document.addEventListener("DOMContentLoaded", () => {
  const checkboxInput = document.querySelector(
    ".form-container__checkbox__input"
  );
  const checkboxLabel = document.querySelector(
    ".form-container__checkbox__label"
  );

  function updateCheckboxState() {
    if (checkboxInput.checked) {
      checkboxLabel.classList.add("checked");
    } else {
      checkboxLabel.classList.remove("checked");
    }
  }

  checkboxInput.addEventListener("change", () => {
    updateCheckboxState();
  });

  updateCheckboxState();
});

/* Search */

document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.querySelector(".main-header__search-btn");
  const searchIcon = document.querySelector(".main-header__icon--search");
  const closeIcon = document.querySelector(".main-header__icon--close");
  const searchPopup = document.querySelector(".main-header__search-popup");
  const searchInput = document.querySelector(".main-header__search-input");

  searchPopup.style.transition = "opacity 0.3s ease";

  searchBtn.addEventListener("click", function() {
    if (searchPopup.style.display === "block") {
      searchPopup.style.opacity = "0";
      searchIcon.style.display = "inline-block";
      closeIcon.style.display = "none";
      setTimeout(() => {
        searchPopup.style.display = "none";
      }, 300);
    } else {
      searchPopup.style.display = "block";
      searchIcon.style.display = "none";
      closeIcon.style.display = "inline-block";
      setTimeout(() => {
        searchPopup.style.opacity = "1";
        searchInput.focus();
      }, 10);
    }
  });

  document.addEventListener("click", function(e) {
    if (
      !e.target.closest(".search-container") &&
      searchPopup.style.display === "block"
    ) {
      searchPopup.style.opacity = "0";
      searchIcon.style.display = "inline-block";
      closeIcon.style.display = "none";
      setTimeout(() => {
        searchPopup.style.display = "none";
      }, 300);
    }
  });
});

/* Валидация формы */ 

import JustValidate from 'just-validate';

document.addEventListener('DOMContentLoaded', () => {
  
  const validator = new JustValidate('.form-container__form', {
    errorFieldCssClass: 'form-container__input--error',
    errorLabelCssClass: 'form-container__error-label',
    errorLabelStyle: {
      color: '#ff4d4f',
    },
    successFieldCssClass: 'form-container__input--success',
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
    focusInvalidField: false,
  });

  validator.addField('.form-container__input[name="name"]', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимум 2 символа',
    },
  ]);

  validator.addField('.form-container__input[name="phone"]', [
    {
      rule: 'required',
      errorMessage: 'Введите телефон',
    },
    {
      rule: 'number',
      errorMessage: 'Только цифры',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Минимум 10 цифр',
    },
  ]);
 
  validator.addField('.form-container__input[name="email"]', [
    {
      rule: 'required',
      errorMessage: 'Введите email',
    },
    {
      rule: 'email',
      errorMessage: 'Введите email в формате: имя@домен.ру',
    },
  ]);
 
  validator.addField('.form-container__input[name="question"]', [
    {
      rule: 'required',
      errorMessage: 'Введите запрос',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Минимум 10 символов',
    },
  ]);

  validator.addField('#checkbox1', [
    {
      rule: 'required',
      errorMessage: 'Необходимо согласие',
    },
  ]);

  validator.onSuccess((e) => {
    alert('Форма отправлена'); 
  });
});
