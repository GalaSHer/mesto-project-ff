const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '4f707e3e-9d0d-4749-8ad8-9dbba15811ab',
    'Content-Type': 'application/json'
  }
};

//обработка ответа

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

//получение информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers})
    .then(handleResponse)
};

//получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers})
    .then(handleResponse)
};

//отправка данных о профиле пользователя
export const pushUserInfo = (userName, userDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription
    })
  })
  .then(handleResponse)  
}; 

//отправка новой карточки
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

//удаление карточки
export const deleteCardData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse)
};

//отправка данных о лайке карточки
export const pushCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse)
};

//удаление данных о лайке карточки
export const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse)
};

//отправка нового аватара
export const updateAvatarOnServer = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(handleResponse)
};