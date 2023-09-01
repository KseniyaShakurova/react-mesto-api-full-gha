export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.headers = options.headers;
    this._token = options.token;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers:  {
        Authorization: `Bearer ${this._token}`
      },
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        Authorization : `Bearer ${this._token}`
      },
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
        Authorization : `Bearer ${this._token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  createNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type' : "application/json",
        Authorization : `Bearer ${this._token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  likeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "PUT",
      headers: this._token,
    }).then(this._handleResponse);
  }

  disLike(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: this._token,
    }).then(this._handleResponse);
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: {
        Authorization : `Bearer ${this._token}`
    },
    }).then(this._handleResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type' : "application/json",
            Authorization : `Bearer ${this._token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
  
}
const api = new Api({
  baseUrl: "https://api.shakurovak.nomoredomainsicu.ru",
});

export { api };
