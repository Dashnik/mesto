// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorClass);
  inputElement.classList.add(params.inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(params.errorClass);
  inputElement.classList.remove(params.inputErrorClass);
  
};

const getErrorMessage = (inputElement) =>{

    return inputElement.validationMessage;
}

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement);
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, errorMessage);
  } else {
    // Если проходит, скроем

    hideInputError(formElement, inputElement);
  }
};

  const toggleButtonState = (inputList, buttonElement) => {
    const hasInValidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
   
    if (hasInValidInput) {
      buttonElement.classList.add(params.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(params.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", true);
    }
  };



const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);


  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  //toggleButtonState(inputList, buttonElement);
};


const enableValidation = (params) => {
 
const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });

};

enableValidation(params = {
    formSelector:'.popup',
    inputSelector: ".popup__input",
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    errorClass: "popup__input-error_active",
    inputErrorClass: 'popup__input_type_error'
});
