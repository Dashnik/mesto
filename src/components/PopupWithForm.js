//const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";
//import {handleFormSubmit} from '../scripts/index.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
  
  }

  _getInputValues() {
    const arr = [];
    const valuesFromInputs = this._popupElement.querySelectorAll(
      ".popup__input"
    );
    valuesFromInputs.forEach((element) => {
      arr.push(element.value);
    });
    
    const nameNewPlaceInput = arr[0];
    const linkNewPlaceInput = arr[1];

    const inputValues = {
      name: nameNewPlaceInput,
      link: linkNewPlaceInput,
    };
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

   
  }

  close() {
    super.close();
    this._popupElement.reset();
  }
}
