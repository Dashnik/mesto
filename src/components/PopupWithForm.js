import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,overlay,handleFormSubmit) {
    super(popupSelector,overlay);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
   
    const valuesFromInputs = this._popupElement.querySelectorAll(
      ".popup__input"
    );

    valuesFromInputs.forEach(element => {
      inputValues[element.name] = element.value;      
    }); 
    return inputValues;
  } 

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
   this._popupElement.reset();   
  }

  renderLoading(isLoading){
    const submitButton = this._popupElement.querySelector('.popup__submit');
      if (isLoading){
        submitButton.innerHTML = 'Сохранение...';
      } else {
        submitButton.innerHTML = 'Сохранить';
      }   
   };

}