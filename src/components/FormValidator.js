export class FormValidator {
  constructor(formSelector, object) {
    this._formElement = document.querySelector(formSelector);
    this._object = object;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._errorClass = object.errorClass;
    this._inputErrorClass = object.inputErrorClass;
    this._formProfileInputsSelector = object.formProfileInputsSelector;
    this._formProfileInputsErrorsSelector = object.formProfileInputsErrorsSelector;
  }
  
  /**  Функция, которая добавляет класс с ошибкой */
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._object.errorClass);

    inputElement.classList.add(this._object.inputErrorClass);
  }

  /**  Функция, которая удаляет класс с ошибкой */
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = "";
    errorElement.classList.remove(this._object.errorClass);

    inputElement.classList.remove(this._object.inputErrorClass);
  }

  _getErrorMessage(inputElement) {
    return inputElement.validationMessage;
  }

  /** Функция, которая проверяет валидность поля */
  _checkInputValidity(formElement, inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(inputElement);
      /**  Если поле не проходит валидацию, покажем ошибку */
      this._showInputError(formElement, inputElement, errorMessage);
    } else {
      /**  Если проходит, скроем */
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

  clearProfileErrors() {
    const popupInput = document.querySelectorAll(this._formProfileInputsSelector);
    const popupSubmit = document.querySelector(this._submitButtonSelector);
    const popupInputError = document.querySelectorAll(this._formProfileInputsErrorsSelector);
    if (popupInput.length !== 0) {
      popupInput.forEach((item) => {
        item.classList.remove(this._inputErrorClass);
      });
      popupSubmit.classList.remove(this._inactiveButtonClass);
      if (popupInputError.length !== 0) {
        popupInputError.forEach((item) => {
          item.classList.remove(this._errorClass);
        });
      }
    }
  }

}