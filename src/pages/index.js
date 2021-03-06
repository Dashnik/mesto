import "./style.css";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {validationConfig, overlay,popupCardsSelector,popupImageSelector,popupTrashSelector,
  cardTemplate, profileImageSelector, popupEditProfileSelector,popupEditProfilePhotoSelector,popupOpenProfileButton,
  popupCardsOpenButton,cardsContainer, textProfileName, profileDescription,profileNameInput,
  profileJobInput,addingInactiveClassForSubmit, profileImage,profilePhotoContainer
} from "../scripts/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/** Обработчики  */
function handleTrashClick(card) {
  trashPopup.open();
  trashPopup.setEventListeners(card);
}

function handleEditPhotoProfileSubmit(newLink) {
  popupWithEditPhoto.renderLoading(true);
  apiPraktikum.changeAvatar(newLink)
  .then(()=>{
    userInfo.setUserAvatar(newLink.avatar);
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
    userInfo.setUserInfo(profileInfo.name, profileInfo.about);
    profilePopUp.close();
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
    profilePopUp.renderLoading(false);
  })
}

function handleFormSubmit(objectNewCard) {
  addCardPopup.renderLoading(true);
  apiPraktikum.postCardOnTheServer(objectNewCard)
  .then((dataCardAfterCreation)=>{
 
    const newElement = createCard(dataCardAfterCreation,dataCardAfterCreation.owner._id);
     cardsList.addItem(newElement);
  
    addingInactiveClassForSubmit.classList.add(
      validationConfig.inactiveButtonClass
    );
  
   addCardPopup.close();
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
    addCardPopup.renderLoading(false);
  })
}

function handleFormWithDeleteSubmit(card){
  apiPraktikum.deleteCard(card.id)
  .then(()=> {
    card.remove();
    trashPopup.close();
  })
  .catch(err => {
    console.log(err);
  }) 
}

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

/** Объявление экземпляров классов*/
const apiPraktikum = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "62377db5-e458-4bf1-a2a6-d8b8f8bb8a60",
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
  profileImageSelector
);

const cardsList = new Section(
  {
    renderer: (card,userId) => {
      const element = createCard(card,userId);
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


function createCard(card,userId) {
  const cardElement = new Card(
    cardTemplate,
    card,
    handleCardClick,
    handleTrashClick,
    apiPraktikum,
    userId
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
  apiPraktikum.getInitialCards(),
  apiPraktikum.getProfileInfo()
])
.then((values) => {
  const [initialCards,profileInfo] = values;
  const userId = profileInfo._id;

  cardsList.renderItems(initialCards,userId);
  userInfo.setUserInfo(profileInfo.name,profileInfo.about);
  userInfo.setUserAvatar(profileInfo.avatar);
})
.catch((err) =>{
  console.log(err);
})