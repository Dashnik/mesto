import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,overlay,handleFormSubmit) {
    super(popupSelector,overlay);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const emptyLike = [];
    const inputValues = {};
    const emptyId = '';

    /**
     * если я не буду добавлять id новой карточке, то мне негде будет брать
     * информацию кому принадлежит новая карточка, а если я не буду знать 
     * кому принадлежит новая карточка, то я не буду знать отрисовывать логотип корзины или нет.
     */
    const ownerID = {
      _id: "2911d40eec43f0326fe3701b"
    }
  
    const valuesFromInputs = this._popupElement.querySelectorAll(
      ".popup__input"
    );

    valuesFromInputs.forEach(element => {
      inputValues[element.name] = element.value;      
    }); 
    inputValues.likes = emptyLike;
    inputValues.owner = ownerID;
    return inputValues;
  } 

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
   this._popupElement.reset();   
  }

  renderLoading(isLoading){
    const submitButton = this._popupElement.querySelector('.popup__submit');
      if (isLoading){
        submitButton.innerHTML = 'Сохранение...';
      } else {
        submitButton.innerHTML = 'Сохранить';
      }   
   };

}