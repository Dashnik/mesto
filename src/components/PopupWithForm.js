//const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    // this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const nameNewPlaceInput = this._popupElement.querySelector(
      ".popup__item_input_name"
    ).value;
    const linkNewPlaceInput = this._popupElement.querySelector(
      ".popup__item_input_url"
    ).value;

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
    this._popupElement.reset();
  }
}
