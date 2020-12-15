import Popup from "./Popup.js";

export default class ApproveForm extends Popup {
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

  
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      console.log(this._popupElement);
     // this._handleFormSubmit(this._removeCard);
      this.close();
    })
   
  }
  
}
