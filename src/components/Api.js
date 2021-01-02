export default class Api {
  constructor(config) {
    /** тело конструктора*/
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
  }


  setNewProfile(profileInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
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
  }

  postCardOnTheServer(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
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
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(link),
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
  }

  deleteCard(cardID) {
    return fetch(`${this.baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
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
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
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
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
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
    }
}
