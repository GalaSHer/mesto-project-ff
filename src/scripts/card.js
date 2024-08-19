import { deleteCardData, pushCardLike, deleteCardLike } from './api.js';

// создание карточки

const cardTemplate = document.querySelector('#card-template').content;

export function cloneTemplate(card){
  const cardForm = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardForm.querySelector('.card__image');
  const cardTitle = cardForm.querySelector('.card__title');
  
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  return cardForm;
};

export function createCard (card, userId, cloneTemplate, handleDeleteCard, openPopupImg){
  const cardElement = cloneTemplate(card);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImg = cardElement.querySelector('.card__image');
  const likeNumber = cardElement.querySelector('.card__like-counter');
    
  if(userId === card.owner._id){
    deleteButton.addEventListener('click', ()=> {handleDeleteCard(card._id, cardElement)});
  } else {
    deleteButton.classList.toggle('card__delete-button-inactive');
  };

  if(card.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };

  likeButton.addEventListener('click', (evt) => {likeCallback(evt, card, likeNumber)});

  cardImg.addEventListener('click', openPopupImg);
  countLikes(card, likeNumber);
  return cardElement;
};

//удаление карточки из верстки

export const handleDeleteCardClick = (cardElement) => {
  cardElement.remove();
};

//окрашивание лайка карточки

function handleCardLike(button) {
  button.classList.toggle('card__like-button_is-active');
};

//счетчик лайков

function countLikes(card, likeNumber){
  likeNumber.textContent = card.likes.length;
};

//обработка лайка карточки

function likeCallback(evt, card, likeNumber){ 
  const likeMethod =  evt.target.classList.contains('card__like-button_is-active') ?  deleteCardLike : pushCardLike;
  likeMethod(card._id) 
    .then((updatedCard) => { 
      handleCardLike(evt.target); 
      countLikes(updatedCard, likeNumber); 
    })
   .catch(err => console.log(err))
};
