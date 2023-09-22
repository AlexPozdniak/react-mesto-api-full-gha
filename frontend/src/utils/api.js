import {API_CONFIG} from "./constants";

export class Api {
  constructor(config) {
    this.url = config.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getData(token) {
    return Promise.all([this._getUser(token), this._getInitialCards(token)]);
  }
  _getInitialCards(token){
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }
  createCard( { name, link }, token ){
    return fetch(`${this.url}/cards`,{
      method:'POST',
      body: JSON.stringify({name, link}),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._checkResponse);
  }

  _getUser(token){
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }).then(this._checkResponse);
  }

  setUserAvatar(data, token){
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
  patchUserInfo(data,token){
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId){
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return isLiked ? this._deleteLike(cardId, token) : this._putLike(cardId, token)
  }

  _putLike(cardId, token){
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
  _deleteLike(cardId, token){
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api(API_CONFIG);
export default api;
