const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");

export default class UserInfo {
  constructor(userNameElement, userDescriptionElement) {
    this._selectorName = userNameElement;
    this._selectorDescription = userDescriptionElement;
  }

  getUserInfo() {
    const name = this._selectorName.textContent; 
    //profileNameInput.value = name;  
    const description = this._selectorDescription.textContent; 
    //profileJobInput.value = description; 
      
     const ObjectWithUserProfileData = {
      userName : name,
      userDescription : description,
    }
    
  return ObjectWithUserProfileData;
  }

  setUserInfo(userName, userDescription) {
    const nameInputValue = userName.value; 
    const jobInputValue = userDescription.value; 
 
    this._selectorName.textContent = nameInputValue; 
    this._selectorDescription.textContent = jobInputValue; 
  }
}
