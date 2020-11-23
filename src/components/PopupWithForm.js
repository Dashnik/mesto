import Popup from "./Popup.js";
//import {handleFormSubmit} from '../scripts/index.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit
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
    this._popupElement.addEventListener('submit',() => {
      this.handleFormSubmit(this._getInputValues());
    })
   
  }

  close() {
    super.close();
    this._popupElement.reset();
  }
}
