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
    return Promise.all([this._getUser(token), this._getInitialCards()]);
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

  _getUser(token){
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: token,
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
  patchUserInfo(data,token){
    console.log('infotoken', token)
    console.log('infotoken', data)
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
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
