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
const popupEditProfileSelector = '.popup_edit-user-profile';
//const popupEditProfileElement = document.querySelector('.popup_edit-user-profile');
const popupCardsSelector = ".popup_cards";
// const popupImageSelector = ".popup_image";
const popupImageSelector = ".popup_type_image";
const popupTrashSelector = ".popup_type_removing_card";
const popupEditProfilePhotoSelector = ".popup_type_editing_photo_profile"

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

const trashPopup = new PopupWithDelete(popupTrashSelector);

function handleTrashClick(card){
  trashPopup.open();  
  trashPopup.setEventListeners(card,apiPraktikum);
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
 
  apiPraktikum.setNewProfile(profileInfo);

  userInfo.setUserInfo(profileNameInput, profileJobInput);
  profilePopUp.close();

}

// function handleFormSubmit(objectNewCards) {
//   const newElement = createCard(objectNewCards);
//   apiPraktikum.postCardOnTheServer(objectNewCards);
//   location.reload()
//   cardsContainer.prepend(newElement);
//   addingInactiveClassForSubmit.classList.add(
//     validationConfig.inactiveButtonClass
//   );
// }

function handleFormSubmit(objectNewCard) {
  const newElement = createCard(objectNewCard);
  apiPraktikum.postCardOnTheServer(objectNewCard);
  location.reload()
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

function createCard(card) {
    const cardElement = new Card(
      cardTemplate,
      card,
      handleCardClick,
      handleTrashClick,
      handleLikeClick
    );
  
    const element = cardElement.getElement();
    return element;
}

const editUserProfileValidator = new FormValidator(validationConfig.formSelector, validationConfig);
editUserProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig.formSelectorCard, validationConfig);
addCardValidator.enableValidation();

// const editProfilePhotoValidator = new FormValidator(validationConfig.formSelectorPhotoProfile, validationConfig);
// editProfilePhotoValidator.enableValidation();

const imagePopup =  new PopupWithImage (popupImageSelector);
imagePopup.setEventListeners();

function handleCardClick(link,name){
  imagePopup.open(link,name);
}

function handleLikeClick(cardID, counterLikesElement,isLiked) {

  if (isLiked == null)
   {
      const promiseDeleteLikes = apiPraktikum.deleteLike(cardID);
      promiseDeleteLikes.then((countLikesFromServer) => {
      counterLikesElement.textContent = countLikesFromServer.likes.length;
     });
    }
else
{
  const promiseLikes = apiPraktikum.putLike(cardID);
  promiseLikes.then((countLikesFromServer) => {
    counterLikesElement.textContent = countLikesFromServer.likes.length;
  });
}
}

apiPraktikum.getInitialCards().then((cards) => {
 //console.log(cards);
  const cardsList = new Section(
    {
      items: cards,
      renderer: (card) => {
        const element = createCard(card);
        cardsList.addItem(element);
      },
    },
    cardsContainer
  );

  cardsList.renderItems();
});