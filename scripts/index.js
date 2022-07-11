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

const popupPictureElement = document.querySelector('.popup__picture');
const popupPictureCaptionElement = document.querySelector('.popup__caption');

const elementsGridElement = document.querySelector('.elements__grid');
const cardFormElement = document.querySelector('.adding-form');
const cardInputTitle = document.querySelector('.popup__input_type_title');
const cardInputLink = document.querySelector('.popup__input_type_link');
const cardTemplateElement = document.querySelector('.elements-template');

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

function checkCloseConditions(e) {
  if (e.target.closest('.popup__content') === null) {
    popupCloses(e.target.closest('.popup'));
  }
}

function keyHandler(e) {
  popups.forEach(popup => {
    if (e.key === 'Escape') {
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
  popup.addEventListener('click', checkCloseConditions);
  document.addEventListener('keydown', keyHandler);
  // document.addEventListener('keydown', keyHandler(popup));
}

function popupCloses(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function openProfileForm() {
  inputList.forEach((inputElement) => {
    hideInputError(popupProfileForm, inputElement, selectors);
  });
  nameFieldElement.value = profileNameElement.textContent;
  occupationFieldElement.value = profileOccupationElement.textContent;
  popupOpen(popupProfileForm);
}

function saveProfileText(e) {
  e.preventDefault();
  profileNameElement.textContent = nameFieldElement.value;
  profileOccupationElement.textContent = occupationFieldElement.value;
  popupCloses(popupProfileForm);
}

function handlePreviewImage(cardData) {
  popupPictureElement.src = cardData.link;
  popupPictureElement.alt = cardData.name;
  popupPictureCaptionElement.textContent = cardData.name;
  popupOpen(popupPicture);
}

const createCard = (cardData) => {
  const cardElement = cardTemplateElement.content
    .querySelector('.element')
    .cloneNode(true);


  const likeButton = cardElement.querySelector('.element__like');
  const cardElementLink = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = cardData.name;
  cardElementLink.src = cardData.link;

  likeButton.addEventListener('click', e => {
    const eventTarget = e.currentTarget;
    eventTarget.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__basket').addEventListener('click', function () {

    cardElement.remove();

  });

  cardElementLink.addEventListener('click', function () {
    handlePreviewImage(cardData);
  });

  return cardElement;
};

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);

  elementsGridElement.prepend(cardElement);
};

initialCards.forEach((item) => {
  renderCard(item);
});

const handleCardAddingSubmit = e => {
  e.preventDefault();

    const cardData = {
      name: cardInputTitle.value,
      link: cardInputLink.value
    };

    renderCard(cardData);
    cardFormElement.reset();
    const buttonElement = popupAddingForm.querySelector(selectors.submitButtonSelector);
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
    popupCloses(popupAddingForm);
};


newCardButton.addEventListener('click', function () {
  popupOpen(popupAddingForm);
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


enableValidation(selectors);

