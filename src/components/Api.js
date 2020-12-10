export default class Api {
  constructor(config) {
    //тело конструктора
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getProfileInfo() {
    return fetch(this.baseUrl, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  changeProfile(profileInfo) {
    return fetch(this.baseUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(profileInfo),
    })
      .then((result) => {
        if (!result.ok) {
          return Promise.reject("Server error");
        }
        return result.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  }

  postCardOnTheServer(newCard) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(newCard),
    })
      .then((result) => {
        if (!result.ok) {
          return Promise.reject("Server error");
        }
        return result.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  }
}
