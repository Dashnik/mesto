export default class UserInfo {
  constructor(userNameElement, userDescriptionElement) {
    this._selectorName = userNameElement;
    this._selectorDescription = userDescriptionElement;
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
    const nameInputValue = userName.value; 
    const jobInputValue = userDescription.value; 
 
    this._selectorName.textContent = nameInputValue; 
    this._selectorDescription.textContent = jobInputValue; 
  }
}
