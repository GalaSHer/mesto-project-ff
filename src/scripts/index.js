import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, cardLike} from './card.js';
import { openPopupEdit, openPopupNewCard, openPopupImg, 
  closePopup, closePopupBtn, closePopupOverlay } from './modal.js';

// переменные 

const page = document.querySelector('.page');
const cardsContainer = document.querySelector('.places__list');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImg = document.querySelector('.popup_type_image');
const formElement = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

//слушатели событий 

editButton.addEventListener('click', openPopupEdit);
newCardButton.addEventListener('click', openPopupNewCard);
cardsContainer.addEventListener('click', openPopupImg);
cardsContainer.addEventListener('click', cardLike);
page.addEventListener('click', closePopupBtn);
page.addEventListener('click', closePopupOverlay);
editButton.addEventListener('click', handleFormDescription);
formElement.addEventListener('submit', handleFormSubmit);
popupNewCard.addEventListener('submit', handleFormAddCard);

// отображение начальных карточек на странице

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  cardsContainer.append(cardElement);
});

//редактирование профиля

function handleFormDescription(evt) {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const personName = document.querySelector('.profile__title');
  const personDecription = document.querySelector('.profile__description');
  personName.textContent = nameInput.value;
  personDecription.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
};

//добавление карточки

function createNewCard() {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardUrlInput.value;
  cardElement.querySelector('.card__image').alt = cardNameInput.value;
  cardElement.querySelector('.card__title').textContent = cardNameInput.value;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
};

function handleFormAddCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCard());
  closePopup(evt.target.closest('.popup'));
  cardUrlInput.value = '';
  cardNameInput.value = '';
};
