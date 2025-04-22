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

  if (
    locationBlock &&
    popup &&
    cityElement &&
    addressElement &&
    items.length &&
    overlay &&
    confirmButton &&
    closeButton
  ) {
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
  }
});

/* Search */

document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.querySelector(".main-header__search-btn");
  const searchIcon = document.querySelector(".main-header__icon--search");
  const closeIcon = document.querySelector(".main-header__icon--close");
  const searchPopup = document.querySelector(".main-header__search-popup");
  const searchInput = document.querySelector(".main-header__search-input");

  if (searchBtn && searchIcon && closeIcon && searchPopup && searchInput) {
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
  }
});

/* Валидация формы */

import JustValidate from "just-validate";
import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container__form");
  if (!form) return;

  const modal = document.getElementById("successModal");
  const closeModal = modal?.querySelector(".modal__close--icon");

  function openModal() {
    if (modal) {
      modal.style.display = "flex";
    }
  }

  function closeModalHandler() {
    if (modal) {
      modal.style.display = "none";
    }
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeModalHandler);
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModalHandler();
    }
  });

  const fileInput = document.getElementById("fileInput");
  const fileInfoText = document.querySelector(".form-container__file-info");
  const fileLabel = document.querySelector('label[for="fileInput"]');
  const uploadWrapper = document.querySelector(
    ".form-container__upload-wrapper"
  );
  const maxFileSize = 25 * 1024 * 1024;

  if (fileInput && fileInfoText && fileLabel && uploadWrapper) {
    function resetFileInput() {
      fileInput.value = "";
      fileInfoText.textContent = "Можно прикрепить к форме файл до 25 МБ";
      fileInfoText.style.color = "";
      fileLabel.textContent = "Выбрать файл";

      const uploadIcon = uploadWrapper.querySelector(
        ".form-container__file--upload"
      );
      const deleteIcon = uploadWrapper.querySelector(
        ".form-container__file--delete"
      );
      if (uploadIcon) uploadIcon.remove();
      if (deleteIcon) deleteIcon.remove();

      const clipIcon = document.createElement("span");
      clipIcon.className = "form-container__icon form-container__icon--clip";
      uploadWrapper.insertBefore(clipIcon, fileLabel);
    }

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];

      if (file) {
        if (file.size > maxFileSize) {
          fileInfoText.textContent = "Ваш файл превышает 25 МБ";
          fileInfoText.style.color = "#ff4d4f";
          fileInput.value = "";
        } else {
          const clipIcon = uploadWrapper.querySelector(
            ".form-container__icon--clip"
          );
          if (clipIcon) clipIcon.remove();

          const uploadIcon = document.createElement("span");
          uploadIcon.className = "form-container__file--upload";

          const deleteIcon = document.createElement("span");
          deleteIcon.className = "form-container__file--delete";
          deleteIcon.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            resetFileInput();
          });

          const maxLength = 15;
          const extension = file.name.split(".").pop();
          const nameWithoutExt = file.name.slice(0, -(extension.length + 1));

          if (file.name.length > maxLength) {
            const keepChars = Math.max(3, maxLength - extension.length - 3);
            fileLabel.textContent = `${nameWithoutExt.substring(
              0,
              keepChars
            )}...${extension}`;
          } else {
            fileLabel.textContent = file.name;
          }

          uploadWrapper.innerHTML = "";
          uploadWrapper.appendChild(uploadIcon);
          uploadWrapper.appendChild(fileLabel);
          uploadWrapper.appendChild(fileInput);
          uploadWrapper.appendChild(deleteIcon);

          fileInfoText.style.color = "";
        }
      }
    });
  }

  const phoneInput = document.querySelector(".form-container__input--phone");
  if (phoneInput) {
    const maskOptions = {
      mask: "+{7}(000)000-00-00",
    };
    const mask = IMask(phoneInput, maskOptions);
  }

  const validator = new JustValidate(".form-container__form", {
    errorFieldCssClass: "form-container__input--error",
    errorLabelCssClass: "form-container__error-label",
    errorLabelStyle: {
      color: "#ff4d4f",
    },
    successFieldCssClass: "form-container__input--success",
    focusInvalidField: true,
    lockForm: true,
  });

  validator.addField('.form-container__input[name="name"]', [
    {
      rule: "required",
      errorMessage: "Введите имя",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа",
    },
  ]);

  validator.addField('.form-container__input[name="phone"]', [
    {
      rule: "required",
      errorMessage: "Введите телефон",
    },
    {
      validator: (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 10;
      },
      errorMessage: "Минимум 10 цифр",
    },
  ]);

  validator.addField('.form-container__input[name="email"]', [
    {
      rule: "required",
      errorMessage: "Введите email",
    },
    {
      rule: "email",
      errorMessage: "Введите email в формате: имя@домен.ру",
    },
  ]);

  validator.addField('.form-container__input[name="question"]', [
    {
      rule: "required",
      errorMessage: "Введите запрос",
    },
    {
      rule: "minLength",
      value: 10,
      errorMessage: "Минимум 10 символов",
    },
  ]);

  validator.addField("#checkbox1", [
    {
      rule: "required",
      errorMessage: "Необходимо согласие",
    },
  ]);

  validator.onSuccess((e) => {
    e.target.reset();

    const checkbox = document.getElementById("checkbox1");
    if (checkbox) {
      checkbox.checked = false;

      const label = document.querySelector(".form-container__checkbox__label");
      if (label) label.classList.remove("checked");
    }

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";

    if (phoneInput) {
      mask.updateValue("");
    }

    if (fileInput && fileInfoText && fileLabel && uploadWrapper) {
      resetFileInput();
    }

    openModal();
  });
});
