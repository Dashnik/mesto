import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  open(imageLink, imageTitle) {
    super.open(); //вызываем родительский метод

    const popupImageBigImageElement = this._popupElement.querySelector(
      ".popupImage__bigImage"
    );

    //дополним open новой функциональностью
    popupImageBigImageElement.alt = imageTitle;
    popupImageBigImageElement.src = imageLink;

    //   this._popupElement.querySelector(".popupImage__bigImage").alt = imageTitle;
    //   this._popupElement.querySelector(".popupImage__bigImage").src = imageLink;

    this._popupElement.querySelector(
      ".popupImage__caption"
    ).textContent = imageTitle;
  }
}
