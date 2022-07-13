import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileNameElement = document.querySelector('.profile__text_type_name');
const nameFieldElement = document.querySelector('.popup__input_type_name');

const profileOccupationElement = document.querySelector('.profile__text_type_ocupation');
const occupationFieldElement = document.querySelector('.popup__input_type_ocupation');

const profileFormElement = document.querySelector('.profile-form');

const profileButtonEdit = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const profileButtonClose = document.querySelector('.profile-form-close');
const addingFormButtonClose = document.querySelector('.adding-form-close');

const pictureFormButtonClose = document.querySelector('.picture-close');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupAddingForm = document.querySelector('.popup_type_adding-form');
const popupPicture = document.querySelector('.popup_type_picture');

const cardFormElement = document.querySelector('.adding-form');
const cardInputTitle = document.querySelector('.popup__input_type_title');
const cardInputLink = document.querySelector('.popup__input_type_link');

const popupPictureElement = document.querySelector('.popup__picture');
const popupPictureCaptionElement = document.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

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

const validationProfile = new FormValidator(selectors, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(selectors, popupAddingForm);
validationCard.enableValidation();

/////////////////////////////////////////////////////////////////////////

// function closeByOverlay(e) {
//   if ((e.target.closest('.popup__content') === null) && (e.target.closest('.popup__picture-cover') === null)) {
//     closePopup(e.target.closest('.popup'));
//   }
// }

// Исправила предыдущую функцию, теперь она работает, но сделала, как ты предложил, прикольный вариант, спасибо!

function closeByOverlay() {
  popups.forEach(popup => {
    popup.addEventListener('click', e => {
      if (e.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  });
}

function keyHandler(e) {
  const currentPopup = document.querySelector('.popup_opened');
    if (e.key === 'Escape') {
      closePopup(currentPopup);
    }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfileForm() {
  validationProfile.resetValidation();
  profileFormElement.reset();
  nameFieldElement.value = profileNameElement.textContent;
  occupationFieldElement.value = profileOccupationElement.textContent;
  openPopup(popupProfileForm);
  validationProfile.toggleButtonState();
  // popupProfileForm.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', keyHandler);
}

function saveProfileText() {
  profileNameElement.textContent = nameFieldElement.value;
  profileOccupationElement.textContent = occupationFieldElement.value;
  closePopup(popupProfileForm);
}

export function handlePreviewImage(name, link) {
  popupPictureElement.src = link;
  popupPictureElement.alt = name;
  popupPictureCaptionElement.textContent = name;
  openPopup(popupPicture);
  // popupPicture.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', keyHandler);
}

function renderCard(data, cardSelector) {
  const cardItem = new Card(data, cardSelector);
  const cardElement = cardItem.generateCard();
  document.querySelector('.elements__grid').prepend(cardElement);
}

const handleCardAddingSubmit = e => {
  e.preventDefault();

    const cardData = {
      name: cardInputTitle.value,
      link: cardInputLink.value
    };

    renderCard(cardData, '.elements-template_type_default');
    cardFormElement.reset();
    validationCard.toggleButtonState();
    closePopup(popupAddingForm);
};

////////////////////////////////////////////////////////////////////////

initialCards.forEach(item => {
  renderCard(item, '.elements-template_type_default');
});

newCardButton.addEventListener('click', function () {
  validationCard.resetValidation();
  cardFormElement.reset();
  openPopup(popupAddingForm);
  validationCard.toggleButtonState();
  // popupAddingForm.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', keyHandler);
});

profileButtonEdit.addEventListener('click', openProfileForm);

profileButtonClose.addEventListener('click', function () {
  closePopup(popupProfileForm);
});

addingFormButtonClose.addEventListener('click', function () {
  closePopup(popupAddingForm);
});

pictureFormButtonClose.addEventListener('click', function () {
  closePopup(popupPicture);
});

profileFormElement.addEventListener('submit', saveProfileText);

cardFormElement.addEventListener('submit', handleCardAddingSubmit);

closeByOverlay();

/////////////////////////////////////////////////////////////////////////




