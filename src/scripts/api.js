const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '4f707e3e-9d0d-4749-8ad8-9dbba15811ab',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
  return res.json()}
return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers})
    .then(handleResponse)
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers})
    .then(handleResponse)  
};

export const pushUserInfo = () => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: document.querySelector('.profile__title').textContent,
      about: document.querySelector('.profile__description').textContent
    })
  })
  .then(handleResponse)  
}; 

export const pushNewCard = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    })
  })
  .then(handleResponse)  
}; 

export const deleteCardData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse);
};

