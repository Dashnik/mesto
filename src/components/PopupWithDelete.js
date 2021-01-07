import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, overlay, handleFormWithDeleteSubmit) {
    super(popupSelector,overlay);
    this._handleFormWithDeleteSubmit = handleFormWithDeleteSubmit;
  }
    
  setEventListeners(card) {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleFormWithDeleteSubmit(card);
    });  
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._popupElement.addEventListener('submit',(evt) => {
  //     evt.preventDefault();
  //     this._handleFormWithDeleteSubmit(card);
  //   });  
  // }
}