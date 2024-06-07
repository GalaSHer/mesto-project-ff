import '../pages/index.css';
import {initialCards} from './cards.js';
import {cloneTemplate, createCard, deleteCard, likeCard} from './card.js';
import { openPopup, closePopup } from './modal.js';

// переменные 
const cardsContainer = document.querySelector('.places__list');
const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_description');

const newCardButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = popupNewCard.querySelector('.popup__input_type_url');

const popupImg = document.querySelector('.popup_type_image');
const image = popupImg.querySelector('.popup__image');
const imageCaption = popupImg.querySelector('.popup__caption');

//слушатели событий 

editButton.addEventListener('click', handleEditForm);
newCardButton.addEventListener('click', openPopupNewCard);
popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupNewCard.addEventListener('submit', handleFormNewCard);

// отображение начальных карточек на странице

initialCards.forEach((card) => {
  const cardElement = createCard(card, cloneTemplate, deleteCard, likeCard, openPopupImg);
  cardsContainer.append(cardElement);
});

//редактирование профиля

function handleEditForm() {
  nameInput.value = personName.textContent;
  jobInput.value = personDescription.textContent;
  openPopup(popupEdit);
};

function handleEditFormSubmit(evt) {
  evt.preventDefault(); 
  personName.textContent = nameInput.value;
  personDescription.textContent = jobInput.value;
  closePopup(popupEdit);
};

//добавление карточки

 function openPopupNewCard() {
  openPopup(popupNewCard);
};

function handleFormNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  cardsContainer.prepend(createCard(newCard,cloneTemplate, deleteCard, likeCard, openPopupImg));
  closePopup(popupNewCard);
  newCardForm.reset();
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