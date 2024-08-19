import '../pages/index.css';
import {cloneTemplate, createCard, handleDeleteCardClick } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation} from './validation.js';
import { getUserInfo, getInitialCards, pushUserInfo, pushNewCard, updateAvatarOnServer, deleteCardData } from './api.js';

//конфиг валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// заготовка обработчика сабмита формы подтверждения
let submitFormConfirm = () => {};

// переменные 
let userId = null;
const profileImage = document.querySelector('.profile__image');
const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.places__list');

const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const popupUpdateAvatarForm = popupUpdateAvatar.querySelector('.popup__form');
const avatarUrlInput = popupUpdateAvatar.querySelector('.popup__input_type_url');
const popupUpdateAvatarSaveBtn = popupUpdateAvatar.querySelector('.popup__button');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');
const popupEditSaveBtn = popupEdit.querySelector('.popup__button');

const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = popupNewCard.querySelector('.popup__input_type_url');
const popupNewCardSaveBtn = popupNewCard.querySelector('.popup__button');

const popupImg = document.querySelector('.popup_type_image');
const image = popupImg.querySelector('.popup__image');
const imageCaption = popupImg.querySelector('.popup__caption');

const popupConfirmDeleteCard = document.querySelector('.popup_type_delete-card');
const cardDeleteSubmitBtn = popupConfirmDeleteCard.querySelector('.popup__button');

//слушатели событий 

editButton.addEventListener('click', handleEditForm);

profileImage.addEventListener('click', ()=> {
  popupUpdateAvatarForm.reset();
  clearValidation(popupUpdateAvatarForm, validationConfig);
  openPopup(popupUpdateAvatar)
});

newCardButton.addEventListener('click',()=> {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(popupNewCard)
});

popupUpdateAvatarForm.addEventListener('submit', handleUpdateAvatar);
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupNewCard.addEventListener('submit', handleFormNewCard);
popupConfirmDeleteCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormConfirm();
});

// отображение начальных данных на странице

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    personName.textContent = userData.name;
    personDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
      
    initialCards.forEach((card) => {
     const cardElement = createCard(card, userId, cloneTemplate, handleDeleteCard, openPopupImg);
     cardsContainer.append(cardElement);
    });
  })
  .catch(err => console.log(err));

//редактирование профиля

function handleEditForm() {
  nameInput.value = personName.textContent;
  jobInput.value = personDescription.textContent;
  clearValidation(popupEditForm, validationConfig);
  openPopup(popupEdit);
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  updateBtnText(popupEditSaveBtn, 'Сохранение...');
  pushUserInfo(nameInput.value, jobInput.value)
    .then((updatedUserData) => {
      personName.textContent = updatedUserData.name;
      personDescription.textContent = updatedUserData.about;
      closePopup(popupEdit);
    })
    .catch(err => console.log(err))
    .finally(() => {
      updateBtnText(popupEditSaveBtn, 'Сохранить');
    });
};

//обновление аватара

function handleUpdateAvatar(evt) {
  evt.preventDefault();
  updateBtnText(popupUpdateAvatarSaveBtn, 'Сохранение...');
  updateAvatarOnServer(avatarUrlInput.value)
    .then((res)=> {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupUpdateAvatar);
      popupUpdateAvatarForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      updateBtnText(popupUpdateAvatarSaveBtn, 'Сохранить')
    });
};

//добавление карточки

function handleFormNewCard(evt) {
  evt.preventDefault();
  updateBtnText(popupNewCardSaveBtn, 'Сохранение...')
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };

  pushNewCard(newCard)
    .then((res) => {
      cardsContainer.prepend(createCard(res, userId, cloneTemplate, handleDeleteCard, openPopupImg));
      closePopup(popupNewCard);
      newCardForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      updateBtnText(popupNewCardSaveBtn, 'Сохранить')
    });
};

// открытие картинки в модальном окне

function openPopupImg(evt){
  const card = evt.target.closest('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  image.src = cardImage.src; 
  image.alt = cardImage.alt; 
  imageCaption.textContent = cardTitle.textContent; 
  openPopup(popupImg);
};

//изменение текста кнопки сохранения

function updateBtnText (button, text) {
  button.textContent = text
};

//удаление карточки (обработка сабмита формы удаления карточки)

const handleDeleteCard = (cardId, cardElement) => {
  submitFormConfirm = () => {
  cardDeleteSubmitBtn.textContent = 'Удаление...';
  deleteCardData(cardId)
    .then(() => {
      handleDeleteCardClick(cardElement);
      closePopup(popupConfirmDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardDeleteSubmitBtn.textContent = 'Да';
    })
  };

  openPopup(popupConfirmDeleteCard);
};