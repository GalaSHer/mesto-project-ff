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

export function createCard (card, cloneTemplate, deleteCard, likeCard, openPopupImg){
  const cardElement = cloneTemplate(card);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImg = cardElement.querySelector('.card__image');
  
  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardImg.addEventListener('click', openPopupImg);
  return cardElement;
};

//удаление карточки
export function deleteCard(evt){
  const deleteButtonActive = evt.target;
  const cardDelete = deleteButtonActive.closest('.card');
  cardDelete.remove();
};

//лайк карточки
export function likeCard(evt){
  const likeButtonActive = evt.target;
  likeButtonActive.classList.toggle('card__like-button_is-active');
};
