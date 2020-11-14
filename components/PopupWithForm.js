//const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
  //   const nameNewPlaceInput = placeInputName.value;
  //   const linkNewPlaceInput = placeInputLink.value;

  //   const addingValueToArray = {
  //     name: nameNewPlaceInput,
  //     link: linkNewPlaceInput,
  //   };
    
  // const newPlace = new Card(".card-template", addingValueToArray.link,  addingValueToArray.name);
  // const newElement = newPlace.getElement();
  // addCardReverse(parentCards, newElement);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._getInputValues);
  }

  close() {
    super.close();

  }
}
