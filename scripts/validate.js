// Функция, которая добавляет класс с ошибкой
  const showInputError = (formElement, inputElement, errorMessage,object) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
   errorElement.classList.add(object.errorClass);

   inputElement.classList.add(object.inputErrorClass);

};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement,object) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
   errorElement.classList.remove(object.errorClass);

   inputElement.classList.remove(object.inputErrorClass);

};

const getErrorMessage = (inputElement) => {
  return inputElement.validationMessage;
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement,object) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement);
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, errorMessage,object);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement,object);
  }
};


const toggleButtonState = (inputList, buttonElement,object) => {
  const hasInValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  
  if (hasInValidInput) {
    buttonElement.classList.add(object.inactiveButtonClass);
 
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
 
    buttonElement.removeAttribute("disabled", true);
  }
};

const setEventListeners = (formElement,object) => {
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector)
  );
  const buttonElement = formElement.querySelector(object.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement,object);
      toggleButtonState(inputList, buttonElement,object);
    });
  });
};


const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement,object);
  });
};

enableValidation({
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_type_error'
});


///все комментариии будут почищены после того как работа будет принята, они мне нужны!