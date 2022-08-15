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


export {
  nameFieldElement, occupationFieldElement, profileButtonEdit,
  newCardButton, popupProfileForm, popupAddingForm,
  cardFormElement, popupCloseButton, selectors
};

