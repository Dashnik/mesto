//import {overlay} from '../scripts/constants.js';

export default class Popup {
  constructor(popupSelector,overlay) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this._overlay = document.querySelector(overlay);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this._overlay.classList.add("overlay_visible");
     document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._overlay.classList.remove("overlay_visible");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(event) {
    event.preventDefault();
    if (event.key === "Escape") {
      this.close();
    }
  } 

  setEventListeners() { 
    this._popupElement.addEventListener("click", (event) =>{
      if (event.target.classList.contains("popup__close")) {
   
         this.close();
     }  
    } );
    this._overlay.addEventListener("click", (event) => { 
      if (event.target === event.currentTarget) { 
        this.close();
      } 
    }); 
  }
}