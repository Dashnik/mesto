import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const emptyLike = '';
    const inputValues = {};
    const emptyId = '';

    const ownerID = {
      _id: "2911d40eec43f0326fe3701b"
    }

    const valuesFromInputs = this._popupElement.querySelectorAll(
      ".popup__input"
    );

    valuesFromInputs.forEach(element => {
      inputValues[element.name] = element.value;      
    }); 
    inputValues.likes = emptyLike;
    inputValues.owner = ownerID;
    return inputValues;
  }
  
  renderLoading(isLoading){
    const submitButton = this._popupElement.querySelector('.popup__submit');
      if (isLoading){
        submitButton.innerHTML = 'Сохранение...';
      } else {
        submitButton.innerHTML = 'Сохранить';
      }   
    };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this.renderLoading(false);
    })
   
  }

  close() {
    super.close();
     //this._popupElement.reset();   
  }

}