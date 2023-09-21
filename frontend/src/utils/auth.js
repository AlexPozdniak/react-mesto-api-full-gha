import {API_CONFIG} from "./constants";

export class Auth {
    constructor(config) {
        this.authUrl = config.authUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    authorize(password, email, login = true){
        return fetch(`${this.authUrl}/sign${login ? 'in' : 'up'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email
            }),
        }).then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this.authUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._checkResponse)
    }
}

const auth = new Auth(API_CONFIG);
export default auth;
