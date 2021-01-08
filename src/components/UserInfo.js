export default class UserInfo {
  constructor(userNameElement, userDescriptionElement,userAvatarSelector) {
    this._selectorName = userNameElement;
    this._selectorDescription = userDescriptionElement;
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const name = this._selectorName.textContent; 
    const description = this._selectorDescription.textContent; 
      
     const userData = {
      userName : name,
      userDescription : description,
    }
    
  return userData;
  }

  setUserInfo(userName, userDescription) {
    const nameInputValue = userName; 
    const jobInputValue = userDescription; 
 
    this._selectorName.textContent = nameInputValue; 
    this._selectorDescription.textContent = jobInputValue; 
  }

  setUserAvatar(data){
    this._avatar.src = data;
  }

}
