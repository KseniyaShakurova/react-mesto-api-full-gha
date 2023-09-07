export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(token) {
    
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
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
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  createNewCard(data, token) {
    console.log(token);
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
    console.log(token)
    return fetch(`${this._baseUrl}/cards/${data}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
     }
    }).then(this._handleResponse);
  }

  deleteCard(data, token) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`
     }
    }).then(this._handleResponse);
  }

  updateAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
  
}
const api = new Api({
  //baseUrl: "http://localhost:3001",
  baseUrl: "https://api.shakurovak.nomoredomainsicu.ru",
 /* headers: {
    authorization: "aa98c8c5-50a3-4af7-9387-defe134c3e66",
    "Content-Type": "application/json",
  },*/
});

export { api };
