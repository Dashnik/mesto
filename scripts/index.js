import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__name-edit");
//const popupAll = document.querySelectorAll(".popup");
const overlay = document.querySelector(".overlay");
const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const parentCards = document.querySelector(".elements");
const popupImage = document.querySelector(".popup_image");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector(".popup__item_profile_name"); 
const profileJobInput = document.querySelector(".popup__item_profile_job"); 
const placeInputName = document.querySelector(".popup__item_input_name");
const placeInputLink = document.querySelector(".popup__item_input_url");


function closePopup(popup) {
  popup.classList.remove("popup_opened");
  overlay.classList.remove("overlay_visible");
 // document.removeEventListener("keyup", toggleEsc);

}

// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   overlay.classList.add("overlay_visible");
//   document.addEventListener("keyup", toggleEsc);
// }

// function toggleEsc(event) {
//   if (event.key === "Escape") {
//     const popup = document.querySelector(".popup_opened");
//     closePopup(popup);
//   }
// }

export function fillProfile() {
  const name = textProfileName.textContent;
  profileNameInput.value = name;

  const description = profileDescription.textContent;
  profileJobInput.value = description;
 
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Находим поля формы в DOM
  const nameInputValue = profileNameInput.value; 
  const jobInputValue = profileJobInput.value; 

  textProfileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  closePopup(popup);
}

/////Добавление картинки в дефолтный массив
function createNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameNewPlaceInput = placeInputName.value;
  const linkNewPlaceInput = placeInputLink.value;

  //Добавление инпута Названия и Ссылки в дефолтный массив
  const addingValueToArray = {
    name: nameNewPlaceInput,
    link: linkNewPlaceInput,
  };

  const newPlace = new Card(".card-template", addingValueToArray.link,  addingValueToArray.name);
  const newElement = newPlace.getElement();

  closePopup(popupCards);

  addCardReverse(parentCards, newElement);

}


overlay.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
});


// popupAll.forEach(function (item) {
//   item.addEventListener("click", function (event) {
//     if (event.target.classList.contains("popup__close")) {
//      const closePopups = new Popup(item);
//      closePopups.close();
//     }
//   });
// });

// const popup1 = document.querySelector(".popup");

const profilePopUp = new Popup(popup);

popupOpenButton.addEventListener("click", function () {
  profilePopUp.open();
  fillProfile(); 

});
profilePopUp.setEventListeners();

const addingNewCards = new Popup(popupCards);
popupCardsOpenButton.addEventListener("click", function () {
  // const addingNewCards = new Popup(popupCards);
  addingNewCards.open();
});
addingNewCards.setEventListeners();

const addCardReverse = (container, cardElement) => {
  container.prepend(cardElement);
};

popup.addEventListener("submit", handleFormProfileSubmit);
popupCards.addEventListener("submit", createNewPlace);

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


const object = ({
  formSelector: '.popup',
  formSelectorCard: '.popup_cards',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_type_error'
});

const formPopup = new FormValidator(object.formSelector, object);
formPopup.enableValidation(); //надо ли?

const formCardPopup = new FormValidator(object.formSelectorCard, object);
formCardPopup.enableValidation();


const imagePopup =  new PopupWithImage (popupImage);
imagePopup.setEventListeners();

function handleCardClick(link,name){
  imagePopup.open(link,name);
}

const cardsList = new Section({
  items:initialCards,
  renderer: (card) => {
    const cardElement = new Card(".card-template",card,handleCardClick);

    const element = cardElement.getElement();

    cardsList.addItem(element);
  },
 },parentCards);



cardsList.renderItem();

