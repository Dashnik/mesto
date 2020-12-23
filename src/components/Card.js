//import PopupWithForm from "./PopupWithForm";

export class Card {
  constructor(cardSelector, card, handleCardClick, handleTrashClick) {
    this._selector = cardSelector;
    this._cardimage = card.link;
    this._cardTitle = card.name;
    this._cardLikes = card.likes;
    this._cardId = card._id;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _deleteCardHandler(event) {
    const cardChild = event.target.parentNode;
    cardChild.remove();
  }
  
  _likeCardHandler(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _setListeners() {
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", this._handleTrashClick);
     //.addEventListener("click", this._deleteCardHandler);  
    

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._cardimage, this._cardTitle);
      });
    this._element
      .querySelector(".card__like")
      .addEventListener("click", this._likeCardHandler);
  }

  getElement() {
    this._element = this._getTemplate();
    // const cardID = this._element.querySelector(".card_id");
    // cardID.textContent = this._cardId;
    const cardID = this._element.querySelector(".card");
    cardID.id = this._cardId;
 

    const cardImageElement = this._element.querySelector(".card__image");
    cardImageElement.src = this._cardimage;
    cardImageElement.alt = this._cardTitle;

    const counterLikesElement = this._element.querySelector(
      ".card__counter-like"
    );
    counterLikesElement.textContent = this._cardLikes.length;

    this._element.querySelector(".card__title").textContent = this._cardTitle;

 
    this._setListeners();
    return this._element;
  }
}
