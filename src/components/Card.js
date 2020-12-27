export class Card {
  constructor(
    cardSelector,
    card,
    handleCardClick,
    handleTrashClick,
    handleLikeClick
  ) {
    this._selector = cardSelector;
    this._cardimage = card.link;
    this._cardTitle = card.name;
    this._cardLikes = card.likes;
    this._cardId = card._id;
    this._ownerId = card.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
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

    // this._element
    //   .querySelector(".card__like")
    //   .addEventListener("click", this._likeCardHandler);

    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like_active");
        const likesContainer = evt.target.parentNode;
        const countLikes = likesContainer.querySelector('.card__counter-like');
        this._handleLikeClick(this._cardId,countLikes);
      });
  }

  getElement() {
    this._element = this._getTemplate();
    const myID = "2911d40eec43f0326fe3701b";
    const cardID = this._element.querySelector(".card");
    cardID.id = this._cardId;
    const cardImageElement = this._element.querySelector(".card__image");
    const counterLikesElement = this._element.querySelector(
      ".card__counter-like"
    );
    const cardTrashIcon = this._element.querySelector(".card__trash");

    cardImageElement.src = this._cardimage;
    cardImageElement.alt = this._cardTitle;
    counterLikesElement.textContent = this._cardLikes.length;
    this._element.querySelector(".card__title").textContent = this._cardTitle;
    if (this._ownerId !== myID) {
    
      cardTrashIcon.src = "";
      cardTrashIcon.alt = "";
    }

    this._setListeners();
    return this._element;
  }
}
