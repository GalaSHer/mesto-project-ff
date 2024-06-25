const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '4f707e3e-9d0d-4749-8ad8-9dbba15811ab',
    'Content-Type': 'application/json'
  }
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers})
    .then(res => {
      if (res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers})
    .then(res => {if (res.ok) {
        return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`);
    })  
};
