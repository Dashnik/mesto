//const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    // this._handleFormSubmit = handleFormSubmit;
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
