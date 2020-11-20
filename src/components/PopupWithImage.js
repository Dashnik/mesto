//const { default: Popup } = require("./Popup");
import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup{

   open(imageLink,imageTitle){
      super.open(); //вызываем родительский метод
 
      //дополним open новой функциональностью
     this._popupElement.querySelector(".popupImage__bigImage").alt = imageTitle;
     this._popupElement.querySelector(".popupImage__bigImage").src = imageLink;
     this._popupElement.querySelector(".popupImage__caption").textContent = imageTitle;
   }
}