const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__name-edit_open-popup');
const popupCloseButton = popup.querySelector('.popup__close');

const popupToggle = function (){

  popup.classList.toggle('popup_opened');

}

popupOpenButton.addEventListener('click',popupToggle );
popupCloseButton.addEventListener('click',popupToggle );