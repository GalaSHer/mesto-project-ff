import { openPopupImg } from "./modal.js";

// создание карточки

export function createCard (card, deleteCard, cardLike, openPopupImg){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  
  return cardElement;
};

//удаление карточки
export function deleteCard(evt){
  const deleteButtonActive = evt.target;
  const cardDelete = deleteButtonActive.closest('.card');
  cardDelete.remove();
};

//лайк карточки

export function cardLike(evt){
  if(evt.target.classList.contains('card__like-button')) {
  evt.target.classList.toggle('card__like-button_is-active');
  };
};
