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

export function createCard (card, userId, cloneTemplate, deleteCard, likeCard, removeCardLike, openPopupImg, countLikes){
  const cardElement = cloneTemplate(card);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImg = cardElement.querySelector('.card__image');
  const likeNumber = cardElement.querySelector('.card__like-counter');
    
  if(userId === card.owner._id){
    deleteButton.addEventListener('click', (evt)=> {deleteCard(evt, card._id)});
  } else {
    deleteButton.classList.toggle('card__delete-button-inactive');
  };

  if(card.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };

  likeButton.addEventListener('click', (evt) => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      removeCardLike(evt, card, likeNumber);
    } else {
      likeCard(evt, card, likeNumber);
    }
  });

  cardImg.addEventListener('click', openPopupImg);
  countLikes(card, likeNumber);
  return cardElement;
};
