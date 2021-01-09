export class Card {
  constructor(
    cardSelector,
    card,
    handleCardClick,
    handleTrashClick,
    apiPraktikum,
    userId
  ) {
    this._selector = cardSelector;
    this._cardimage = card.link;
    this._cardTitle = card.name;
    this._cardLikes = card.likes;
    this._cardId = card._id;
    this._ownerId = card.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._apiPraktikum = apiPraktikum;
    this._userId = userId;

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
      .addEventListener("click", (event) => {
        const cardChild = event.target.parentNode;
        this._handleTrashClick(cardChild);
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._cardimage, this._cardTitle);
      });

    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like_active");
        const likesContainer = evt.target.parentNode;
        
       const isItNull =  likesContainer.querySelector('.card__like_active');
     
        const countLikes = likesContainer.querySelector('.card__counter-like');
       this._handleCountLikes(this._cardId,countLikes,isItNull);
      });
  }

  _toggleCounterLikes(counterLikesElement,countLikesFromServer){
    counterLikesElement.textContent = countLikesFromServer.likes.length;
  }

  _handleCountLikes(cardID, counterLikesElement, isLiked){
    if (isLiked == null) {
      const promiseDeleteLikes = this._apiPraktikum .deleteLike(cardID);
      promiseDeleteLikes
      .then((countLikesFromServer) => {
        this._toggleCounterLikes(counterLikesElement,countLikesFromServer);
      })
      .catch((error)=>{
        console.log(error);
      })
    } else {
      const promiseLikes = this._apiPraktikum .putLike(cardID);
      promiseLikes
      .then((countLikesFromServer) => {
        this._toggleCounterLikes(counterLikesElement,countLikesFromServer);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  _hideTrashIcon(_ownerId,_userId){
    const cardTrashIcon = this._element.querySelector(".card__trash");
    
    if (this._ownerId !== this._userId) {
      cardTrashIcon.src = "";
      cardTrashIcon.alt = "";
    }
  }

  getElement() {
    this._element = this._getTemplate();
    const cardID = this._element.querySelector(".card");
    cardID.id = this._cardId;
    const cardImageElement = this._element.querySelector(".card__image");
    const counterLikesElement = this._element.querySelector(
      ".card__counter-like"
    );
    //const cardTrashIcon = this._element.querySelector(".card__trash");

    cardImageElement.src = this._cardimage;
    cardImageElement.alt = this._cardTitle;
    counterLikesElement.textContent = this._cardLikes.length;
    this._element.querySelector(".card__title").textContent = this._cardTitle;
    // if (this._ownerId !== this._userId) {
    //     cardTrashIcon.src = "";
    //     cardTrashIcon.alt = "";
    //   }
    this._hideTrashIcon(this._ownerId,this._userId);
    
    this._setListeners();
    return this._element;
  }
}
