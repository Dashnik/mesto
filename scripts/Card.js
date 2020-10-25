const valueFromName = document.querySelector(".popupImage__caption");
const valueFromLink = document.querySelector(".popupImage__bigImage");
const popupImage = document.querySelector(".popup_image");
export const parentCards = document.querySelector(".elements");
const overlay = document.querySelector(".overlay");
const popupOpenButton = document.querySelector(".profile__name-edit");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popup = document.querySelector(".popup");
const nameInput = document.querySelector(".popup__item_profile_name"); 
const jobInput = document.querySelector(".popup__item_profile_job"); 
const popupCardsOpenButton = document.querySelector(".profile__vector");
const popupCards = document.querySelector(".popup_cards");
const placeInputName = document.querySelector(".popup__item_input_name");
const placeInputLink = document.querySelector(".popup__item_input_url");
const popupAll = document.querySelectorAll(".popup");


function closePopup(popup) {
  popup.classList.remove("popup_opened");
  overlay.classList.remove("overlay_visible");
  document.removeEventListener("keyup", toggleEsc);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  overlay.classList.add("overlay_visible");
  document.addEventListener("keyup", toggleEsc);
}

function toggleEsc(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

const addCardReverse = (container, cardElement) => {
  container.prepend(cardElement);
};

function fillProfile() {
  const name = textProfileName.textContent;
  document
    .querySelector(".popup__item_profile_name")
    .setAttribute("value", name);

  const description = profileDescription.textContent;
  document
    .querySelector(".popup__item_profile_job")
    .setAttribute("value", description);
}


popupAll.forEach(function (item) {
  item.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__close")) {
      closePopup(item);
    }
  });
});


popupCardsOpenButton.addEventListener("click", function (event) {
  openPopup(popupCards);
});

overlay.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
});

popupOpenButton.addEventListener("click", function (event) {
  fillProfile();
  openPopup(popup);
});

export class Card {
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

  _like(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  _createNewPlace(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const nameNewPlaceInput = placeInputName.value;

    const linkNewPlaceInput = placeInputLink.value;

    const addingValueToArray = {
      name: nameNewPlaceInput,
      link: linkNewPlaceInput,
    };

    const newPlace = new Card(
      ".card-template",
      addingValueToArray.link,
      addingValueToArray.name
    );
    const newElement = newPlace.getElement();

    closePopup(popupCards);
    addCardReverse(parentCards, newElement);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Находим поля формы в DOM
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    textProfileName.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;

    closePopup(popup);
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
    popupCards.addEventListener("submit", this._createNewPlace);
    popup.addEventListener("submit", this._formSubmitHandler);
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
