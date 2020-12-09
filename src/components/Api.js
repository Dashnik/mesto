export default class Api {
  constructor(config) {
    //тело конструктора
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getProfileInfo() {
    return fetch(this.baseUrl, {
      headers: this.headers })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      headers: this.headers })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }
}