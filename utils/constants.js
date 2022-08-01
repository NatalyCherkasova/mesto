const nameFieldElement = document.querySelector('.popup__input_type_name');

const occupationFieldElement = document.querySelector('.popup__input_type_ocupation');

const profileButtonEdit = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupAddingForm = document.querySelector('.popup_type_adding-form');

const cardFormElement = document.querySelector('.adding-form');

const popupCloseButton = document.querySelector('.popup__close');

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  nameFieldElement, occupationFieldElement, profileButtonEdit,
  newCardButton, popupProfileForm, popupAddingForm,
  cardFormElement, popupCloseButton, selectors,
  initialCards
};

