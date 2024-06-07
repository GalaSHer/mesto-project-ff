
// открытие модальных окон
export function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupBtn);
  popup.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
};

// закрытие модальных окон
export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupBtn);
  popup.removeEventListener('mousedown', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
};

function closePopupBtn(evt) {
  if (evt.target.classList.contains('popup__close')) {
    const closestPopup = evt.target.closest('.popup');
    closePopup(closestPopup);
  };
};

function closePopupOverlay(evt){
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
