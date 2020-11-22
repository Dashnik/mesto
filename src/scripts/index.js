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
const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");

const addingInactiveClassForSubmit = document.querySelector('.popup_cards__submit');


overlay.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    profilePopUp.close();
    addingNewCards.close();
    imagePopup.close();
  }
});

function clearProfileErrors(){
  const popupInput = document.querySelectorAll('.popup__input_type_error')
  const popupSubmit = document.querySelector('.popup__submit ');
  const popupInputError = document.querySelectorAll('.popup__input-error');
  if (popupInput.length !== 0 ){
    popupInput.forEach((item) => {
      item.classList.remove('popup__input_type_error');
    })
 popupSubmit.classList.remove('popup__submit_inactive');
 if (popupInputError.length !== 0){
  popupInputError.forEach((item) => {
    item.classList.remove('popup__input-error_active');
  })
 }
}
}

const userInfo = new UserInfo(textProfileName,profileDescription);

const profilePopUp = new PopupWithForm(popupEditProfileSelector);

popupOpenProfileButton.addEventListener("click", function () {
  
  profilePopUp.open();
  clearProfileErrors();
  const profileDataFromPage = userInfo.getUserInfo();
  profileNameInput.value = profileDataFromPage.userName; 
  profileJobInput.value = profileDataFromPage.userDescription; 
  
});

profilePopUp.setEventListeners();

popup.addEventListener("submit", function(){

  userInfo.setUserInfo(profileNameInput, profileJobInput);
  profilePopUp.close();
});

const addingNewCards = new PopupWithForm(popupCardsSelector);
popupCardsOpenButton.addEventListener("click", function () { 
  addingNewCards.open();
  addingInactiveClassForSubmit.classList.add('popup__submit_inactive');
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