import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
    
  setEventListeners(card) {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      //  this._handleFormSubmit(card.id);
      this._handleFormSubmit(card);
      // apiPraktikum.deleteCard(card.id);
      // card.remove();

      this.close();
    });  
  }
}