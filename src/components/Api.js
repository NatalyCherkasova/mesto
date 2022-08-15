import Card from "./Card.js";

class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;

    this._getJsonOrError = this._getJsonOrError.bind(this);
  }

  _getJsonOrError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._host}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJsonOrError);
  }

  getProfileInfo() {
    return fetch(`${this._host}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJsonOrError);
  }

  setProfileInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
      .then(this._getJsonOrError);
  }

  addNewCard(data) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._getJsonOrError);
  }

  addLikeCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJsonOrError);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJsonOrError);
  }

  deleteCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getJsonOrError);
  }

  setAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then(this._getJsonOrError);
  }
}

export default Api;
