// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement,inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    console.log(errorElement);
//   element.classList.add('form__input_type_error');
    errorMessage.textContent = errorMessage;
//   popupError.classList.add('form__input-error_active');
}


// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement,inputElement) => {
//   element.classList.remove('form__input_type_error');
//   popupError.classList.remove('form__input-error_active');
//   popupError.textContent = errorMessage;
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement,inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement,inputElement, errorMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement,inputElement);}
  
};

const setEventListeners = (formElement)=>{
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));

    inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input', ()=>{
          
            checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = () =>{
    const formList = Array.from(document.querySelectorAll('.popup'));

formList.forEach((formElement) =>{
    formElement.addEventListener('submit', (event)=>{
        event.preventDefault();
    });
    setEventListeners(formElement);
});
};
enableValidation();