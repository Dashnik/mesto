const valueFromName = document.querySelector(".popupImage__caption");
const valueFromLink = document.querySelector(".popupImage__bigImage");
const popupImage = document.querySelector(".popup_image");

const initialCards = [
  {
    name: "Одесса",
    link:
      "https://images.unsplash.com/photo-1600352761482-96c43e9088ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Лондон",
    link:
      "https://images.unsplash.com/photo-1600362189809-aad4924fbd6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Израиль",
    link:
      "https://images.unsplash.com/photo-1600356381284-f331cdd4a9c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Горы в Италии",
    link:
      "https://images.unsplash.com/photo-1600352751860-f4ba11b3f170?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Норвегия",
    link:
      "https://images.unsplash.com/photo-1600256698643-1d9345bfd9ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Калифорния",
    link:
      "https://images.unsplash.com/photo-1600230825276-1d770a31f29c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
];

class Card {
  constructor(selector, cardimage, cardTitle) {
    this._selector = selector;
    this._cardimage = cardimage;
    this._cardTitle = cardTitle;
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
    openPopup(popupImage);
  }
  
  _like(evt){
    evt.target.classList.toggle("card__like_active");
  }

  _setListeners() {
    this._element.querySelector(".card__trash").addEventListener("click", this._deleteHandler) ;
    this._element.querySelector(".card__image").addEventListener("click", this._handleImageIncrease) ;
    this._element.querySelector(".card__like").addEventListener("click",this._like);
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

initialCards.forEach((card) => {
  const cardElement = new Card(".card-template", card.link, card.name);
  const element = cardElement.getElement();

  parentCards.append(element);
});
