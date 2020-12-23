import '../pages/style.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
//import {initialCards} from './Defaults-cards.js';
import {validationConfig} from './constants.js';
import Api from '../components/Api.js';

const popupOpenProfileButton = document.querySelector(".profile__name-edit");
//const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const cardsContainer = document.querySelector(".elements");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = ".card-template";
const cardTemplateWithoutTrashIcon = '.card-template-without-Trash-Icon';
const popupEditProfileSelector = '.popup_edit-user-profile';
//const popupEditProfileElement = document.querySelector('.popup_edit-user-profile');
const popupCardsSelector = ".popup_cards";
const popupImageSelector = ".popup_image";
const popupTrashSelector = ".popup_removing_card";
 const popupEditProfilePhotoSelector = ".popup_editing_photo_profile";

const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");
const addingInactiveClassForSubmit = document.querySelector('.popup_cards__submit');

const profileImage = document.querySelector(".profile__image");
const profilePhotoContainer = document.querySelector(".profile__photo_container");


 const apiPraktikum = new Api({
   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
   headers: {
     authorization: "2be0f169-5c86-4181-b303-3b009feba466",
     "Content-Type": "application/json",
   },
 });

 const popupWithEditPhoto = new PopupWithForm(popupEditProfilePhotoSelector,handleEditPhotoProfileSubmit);

 popupWithEditPhoto.setEventListeners();

  profilePhotoContainer.addEventListener('click', function(){
  popupWithEditPhoto.open();
 });


 function handleRemovingFormSubmit(cardID){
  cardID.remove();
}

const trashPopup = new PopupWithDelete(popupTrashSelector,handleRemovingFormSubmit);

trashPopup.setEventListeners();

function handleTrashClick(event){
  const cardChild = event.target.parentNode;
// console.log(cardChild);
  trashPopup.open();  
}

apiPraktikum.getProfileInfo().then((profile) => {
   profileImage.src = profile.avatar;
   textProfileName.textContent = profile.name;
   profileDescription.textContent = profile.about;
 });
 
 function handleEditPhotoProfileSubmit(newLink) {
  apiPraktikum.changeAvatar(newLink);
   profileImage.src = newLink.avatar;
 }


function handleProfileFormSubmit() {
  const profileInfo = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  }
 
  apiPraktikum.changeProfile(profileInfo);

  userInfo.setUserInfo(profileNameInput, profileJobInput);
  profilePopUp.close();

}

function handleFormSubmit(objectNewCards) {
  const newElement = createCard(objectNewCards);

  apiPraktikum.postCardOnTheServer(objectNewCards);
 
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

const myID = "2911d40eec43f0326fe3701b";

function createCard(card) {
    const cardElement = new Card(
      cardTemplate,
      card,
      handleCardClick,
      handleTrashClick
    );
  
    const element = cardElement.getElement();
    return element;
}

function createCardWithoutTrashIcon(card) {
  const cardElement = new Card(
    cardTemplateWithoutTrashIcon,
    card,
    handleCardClick,
    handleTrashClick
  );

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

apiPraktikum.getInitialCards().then((cards) => {
 // console.log(cards);

  const cardsList = new Section(
    {
      items: cards,
      renderer: (card) => {
        if (card.owner._id === myID) {
          const element = createCard(card);

          cardsList.addItem(element);
        }
        else {
          const element = createCardWithoutTrashIcon(card);

          cardsList.addItem(element);
        }
      },
    },
    cardsContainer
  );

  cardsList.renderItems();
});








// function handleCardClick(link,name){
//   imagePopup.open(link,name);
// }



// const cardsList = new Section({
//   items:initialCards,
//   renderer: (card) => {
//     const element = createCard(card)

//     cardsList.addItem(element);
//   },
//  },cardsContainer);

// cardsList.renderItems();