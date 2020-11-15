const profileNameInput = document.querySelector(".popup__item_profile_name");
const profileJobInput = document.querySelector(".popup__item_profile_job");

export default class UserInfo {
  constructor(selectorName, selectorDescription) {
    this._selectorName = selectorName;
    this._selectorDescription = selectorDescription;
  }
  getUserInfo() {
    const name = this._selectorName.textContent;
    profileNameInput.value = name;

    const description = this._selectorDescription.textContent;
    profileJobInput.value = description;
  }

  setUserInfo() {
    const nameInputValue = profileNameInput.value;
    const jobInputValue = profileJobInput.value;

    this._selectorName.textContent = nameInputValue;
    this._selectorDescription.textContent = jobInputValue;
  }
}
