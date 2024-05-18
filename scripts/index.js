const cardsContainer = document.querySelector('.places__list');

function createCard (card, deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;//т.к. в массиве отсутствует описание alt для каждой картинки
  cardElement.querySelector('.card__title').textContent = card.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  
  return cardElement;
};

function deleteCard(event){
  const deleteButtonActive = event.target;
  const cardDelete = deleteButtonActive.closest('.card');
  cardDelete.remove();
};

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  cardsContainer.append(cardElement);
});