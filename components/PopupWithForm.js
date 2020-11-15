//const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";
import {Card} from '../scripts/Card.js';


const parentCards = document.querySelector(".elements");
const placeInputName = document.querySelector(".popup__item_input_name");
const placeInputLink = document.querySelector(".popup__item_input_url");
const overlay = document.querySelector(".overlay");
const popupCards = document.querySelector(".popup_cards");

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

 
  _getInputValues() {
    const nameNewPlaceInput = placeInputName.value;
    const linkNewPlaceInput = placeInputLink.value;

    const addingValueToArray = {
      name: nameNewPlaceInput,
      link: linkNewPlaceInput,
    };
      return addingValueToArray;

  }
  

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._getInputValues);
  }

  close() {
    super.close();
    placeInputName.value = '';
    placeInputLink.value = '';
  }
}
