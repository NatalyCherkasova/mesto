const profileNameElement = document.querySelector('.profile__text_type_name');
const nameFieldElement = document.querySelector('.popup__input_type_name');

const profileOccupationElement = document.querySelector('.profile__text_type_ocupation');
const occupationFieldElement = document.querySelector('.popup__input_type_ocupation');

const profileFormElement = document.querySelector('.profile-form');

const profileButtonEdit = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupAddingForm = document.querySelector('.popup_type_adding-form');
const popupPicture = document.querySelector('.popup_type_picture');

const cardFormElement = document.querySelector('.adding-form');
const cardInputTitle = document.querySelector('.popup__input_type_title');
const cardInputLink = document.querySelector('.popup__input_type_link');

const popupPictureElement = document.querySelector('.popup__picture');
const popupPictureCaptionElement = document.querySelector('.popup__caption');

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelector('.popup__close');

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const inputList = Array.from(popupProfileForm.querySelectorAll(selectors.inputSelector));

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

export { profileNameElement, nameFieldElement, profileOccupationElement, occupationFieldElement,
  profileFormElement, profileButtonEdit, newCardButton, popupProfileForm, popupAddingForm, popupPicture,
  cardFormElement, cardInputTitle, cardInputLink, popupPictureElement, popupPictureCaptionElement, popup,
  popups, popupCloseButton, selectors, initialCards };
