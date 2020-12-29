export default class Api {
  constructor(config) {
    //тело конструктора
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
      .catch((err) =>{
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((err) =>{
        console.log(err);
      });
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
      .catch((err) => {
        alert(err);
      });
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
      .catch((err) => {
        alert(err);
      });
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
      .catch((err) => {
        alert(err);
      });
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
      .catch((err) => {
        alert(err);
      });
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
      .catch((err) => {
        alert(err);
      });
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
      .catch((err) => {
        alert(err);
      });
    }
}
