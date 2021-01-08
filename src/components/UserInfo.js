export default class UserInfo {
  constructor(userNameElement, userDescriptionElement,apiPraktikum) {
    this._selectorName = userNameElement;
    this._selectorDescription = userDescriptionElement;
    this.apiPraktikum = apiPraktikum;
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

  // getUserInfoFromServer() {
  //   const profileImage = document.querySelector(".profile__image");

  //   this.apiPraktikum.getProfileInfo()
  //   .then((profile) => {
  //     profileImage.src = profile.avatar;
  //     this._selectorName.textContent = profile.name;
  //     this._selectorDescription.textContent = profile.about;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });     
  // }

}
