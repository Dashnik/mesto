import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, overlay, handleFormWithDeleteSubmit) {
    super(popupSelector,overlay);
    this.handleFormWithDeleteSubmit = handleFormWithDeleteSubmit;
  }
    
  setEventListeners(card) {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this.handleFormWithDeleteSubmit(card);
    });  
  }
}