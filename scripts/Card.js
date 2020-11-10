import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
const valueFromName = document.querySelector(".popupImage__caption");
const valueFromLink = document.querySelector(".popupImage__bigImage");
const popupImage = document.querySelector(".popup_image");

  export class Card {
    constructor(selector, card) {
      this._selector = selector;
      this._cardimage = card.link;
      this._cardTitle = card.name;
    }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _deleteHandler(event) {
    const cardChild = event.target.parentNode;
    cardChild.remove();
  }

  _handleImageIncrease(event) {
    const dataFromCard = event.target;
    valueFromLink.src = dataFromCard.src;
    valueFromLink.alt = dataFromCard.alt;
    valueFromName.textContent = dataFromCard.alt;
   
    // valueFromLink.src = this._cardimage;
    // valueFromLink.alt = this._cardTitle;
    // valueFromName.textContent = this._cardTitle;
////openPopup(popupImage);
    const increaseImage =  new Popup (popupImage);
    increaseImage.open();
  }

  _like(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _setListeners() {
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", this._deleteHandler);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleImageIncrease);
    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._like);
  }

  getElement() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._cardimage;
    this._element.querySelector(".card__image").alt = this._cardTitle;
    this._element.querySelector(".card__title").textContent = this._cardTitle;
    this._setListeners();
    return this._element;
  }
}
