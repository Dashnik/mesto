import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
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

  _deleteCard(){
    //пойми какую карточку нужно удалить
    
    //удали её
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      _deleteCard();
     // this._handleFormSubmit(this._removeCard);
      this.close();
    });  
  }
  
}