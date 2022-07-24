import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";

import { profileNameElement, nameFieldElement, profileOccupationElement, occupationFieldElement,
  profileFormElement, profileButtonEdit, newCardButton, popupProfileForm, popupAddingForm, popupPicture,
  cardFormElement, cardInputTitle, cardInputLink, popupPictureElement, popupPictureCaptionElement,
  popups, selectors, initialCards } from '../utils/constants.js';

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

function closeByOverlay() {
  popups.forEach(popup => {
    popup.addEventListener('click', e => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
    });
  });
}

function keyHandler(e) {
    if (e.key === 'Escape') {
      const currentPopup = document.querySelector('.popup_opened');
      closePopup(currentPopup);
    }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function openProfileForm() {
  validationProfile.resetValidation();
  profileFormElement.reset();
  nameFieldElement.value = profileNameElement.textContent;
  occupationFieldElement.value = profileOccupationElement.textContent;
  openPopup(popupProfileForm);
  validationProfile.toggleButtonState();
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
}

// function renderCard(data, cardSelector) {
//   const cardItem = new Card(data, cardSelector);
//   const cardElement = cardItem.generateCard();
//   document.querySelector('.elements__grid').prepend(cardElement);
// }

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

const Cards = new Section({data:initialCards,
  renderer: (item) => {
    const card =  new Card(item, '.elements-template_type_default');

    const cardElement = card.generateCard();

    Cards.setItem(cardElement);} }, '.elements__grid');


// }, '.elements__grid');
Cards.renderItems();
// initialCards.forEach(item => {
//   renderCard(item, '.elements-template_type_default');
// });

newCardButton.addEventListener('click', function () {
  validationCard.resetValidation();
  cardFormElement.reset();
  openPopup(popupAddingForm);
  validationCard.toggleButtonState();
});

profileButtonEdit.addEventListener('click', openProfileForm);

profileFormElement.addEventListener('submit', saveProfileText);

cardFormElement.addEventListener('submit', handleCardAddingSubmit);

closeByOverlay();

/////////////////////////////////////////////////////////////////////////




