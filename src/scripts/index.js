import '../pages/style.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from './Defaults-cards.js';
import {validationConfig} from './constants.js';

//const popup = document.querySelector(".popup");
const popupOpenProfileButton = document.querySelector(".profile__name-edit");
//const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const cardsContainer = document.querySelector(".elements");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = ".card-template";
const popupEditProfileSelector = '.popup_edit-user-profile';
const popupEditProfileElement = document.querySelector('.popup_edit-user-profile');
const popupCardsSelector = ".popup_cards";
const popupImageSelector = ".popup_image";
const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");

const addingInactiveClassForSubmit = document.querySelector('.popup_cards__submit');

const userInfo = new UserInfo(textProfileName,profileDescription);

const profilePopUp = new PopupWithForm(popupEditProfileSelector);

popupOpenProfileButton.addEventListener("click", function () {
  
  profilePopUp.open();
  // clearProfileErrors();
  editUserProfileValidator.clearProfileErrors();
  const profileDataFromPage = userInfo.getUserInfo();
  profileNameInput.value = profileDataFromPage.userName; 
  profileJobInput.value = profileDataFromPage.userDescription; 
  
});

profilePopUp.setEventListeners();

popupEditProfileElement.addEventListener("submit", function(){

  userInfo.setUserInfo(profileNameInput, profileJobInput);
  profilePopUp.close();
});

const addingCardPopup = new PopupWithForm(popupCardsSelector,handleFormSubmit); //переменные следует называть существительными

popupCardsOpenButton.addEventListener("click", function () { 
  addingCardPopup.open();
  addingInactiveClassForSubmit.classList.add(validationConfig.inactiveButtonClass);
});
addingCardPopup.setEventListeners();

function handleFormSubmit(objectNewCards) {
  // const newPlace = new Card(cardTemplate, objectNewCards, handleCardClick);
  // const newElement = newPlace.getElement();
  const newElement = createCard(objectNewCards)

  cardsContainer.prepend(newElement);
  addingInactiveClassForSubmit.classList.add(validationConfig.inactiveButtonClass);
}

function createCard(card){
  const cardElement = new Card(cardTemplate,card,handleCardClick);

  const element = cardElement.getElement();
  return element;
}

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
    //  const cardElement = new Card(cardTemplate,card,handleCardClick);
    // const element = cardElement.getElement();
    const element = createCard(card)

    cardsList.addItem(element);
  },
 },cardsContainer);

cardsList.renderItems();