(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t){var n=e.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__image"),o=n.querySelector(".card__title");return r.src=t.link,r.alt=t.name,o.textContent=t.name,n}function n(e,t,n,r,o){var c=t(e),p=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__image");return p.addEventListener("click",n),u.addEventListener("click",r),a.addEventListener("click",o),c}function r(e){e.target.closest(".card").remove()}function o(e){e.target.classList.toggle("card__like-button_is-active")}function c(e){e.classList.add("popup_is-opened"),e.addEventListener("click",u),e.addEventListener("mousedown",a),document.addEventListener("keydown",d)}function p(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",u),e.removeEventListener("mousedown",a),document.removeEventListener("keydown",d)}function u(e){e.target.classList.contains("popup__close")&&p(e.target.closest(".popup"))}function a(e){e.target.classList.contains("popup")&&p(document.querySelector(".popup_is-opened"))}function d(e){"Escape"===e.key&&p(document.querySelector(".popup_is-opened"))}var s=document.querySelector(".places__list"),i=document.querySelector(".profile__title"),l=document.querySelector(".profile__description"),_=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),y=m.querySelector(".popup__form"),v=m.querySelector(".popup__input_type_name"),f=m.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),S=q.querySelector(".popup__form"),g=q.querySelector(".popup__input_type_card-name"),L=q.querySelector(".popup__input_type_url"),E=document.querySelector(".popup_type_image"),x=E.querySelector(".popup__image"),h=E.querySelector(".popup__caption");function b(e){var t=e.target.closest(".card"),n=t.querySelector(".card__image"),r=t.querySelector(".card__title");x.src=n.src,x.alt=n.alt,h.textContent=r.textContent,c(E)}_.addEventListener("click",(function(){v.value=i.textContent,f.value=l.textContent,c(m)})),k.addEventListener("click",(function(){c(q)})),y.addEventListener("submit",(function(e){e.preventDefault(),i.textContent=v.value,l.textContent=f.value,p(m)})),q.addEventListener("submit",(function(e){e.preventDefault();var c={name:g.value,link:L.value};s.prepend(n(c,t,r,o,b)),p(q),S.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var c=n(e,t,r,o,b);s.append(c)}))})();