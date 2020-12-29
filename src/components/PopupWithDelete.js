import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
    
  setEventListeners(card,apiPraktikum) {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      apiPraktikum.deleteCard(card.id);
      card.remove();
      this.close();
    });  
  }
}