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

const popupPictureElement = document.querySelector('.popup__picture');
const popupPictureCaptionElement = document.querySelector('.popup__caption');

const elementsGridElement = document.querySelector('.elements__grid');
const cardFormElement = document.querySelector('.adding-form');
const cardInputTitle = document.querySelector('.popup__input_type_title');
const cardInputLink = document.querySelector('.popup__input_type_address');
const cardTemplateElement = document.querySelector('.elements-template');
const getElementByEvent = e => e.currentTarget.closest('.element');


function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function popupCloses(popup) {
  popup.classList.remove('popup_opened');
}

function openProfileForm() {
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

  function handlePreviewImage() {
    popupPictureElement.src = cardData.link;
    popupPictureElement.alt = cardData.name;
    popupPictureCaptionElement.textContent = cardData.name;
    popupOpen(popupPicture);
  }

  cardElementLink.addEventListener('click', function () {
    handlePreviewImage();
  });

  return cardElement;
};

const addCardElement = (cardData) => {
  const cardElement = createCard(cardData);

  elementsGridElement.prepend(cardElement);
};

initialCards.forEach((item) => {
  addCardElement(item);
});

const handleCardAddingSubmit = e => {
  e.preventDefault();
  const cardData = {
      name: cardInputTitle.value,
      link: cardInputLink.value
    };

  addCardElement(cardData);
  cardFormElement.reset();
  popupCloses(popupAddingForm);
};


editNewCardButton.addEventListener('click', function () {
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

