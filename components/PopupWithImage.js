//const { default: Popup } = require("./Popup");
import Popup from '../components/Popup.js';

const valueFromName = document.querySelector(".popupImage__caption");
const valueFromLink = document.querySelector(".popupImage__bigImage");

export default class PopupWithImage extends Popup{

open(){
  
   const dataFromCard = this.event.target;
   valueFromLink.src = dataFromCard.src;
   valueFromLink.alt = dataFromCard.alt;
   valueFromName.textContent = dataFromCard.alt;
   super.open();
}
}