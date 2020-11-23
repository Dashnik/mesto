import Popup from "./Popup.js";
//import {handleFormSubmit} from '../scripts/index.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
  
  }

  _getInputValues() {
    const formValue = {};
    const valuesFromInputs = this._popupElement.querySelectorAll(
      ".popup__input"
    );
    valuesFromInputs.forEach(element => {
      formValue[element.name] = element.value;
    }); 
    return formValue;
  }

  setEventListeners() {
    super.setEventListeners();

   
  }

  close() {
    super.close();
    this._popupElement.reset();
  }
}
