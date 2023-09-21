import {API_CONFIG} from "./constants";

export class Api {
  constructor(config) {
    this.url = config.url + config.group;
    this.token = config.token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getData() {
    return Promise.all([this._getUser(), this._getInitialCards()]);
  }
  _getInitialCards(){
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token,
      }
    })
      .then(this._checkResponse);
  }
  createCard( { name, link } ){
    return fetch(`${this.url}/cards`,{
      method:'POST',
      body: JSON.stringify({name, link}),
      headers: {
        'Content-Type': 'application/json',
        authorization: this.token,
      }
    })
      .then(this._checkResponse);
  }

  _getUser(){
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token,
      }
    }).then(this._checkResponse);
  }

  setUserAvatar(data){
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
  patchUserInfo(data){
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
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

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._deleteLike(cardId) : this._putLike(cardId)
  }

  _putLike(cardId){
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
      },
    }).then(this._checkResponse);
  }
  _deleteLike(cardId){
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api(API_CONFIG);
export default api;
