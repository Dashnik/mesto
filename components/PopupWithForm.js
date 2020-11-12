//const { default: Popup } = require("./Popup");
import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(handleFormSubmit) {
    this.handleFormSubmit = handleFormSubmit;
  }

  setEventListeners(){
    super.setEventListeners();
    this.handleFormSubmit.addEventListener('click',()=>{
      
    })
  }

  _getInputValues() {}
}
