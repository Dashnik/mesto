// const overlay = document.querySelector(".overlay");
import {overlay} from '../scripts/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    overlay.classList.add("overlay_visible");
     document.addEventListener("keyup", this._handleEscClose);
    // document.addEventListener("keyup", this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    overlay.classList.remove("overlay_visible");
    document.removeEventListener("keyup", this._handleEscClose);
    //document.removeEventListener("keyup", this._handleEscClose.bind(this));

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
    overlay.addEventListener("click", (event) => { 
      if (event.target === event.currentTarget) { 
        this.close();
      } 
    }); 
  }
}