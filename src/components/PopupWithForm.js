//const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";

const placeInputName = document.querySelector(".popup__item_input_name");
const placeInputLink = document.querySelector(".popup__item_input_url");


export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
   // this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // const popupTestForm = document.querySelector(this._popupElement);
    // const popupTestForm123 = document.querySelector(popupSelector);
    // const testInputs = popupTestForm.querySelectorAll(".popup__input");
    // //const testInpuutsTest = popupTestForm.querySelectorAll('.popup__input');
    // console.log(testInputs);
    //console.log(testInpuutsTest);
    console.log(this._popupElement);
    //console.log(this._popupElement.querySelector(".popup__input"));
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
    //handleFormSubmit(this._getInputValues);
  }

  close() {
    super.close();
    this._popupElement.reset();
   // console.log(this._popupElement);
    // placeInputName.value = '';
    // placeInputLink.value = '';
  }
}
