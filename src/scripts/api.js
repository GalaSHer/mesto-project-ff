const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '4f707e3e-9d0d-4749-8ad8-9dbba15811ab',
    'Content-Type': 'application/json'
  }
};

//обработка ответа

const handleResponseOk = (res) => {
  if (res.ok) {
    return res.json()}
  return Promise.reject(`Ошибка: ${res.status}`);
};

const handleResponseErr = (err) => {
  console.log(err);
};

//получение информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers})
    .then(handleResponseOk)
    .catch(handleResponseErr)
};

//получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers})
    .then(handleResponseOk)
    .catch(handleResponseErr)  
};

//отправка данных о профиле пользователя
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
  .then(handleResponseOk)
  .catch(handleResponseErr);  
}; 

//удаление карточки
export const deleteCardData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
};

//отправка данных о лайке карточки
export const pushCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
};

//удаление данных о лайке карточки
export const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponseOk)
  .catch(handleResponseErr)
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
  .then(handleResponseOk)
  .catch(handleResponseErr)
};