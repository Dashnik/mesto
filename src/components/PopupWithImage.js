//const { default: Popup } = require("./Popup");
import Popup from '../components/Popup.js';
const valueFromName = document.querySelector(".popupImage__caption");
const valueFromLink = document.querySelector(".popupImage__bigImage");

export default class PopupWithImage extends Popup{

   open(imageLink,imageTitle){
      super.open(); //вызываем родительский метод
 
      //дополним open новой функциональностью
      valueFromLink.src = imageLink; 
      valueFromLink.alt = imageTitle; 
      valueFromName.textContent = imageTitle; 
   }
}