import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileNameElement = document.querySelector('.profile__text_type_name');
const nameFieldElement = document.querySelector('.popup__input_type_name');

const profileOccupationElement = document.querySelector('.profile__text_type_ocupation');
const occupationFieldElement = document.querySelector('.popup__input_type_ocupation');

const profileFormElement = document.querySelector('.profile-form');

const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const closeProfileButton = document.querySelector('.profile-form-close');
const closeAddingFormButton = document.querySelector('.adding-form-close');

const closePictureFormButton = document.querySelector('.picture-close');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupAddingForm = document.querySelector('.popup_type_adding-form');
const popupPicture = document.querySelector('.popup_type_picture');

const cardFormElement = document.querySelector('.adding-form');
const cardInputTitle = document.querySelector('.popup__input_type_title');
const cardInputLink = document.querySelector('.popup__input_type_link');

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

function checkCloseConditions(e) {
  if (e.target.closest('.popup__content') === null) {
    popupCloses(e.target.closest('.popup'));
  }
}

function keyHandler(e) {
  popups.forEach(popup => {
    if (e.key === 'Escape' && popup.classList.contains('popup_opened')) {
      popupCloses(popup);
    }
  });
}
// или то же самое через замыкание:
// function keyHandler(popup) {
//   return function (e) {
//     if (e.key === 'Escape') {
//       popupCloses(popup);
//     }
//   };
// }

function popupOpen(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', checkCloseConditions); // при закрытии сниму слушатели
  document.addEventListener('keydown', keyHandler);
  // document.addEventListener('keydown', keyHandler(popup));
}

function popupCloses(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  popup.removeEventListener('click', checkCloseConditions);
} ///  снимаю слушатели чтобы не прописывать в каждом попапе

function openProfileForm() {
  validationProfile.resetValidation();
  profileFormElement.reset();
  nameFieldElement.value = profileNameElement.textContent;
  occupationFieldElement.value = profileOccupationElement.textContent;
  popupOpen(popupProfileForm);
  validationProfile.toggleButtonState();
  // popupProfileForm.addEventListener('click', checkCloseConditions);
  // document.addEventListener('keydown', keyHandler);
}

function saveProfileText() {
  profileNameElement.textContent = nameFieldElement.value;
  profileOccupationElement.textContent = occupationFieldElement.value;
  popupCloses(popupProfileForm);
}

export function handlePreviewImage(name, link) {
  const popupPictureElement = document.querySelector('.popup__picture');
  popupPictureElement.src = link;
  popupPictureElement.alt = name;
  const popupPictureCaptionElement = document.querySelector('.popup__caption');
  popupPictureCaptionElement.textContent = name;
  popupOpen(popupPicture);
  // popupPicture.addEventListener('click', checkCloseConditions);
  // document.addEventListener('keydown', keyHandler);
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
    popupCloses(popupAddingForm);
};
////////////////////////////////////////////////////////////////////////

initialCards.forEach(item => {
  renderCard(item, '.elements-template_type_default');
});

newCardButton.addEventListener('click', function () {
  validationCard.resetValidation();
  cardFormElement.reset();
  popupOpen(popupAddingForm);
  validationCard.toggleButtonState();
  // popupAddingForm.addEventListener('click', checkCloseConditions);
  // document.addEventListener('keydown', keyHandler);
});

editProfileButton.addEventListener('click', openProfileForm);

closeProfileButton.addEventListener('click', function () {
  popupCloses(popupProfileForm);
});

closeAddingFormButton.addEventListener('click', function () {
  popupCloses(popupAddingForm);
});

closePictureFormButton.addEventListener('click', function () {
  popupCloses(popupPicture);
});

profileFormElement.addEventListener('submit', saveProfileText);

cardFormElement.addEventListener('submit', handleCardAddingSubmit);

/////////////////////////////////////////////////////////////////////////




