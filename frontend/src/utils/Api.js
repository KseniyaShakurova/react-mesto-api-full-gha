export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  setUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  createNewCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type' : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  likeCard(data, token) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  disLike(data, token) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  deleteCard(data, token) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    }).then(this._handleResponse);
  }

  updateAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
  
}
const api = new Api({
  baseUrl: "https://api.shakurovak.nomoredomainsicu.ru",

});

export { api };
