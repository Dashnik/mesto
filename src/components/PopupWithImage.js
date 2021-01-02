import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._popupImageBigImageElement = this._popupElement.querySelector(".popup__image");
    this._popupCaptionImageBigImageElement = this._popupElement.querySelector(".popup__caption");
  }

  open(imageLink, imageTitle) {
    /** вызываем родительский метод */
    super.open(); 

    /** дополним open новой функциональностью */
    this._popupImageBigImageElement.alt = imageTitle;
    this._popupImageBigImageElement.src = imageLink;
    this._popupCaptionImageBigImageElement.textContent = imageTitle;
  }
}
