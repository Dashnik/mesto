export class Card {
  constructor(cardSelector, card, handleCardClick) {
    this._selector = cardSelector;
    this._cardimage = card.link;
    this._cardTitle = card.name;
    this._handleCardClick = handleCardClick;
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
      .addEventListener("click", this._deleteCardHandler);

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
    const cardImageElement = this._element.querySelector(".card__image");
    cardImageElement.src = this._cardimage;
    cardImageElement.alt = this._cardTitle;

    //  this._element.querySelector(".card__image").src = this._cardimage;
    // this._element.querySelector(".card__image").alt = this._cardTitle;
   
    this._element.querySelector(".card__title").textContent = this._cardTitle;
    this._setListeners();
    return this._element;
  }
}
