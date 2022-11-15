

class Api {
    constructor(url, headers) { 
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    setInitialState() {
       return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
        .then(this._checkResponse);
    }
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(this._checkResponse);
    }
    updateUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        })
        .then(this._checkResponse);
    }
    updateUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers:this._headers,
            body: JSON.stringify({
                avatar:data.avatar
              })
        })
        .then(this._checkResponse);
    }
    

    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
              })
        }) 
        .then(this._checkResponse);
    }  

    deleteCard(data) {
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
        }) 
        .then(this._checkResponse);
    }

    changeLikeStatus(data, isLiked) {
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: isLiked? 'PUT' : 'DELETE',
            headers:this._headers,
        }) 
        .then(this._checkResponse);
    }

}

export default Api;

// export const api = new Api('http://mesto90back.nomoredomains.sbs', {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.token}`,
// });