const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__name-edit_open-popup');
const popupCloseButton = popup.querySelector('.popup__close');

const popupToggle = function (event){
  event.preventDefault();
  popup.classList.toggle('popup_opened');
}

const closePopup = function (event) {
  if (event.target !== event.currentTarget) return
  popupToggle(event);
}

popupOpenButton.addEventListener('click',popupToggle );
popupCloseButton.addEventListener('click',popupToggle );
popup.addEventListener('click', closePopup);
