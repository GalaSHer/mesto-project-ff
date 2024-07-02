const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '4f707e3e-9d0d-4749-8ad8-9dbba15811ab',
    'Content-Type': 'application/json'
  }
};

const handleResponseOk = (res) => {
  if (res.ok) {
  return res.json()}
return Promise.reject(`Ошибка: ${res.status}`);
};

const handleResponseErr = (err) => {
  console.log(err);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers})
    .then(handleResponseOk)
    .catch(handleResponseErr)
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers})
    .then(handleResponseOk)
    .catch(handleResponseErr)  
};

export const pushUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: document.querySelector('.profile__title').textContent,
      about: document.querySelector('.profile__description').textContent
    })
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)  
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
  .then(handleResponseOk)
  .catch(handleResponseErr);  
}; 

export const deleteCardData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
};

export const pushCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
};

export const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
};

export const updateAvatarOnServer = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
};