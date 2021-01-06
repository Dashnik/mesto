export default class Api {
  constructor(config) {
    /** тело конструктора*/
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  _getResponseData(value){
    if (value.ok) {
      return value.json();
    }
    else {
      return Promise.reject(`Ошибка: ${value.status}`);
    }
  }

  getProfileInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
    .then((res) => {
      return this._getResponseData(res);
      // if (res.ok) {
      //   return res.json();
      // }
      // else {
      //   return Promise.reject(`Ошибка: ${res.status}`);
      // }
    });
  }

  // setNewProfile(profileInfo) {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "PATCH",
  //     headers: this.headers,
  //     body: JSON.stringify(profileInfo),
  //   })
  //     .then((result) => {
  //       if (!result.ok) {
  //         return Promise.reject("Server error");
  //       }
  //       return result.json();
  //     })
  //     .then((data) => {
  //       return data;
  //     });
  // }

  
    setNewProfile(profileInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(profileInfo),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  postCardOnTheServer(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(newCard),
    })
      .then((res) => {
        return this._getResponseData(res);
        // if (!result.ok) {
        //   return Promise.reject("Server error");
        // }
        // return result.json();
      })
      // .then((data) => {
      //   return data;
      // });
  }

  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(link),
    })
      .then((res) => {
        return this._getResponseData(res);
        // if (!result.ok) {
        //   return Promise.reject("Server error");
        // }
        // return result.json();
      })
      // .then((data) => {
      //   return data;
      // });
  }

  deleteCard(cardID) {
    return fetch(`${this.baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        return this._getResponseData(res);
        // if (!result.ok) {
        //   return Promise.reject("Server error");
        // }
        // return result.json();
      })
      .then((data) => {
        return data;
      });
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        return this._getResponseData(res);
        // if (!result.ok) {
        //   return Promise.reject("Server error");
        // }
        // return result.json();
      })
      .then((data) => {
        return data;
      });
  }
}
