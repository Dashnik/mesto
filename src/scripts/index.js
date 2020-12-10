import '../pages/style.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from './Defaults-cards.js';
import {validationConfig} from './constants.js';
import Api from '../components/Api.js';

const popupOpenProfileButton = document.querySelector(".profile__name-edit");
//const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const cardsContainer = document.querySelector(".elements");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = ".card-template";
const popupEditProfileSelector = '.popup_edit-user-profile';
//const popupEditProfileElement = document.querySelector('.popup_edit-user-profile');
const popupCardsSelector = ".popup_cards";
const popupImageSelector = ".popup_image";
const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");
const addingInactiveClassForSubmit = document.querySelector('.popup_cards__submit');

 const apiProfile = new Api({
   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17/users/me",
   headers: {
     authorization: "2be0f169-5c86-4181-b303-3b009feba466",
     "Content-Type": "application/json",
   },
 });

 apiProfile.getProfileInfo().then((profile) => {
  
   const profileImage = document.querySelector(".profile__image");
   profileImage.src = profile.avatar;
   textProfileName.textContent = profile.name;
   profileDescription.textContent = profile.about;
 });
 
 

function handleProfileFormSubmit() {
  const profileInfo = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  }
  apiProfile.changeProfile(profileInfo);

  userInfo.setUserInfo(profileNameInput, profileJobInput);
  profilePopUp.close();
}

function handleFormSubmit(objectNewCards) {
  const newElement = createCard(objectNewCards);
  apiCards.postCardOnTheServer(objectNewCards);
  cardsContainer.prepend(newElement);
  addingInactiveClassForSubmit.classList.add(
    validationConfig.inactiveButtonClass
  );
}

const userInfo = new UserInfo(textProfileName,profileDescription); 

const profilePopUp = new PopupWithForm(popupEditProfileSelector,handleProfileFormSubmit);

popupOpenProfileButton.addEventListener("click", function () {
  
  profilePopUp.open();
  editUserProfileValidator.clearProfileErrors();
  const profileDataFromPage = userInfo.getUserInfo();

  profileNameInput.value = profileDataFromPage.userName; 
  profileJobInput.value = profileDataFromPage.userDescription; 
  
});



profilePopUp.setEventListeners();

const addCardPopup = new PopupWithForm(popupCardsSelector,handleFormSubmit);  
popupCardsOpenButton.addEventListener("click", function () { 
  addCardPopup.open();
  addingInactiveClassForSubmit.classList.add(validationConfig.inactiveButtonClass);
});
addCardPopup.setEventListeners();

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

const apiCards = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17/cards ",
  headers: {
    authorization: "2be0f169-5c86-4181-b303-3b009feba466",
    "Content-Type": "application/json",
  },
});

apiCards.getInitialCards().then(cards =>{
  console.log(cards);
  const cardsList = new Section({
    items:cards,
    renderer: (card) => {
      const element = createCard(card)
  
      cardsList.addItem(element);
    },
   },cardsContainer);
  
  cardsList.renderItems();
})


// const cardsList = new Section({
//   items:initialCards,
//   renderer: (card) => {
//     const element = createCard(card)

//     cardsList.addItem(element);
//   },
//  },cardsContainer);

// cardsList.renderItems();