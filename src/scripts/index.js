import '../pages/style.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import ApproveForm from '../components/ApproveForm.js';
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
const popupImageSelector = ".popup_image";
const popupTrashSelector = ".popup_removing_card";
 const popupEditProfilePhotoSelector = ".popup_editing_photo_profile";

const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");
const addingInactiveClassForSubmit = document.querySelector('.popup_cards__submit');

const profileImage = document.querySelector(".profile__image");
const profilePhotoContainer = document.querySelector(".profile__photo_container");
const submitButton =  document.querySelector('.popup__profile_submit');
const submitTest = document.querySelectorAll('.popup__submit');


// function renderLoading(isLoading){

//   if (isLoading){
//     submitTest.innerHTML = 'Сохранение...';
//   } else {
//     submitTest.innerHTML = 'Сохранить';
//   }
//   };

 const apiProfile = new Api({
   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17/users/me",
   headers: {
     authorization: "2be0f169-5c86-4181-b303-3b009feba466",
     "Content-Type": "application/json",
   },
 });

 const apiAvatar = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17/users/me/avatar",
  headers: {
    authorization: "2be0f169-5c86-4181-b303-3b009feba466",
    "Content-Type": "application/json",
  },
});


 const popupWithEditPhoto = new PopupWithForm(popupEditProfilePhotoSelector,handleEditPhotoProfileSubmit);

 popupWithEditPhoto.setEventListeners();

//  profileImage.addEventListener('click', function(){
  profilePhotoContainer.addEventListener('click', function(){
  popupWithEditPhoto.open();
 });

 apiProfile.getProfileInfo().then((profile) => {
  console.log(profile);  
 console.log(profile.name);
 console.log(profile._id);
   profileImage.src = profile.avatar;
   textProfileName.textContent = profile.name;
   profileDescription.textContent = profile.about;
 });
 
 function handleEditPhotoProfileSubmit(newLink){
 //apiAvatar.changeAvatar(newLink);
 //apiProfile.changeAvatar(newLink);
  //apiAvatar.changeAvatar(newLink.avatar);
   profileImage.src = newLink.avatar;
 }


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

  //apiCards.postCardOnTheServer(objectNewCards);
 
  cardsContainer.prepend(newElement);
  addingInactiveClassForSubmit.classList.add(
    validationConfig.inactiveButtonClass
  );
}

function handleRemovingFormSubmit(cardElement){
  cardElement;
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
  const cardElement = new Card(cardTemplate,card,handleCardClick,handleTrashClick);

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
const trashPopup = new ApproveForm(popupTrashSelector,handleRemovingFormSubmit);

trashPopup.setEventListeners();

function handleTrashClick(event){
  const cardChild = event.target.parentNode;
  console.log(cardChild);
  trashPopup.open();
}

const apiCards = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17/cards ",
  headers: {
    authorization: "2be0f169-5c86-4181-b303-3b009feba466",
    "Content-Type": "application/json",
  },
});

apiCards.getInitialCards().then(cards =>{


  const cardsList = new Section({
    items:cards,
    renderer: (card) => {
      const element = createCard(card)
  
      cardsList.addItem(element);
    },
   },cardsContainer);
  
  cardsList.renderItems();
})








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