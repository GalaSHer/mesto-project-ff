import { popupEdit, popupNewCard, popupImg } from './index.js';

// открытие модальных окон

function openPopup(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
};

export function openPopupEdit(evt) {
  openPopup(popupEdit);
};

export function openPopupNewCard(evt) {
  openPopup(popupNewCard);
};

function createPopupImg(card, popup){
  popup.querySelector('.popup__image').src = card.querySelector('.card__image').src;
  popup.querySelector('.popup__image').alt = card.querySelector('.card__image').alt;
  popup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
  return popup;
}

export function openPopupImg(evt) {
  if (evt.target.classList.contains('card__image')) {
     createPopupImg(evt.target.closest('.card'), popupImg);
     openPopup(popupImg);
  };
};

// закрытие модальных окон

export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
};

export function closePopupBtn(evt) {
  if (evt.target.classList.contains('popup__close')) {
    const closestPopup = evt.target.closest('.popup');
    closePopup(closestPopup);
  };
};

export function closePopupOverlay(evt){
  if (evt.target.classList.contains('popup')) {
    const closestPopup = document.querySelector('.popup_is-opened');
    closePopup(closestPopup);
  };
};

function closePopupEsc(evt) {
  if (evt.key === 'Escape'){
    const closestPopup = document.querySelector('.popup_is-opened');
    closePopup(closestPopup);
  };
};
