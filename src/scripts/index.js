import '../pages/style.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
//import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from './Defaults-cards.js';
import {validationConfig} from './constants.js';
import {overlay} from './constants.js';

const popup = document.querySelector(".popup");
const popupOpenProfileButton = document.querySelector(".profile__name-edit");
//const overlay = document.querySelector(".overlay");
const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const cardsContainer = document.querySelector(".elements");
//const popupImage = document.querySelector(".popup_image");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = ".card-template";
//const popupEditProfile = document.querySelector('.popup_editUserProfile');
const popupEditProfileSelector = '.popup_editUserProfile';
const popupCardsSelector = ".popup_cards";
const popupImageSelector = ".popup_image";


overlay.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    profilePopUp.close();
    addingNewCards.close();
    imagePopup.close();
  }
});

const userInfo = new UserInfo(textProfileName,profileDescription);

const profilePopUp = new PopupWithForm(popupEditProfileSelector);

popupOpenProfileButton.addEventListener("click", function () {
  profilePopUp.open();
  userInfo.getUserInfo();
});
profilePopUp.setEventListeners();

popup.addEventListener("submit", function(){
  userInfo.setUserInfo();
  profilePopUp.close();
});

const addingNewCards = new PopupWithForm(popupCardsSelector);
popupCardsOpenButton.addEventListener("click", function () { 
  addingNewCards.open();
});
addingNewCards.setEventListeners();

// function handleFormSubmit(){
//   addingNewCards.addEventListener('submit',this._getInputValues);
// }

popupCards.addEventListener('submit', ()=>{
  const objectNewCards = addingNewCards._getInputValues();
  const newPlace = new Card(cardTemplate, objectNewCards,handleCardClick);
    const newElement = newPlace.getElement();
  
    cardsContainer.prepend(newElement);
    const addingInactiveClassForSubmit = document.querySelector('.popup_cards__submit');
    addingInactiveClassForSubmit.classList.add('popup__submit_inactive');
    addingNewCards.close();
}
);

const editUserProfileValidator = new FormValidator(validationConfig.formSelector, validationConfig);
editUserProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig.formSelectorCard, validationConfig);
addCardValidator.enableValidation();

const imagePopup =  new PopupWithImage (popupImageSelector);
imagePopup.setEventListeners();

function handleCardClick(link,name){
  imagePopup.open(link,name);
}

const cardsList = new Section({
  items:initialCards,
  renderer: (card) => {
     const cardElement = new Card(cardTemplate,card,handleCardClick);

    const element = cardElement.getElement();

    cardsList.addItem(element);
  },
 },cardsContainer);

cardsList.renderItems();