const profileNameElement = document.querySelector('.profile__text_type_name');
const nameFieldElement = document.querySelector('.popup__input_type_name');

const profileOccupationElement = document.querySelector('.profile__text_type_ocupation');
const occupationFieldElement = document.querySelector('.popup__input_type_ocupation');

const profileFormElement = document.querySelector('.profile-form');

const editProfileButton = document.querySelector('.profile__edit-button');
const editNewCardButton = document.querySelector('.profile__add-button');

const closeProfileButton = document.querySelector('.profile-form-close');
const closeAddingFormButton = document.querySelector('.adding-form-close');

const closePictureFormButton = document.querySelector('.picture-close');

const popupProfileForm = document.querySelector('.popup_type_profile-form');
const popupAddingForm = document.querySelector('.popup_type_adding-form');
const popupPicture = document.querySelector('.popup_type_picture');

function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function popupCloses(popup) {
  popup.classList.remove('popup_opened');
}

// function togglePopup(p) {
//   p.classList.("popup_opened");
// }

editNewCardButton.addEventListener('click', function () {
  popupOpen(popupAddingForm);
});

editProfileButton.addEventListener('click', function () {
  popupOpen(popupProfileForm);
  nameFieldElement.value = profileNameElement.textContent;
  occupationFieldElement.value = profileOccupationElement.textContent;
});

closeProfileButton.addEventListener('click', function () {
  popupCloses(popupProfileForm);
});

closeAddingFormButton.addEventListener('click', function () {
  popupCloses(popupAddingForm);
});

closePictureFormButton.addEventListener('click', function () {
  popupCloses(popupPicture);
});

profileFormElement.addEventListener('submit', function (event) {
  event.preventDefault();
  profileNameElement.textContent = nameFieldElement.value;
  profileOccupationElement.textContent = occupationFieldElement.value;
  popupCloses(popupProfileForm);
});

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

const ZoomedElement = document.querySelector('.popup__picture-cover');
const popupPictureElement = document.querySelector('.popup__picture');
const popupPictureCaptionElement = document.querySelector('.popup__caption');

const elementsGridElement = document.querySelector('.elements__grid');
const elementsAddingElement = document.querySelector('.adding-form');
const elementsInputElement = document.querySelector('.popup__input_type_title');
const addressFieldElement = document.querySelector('.popup__input_type_address');
const elementsTemplateElement = document.querySelector('.elements-template');
const getElementByEvent = e => e.currentTarget.closest('.element');

const createElement = (title, address) => {
  let element = elementsTemplateElement.content
    .querySelector('.element')
    .cloneNode(true);

  element.querySelector('.element__title').textContent = title;
  element.querySelector('.element__image').src = address;

  element.querySelector('.element__like').addEventListener('click', e => {
    const eventTarget = e.currentTarget;
    eventTarget.classList.toggle('element__like_active');
  });

  element.querySelector('.element__basket').addEventListener('click', e => {
    element = getElementByEvent(e);

    element.remove();

  });

  function zoomImagePopup(e) {
    const currentElement = getElementByEvent(e);
    popupPictureElement.src = currentElement.querySelector('.element__image').src;
    popupPictureElement.alt = currentElement.querySelector('.element__title').textContent;
    popupPictureCaptionElement.textContent = currentElement.querySelector('.element__title').textContent;
  }

  element.querySelector('.element__image').addEventListener('click', e => {
    popupOpen(popupPicture);
    zoomImagePopup(e);
  });

  return element;
};

const addElement = (title, address) => {
  const element = createElement(title, address);

  elementsGridElement.prepend(element);
};

initialCards.forEach((item) => {
  addElement(item.name, item.link);
});

const handleAddingSubmit = e => {
  e.preventDefault();
  const text = elementsInputElement.value;
  const link = addressFieldElement.value;
  addElement(text, link);
  elementsAddingElement.reset();
  popupCloses(popupAddingForm);
};

elementsAddingElement.addEventListener('submit', handleAddingSubmit);

