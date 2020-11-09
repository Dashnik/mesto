const overlay = document.querySelector(".overlay");


export default class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    overlay.classList.add("overlay_visible");
    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", this.setEventListeners);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    overlay.classList.remove("overlay_visible");
    document.removeEventListener("keyup", this._handleEscClose);
    document.removeEventListener("click", this.setEventListeners);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(event) { 

    if (event.target.classList.contains("popup__close")) {
      this.close();
    } 
 
  }
}