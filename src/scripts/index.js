import '../pages/index.css';
import {cloneTemplate, createCard, handleCardLike, countLikes } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { validationConfig, enableValidation, clearValidation} from './validation.js';
import { getUserInfo, getInitialCards, pushUserInfo, pushNewCard, deleteCardData, 
  pushCardLike, deleteCardLike, updateAvatarOnServer } from './api.js';

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

// отображение начальных данных на странице

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    personName.textContent = userData.name;
    personDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
      
    initialCards.forEach((card) => {
     const cardElement = createCard(card, userId, cloneTemplate, deleteCard, likeCard, 
      removeCardLike, openPopupImg, countLikes);
     cardsContainer.append(cardElement);
    });
  })

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
  personName.textContent = nameInput.value;
  personDescription.textContent = jobInput.value;
  closePopup(popupEdit);
  pushUserInfo()
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
      profileImage.style.backgroundImage = `url(${res.avatar})`
    })
    .then(()=> {
      closePopup(popupUpdateAvatar)
    })
    .then(()=>{
      popupUpdateAvatarForm.reset()
    })
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
        cardsContainer.prepend(createCard(res, userId, cloneTemplate, deleteCard, likeCard, 
        removeCardLike, openPopupImg, countLikes))
    })
    .then(() => {
      closePopup(popupNewCard)
    })
    .then(() => {
      newCardForm.reset()
    })
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

//удаление карточки

function deleteCard(evt, cardId){
  const cardDelete = evt.target.closest('.card');
  deleteCardData(cardId)
     .then(()=> {
        cardDelete.remove()
      });
};

//лайк карточки

function likeCard(evt, card, likeNumber){
  const likeButtonActive = evt.target;
  pushCardLike(card._id)
    .then((updatedCard) => {
      handleCardLike(likeButtonActive);
      countLikes(updatedCard, likeNumber);
    })
};

//снять лайк с карточки

function removeCardLike(evt, card, likeNumber) {
  const likeButtonActive = evt.target;
  deleteCardLike(card._id)
    .then((updatedCard) => {
      handleCardLike(likeButtonActive);
      countLikes(updatedCard, likeNumber);
    })
};

//изменение текста кнопки сохранения

function updateBtnText (button, text) {
  button.textContent = text
};