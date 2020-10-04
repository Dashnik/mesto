// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, errorMessage);
  } else {
    // Если проходит, скроем

    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, buttonElement) =>{
    
    const hasInValidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    console.log(hasInValidInput);

    if(hasInValidInput){
        buttonElement.classList.add('popup__submit_inactive');
        buttonElement.setAttribute('disabled',true);
    }    
    else{
        buttonElement.classList.remove('popup__submit_inactive');
        buttonElement.removeAttribute('disabled',true);
    }
    }

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector('.popup__submit');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();
