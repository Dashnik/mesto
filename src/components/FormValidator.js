export class FormValidator {
  constructor(formSelector, object) {
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector);
    this._object = object; 
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._errorClass = object.errorClass;
    this._inputErrorClass = object.inputErrorClass;
  }
  // Функция, которая добавляет класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.errorClass);

    inputElement.classList.add(this._object.inputErrorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(this._object.errorClass);

    inputElement.classList.remove(this._object.inputErrorClass);
  }

  _getErrorMessage(inputElement) {
    return inputElement.validationMessage;
  }

  // Функция, которая проверяет валидность поля
  _checkInputValidity(formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(inputElement);
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formElement, inputElement, errorMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInValidInput(inputList) {
    const valid = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    return valid;
  }

  _toggleButtonState(buttonElement, invalid) {
    if (invalid) {
      buttonElement.classList.add(this._object.inactiveButtonClass);

      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._object.inactiveButtonClass);

      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._object.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this._object.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        const invalid = this._hasInValidInput(inputList);
        this._toggleButtonState(buttonElement, invalid);
      });
    });
  }

  enableValidation() {
   this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners(this._formElement, this._object);
  }
}



// // Функция, которая добавляет класс с ошибкой
//   const showInputError = (formElement, inputElement, errorMessage,object) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

//   errorElement.textContent = errorMessage;
//    errorElement.classList.add(object.errorClass);

//    inputElement.classList.add(object.inputErrorClass);

// };

// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (formElement, inputElement,object) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

//   errorElement.textContent = "";
//    errorElement.classList.remove(object.errorClass);

//    inputElement.classList.remove(object.inputErrorClass);

// };

// const getErrorMessage = (inputElement) => {
//   return inputElement.validationMessage;
// };

// // Функция, которая проверяет валидность поля
// const checkInputValidity = (formElement, inputElement,object) => {
//   const isInputNotValid = !inputElement.validity.valid;

//   if (isInputNotValid) {
//     const errorMessage = getErrorMessage(inputElement);
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(formElement, inputElement, errorMessage,object);
//   } else {
//     // Если проходит, скроем
//     hideInputError(formElement, inputElement,object);
//   }
// };

// function hasInValidInput(inputList){ 
//   const valid = inputList.some(
//   (inputElement) => !inputElement.validity.valid
// );
// return valid;
// }

// const toggleButtonState = (buttonElement,object,invalid) => {
//     if (invalid) {
//     buttonElement.classList.add(object.inactiveButtonClass);
 
//     buttonElement.setAttribute("disabled", true);
//   } else {
//     buttonElement.classList.remove(object.inactiveButtonClass);
 
    
//     buttonElement.removeAttribute("disabled");
//   }
// };

// const setEventListeners = (formElement,object) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(object.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(object.submitButtonSelector);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement,object);
//      const invalid = hasInValidInput(inputList);
//       toggleButtonState(buttonElement,object,invalid);
//     });
//   });
// };


// const enableValidation = (object) => {
//   const formList = Array.from(document.querySelectorAll(object.formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (event) => {
//       event.preventDefault();
//     });
//     setEventListeners(formElement,object);
//   });
// };

// enableValidation({
//   formSelector: '.popup',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit',
//   inactiveButtonClass: 'popup__submit_inactive',
//   errorClass: 'popup__input-error_active',
//   inputErrorClass: 'popup__input_type_error'
// });
