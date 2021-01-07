import "./style.css";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {validationConfig} from "../scripts/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const overlay = ".overlay";
const popupCardsSelector = ".popup_type_new-cards";
const popupImageSelector = ".popup_type_image";
const popupTrashSelector = ".popup_type_removing_card";
const cardTemplate = ".card-template";
const popupEditProfileSelector = ".popup_type_edit-user-profile";
const popupEditProfilePhotoSelector = ".popup_type_editing_photo_profile";
const popupOpenProfileButton = document.querySelector(".profile__name-edit");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const cardsContainer = document.querySelector(".elements");
const textProfileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");
const addingInactiveClassForSubmit = document.querySelector(".popup_cards__submit");
const profileImage = document.querySelector(".profile__image");
const profilePhotoContainer = document.querySelector(".profile__photo_container");

/** Обработчики  */
function handleTrashClick(card) {
  trashPopup.open();
  trashPopup.setEventListeners(card);
}

function handleEditPhotoProfileSubmit(newLink) {
  popupWithEditPhoto.renderLoading(true);
  apiPraktikum.changeAvatar(newLink)
  .then(()=>{
    profileImage.src = newLink.avatar;
    popupWithEditPhoto.close();
  })
  .catch((error) =>{
    console.log(error);
  })
  .finally(()=>{
    popupWithEditPhoto.renderLoading(false);
  })
  
}

function handleProfileFormSubmit() {
  
  const profileInfo = {
    name: profileNameInput.value,
    about: profileJobInput.value,
  };
  profilePopUp.renderLoading(true);
  apiPraktikum.setNewProfile(profileInfo)
  .then(()=>{
    userInfo.setUserInfo(profileNameInput, profileJobInput);
    profilePopUp.close();
  })
  .finally(()=>{
    profilePopUp.renderLoading(false);
  })
}

function handleFormSubmit(objectNewCard) {

  const newElement = createCard(objectNewCard);
  addCardPopup.renderLoading(true);
  apiPraktikum.postCardOnTheServer(objectNewCard)
  .then(()=>{
    cardsList.addItem(newElement);
    addingInactiveClassForSubmit.classList.add(
      validationConfig.inactiveButtonClass
    );
  
   addCardPopup.close();
  })
  .finally(()=>{
    addCardPopup.renderLoading(false);
  })
}

function handleFormWithDeleteSubmit(card){
  console.log(card.id);
  apiPraktikum.deleteCard(card.id)
  .then(()=> {
    console.log('It is success');
    card.remove();
  
  })
  .catch(err => {
    console.log('It is error');
    console.log(err);
  }) 
  .finally(()=>{

    trashPopup.close();
  })
}

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

/** Объявление экземпляров классов*/
const apiPraktikum = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "2be0f169-5c86-4181-b303-3b009feba466",
    "Content-Type": "application/json",
  },
});

const profilePopUp = new PopupWithForm(
  popupEditProfileSelector,
  overlay,
  handleProfileFormSubmit
);

const trashPopup = new PopupWithDelete(popupTrashSelector,overlay, handleFormWithDeleteSubmit );

const popupWithEditPhoto = new PopupWithForm(
  popupEditProfilePhotoSelector,
  overlay,
  handleEditPhotoProfileSubmit
);

const userInfo = new UserInfo(
  textProfileName,
  profileDescription,
  apiPraktikum
);

const cardsList = new Section(
  {
    renderer: (card) => {
      const element = createCard(card);
      cardsList.addItem(element,true);
    },
  },
  cardsContainer
);

const addCardPopup = new PopupWithForm(popupCardsSelector, overlay, handleFormSubmit);

const imagePopup = new PopupWithImage(popupImageSelector, overlay);

/** Инициализация слушателей на странице */
popupWithEditPhoto.setEventListeners();
profilePopUp.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

profilePhotoContainer.addEventListener("click", function () {
  popupWithEditPhoto.open();
});

popupOpenProfileButton.addEventListener("click", function () {
  profilePopUp.open();
  editUserProfileValidator.clearProfileErrors();
  const profileDataFromPage = userInfo.getUserInfo();

  profileNameInput.value = profileDataFromPage.userName;
  profileJobInput.value = profileDataFromPage.userDescription;
});

popupCardsOpenButton.addEventListener("click", function () {
  addCardPopup.open();
  editUserProfileValidator.clearProfileErrors();
  addingInactiveClassForSubmit.classList.add(
    validationConfig.inactiveButtonClass
  );
});

profilePhotoContainer.addEventListener("click", function () {
  popupWithEditPhoto.open();
});


function createCard(card) {
  const cardElement = new Card(
    cardTemplate,
    card,
    handleCardClick,
    handleTrashClick,
    apiPraktikum
  );

  const element = cardElement.getElement();
  return element;
}
/** Инициализация экземпляров для валидации инпутов  */
const editUserProfileValidator = new FormValidator(
  validationConfig.formSelector,
  validationConfig
);

editUserProfileValidator.enableValidation();

const addCardValidator = new FormValidator(
  validationConfig.formSelectorCard,
  validationConfig
);
addCardValidator.enableValidation();

/** Инициализация данных с сервера */
Promise.all([ 
  userInfo.getUserInfoFromServer(),
  apiPraktikum.getInitialCards()
  .then((cards) => {
    cardsList.renderItems(cards);
  })
])
.catch((err) =>{
  console.log(err);
})