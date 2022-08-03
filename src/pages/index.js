import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  nameFieldElement, occupationFieldElement, profileButtonEdit, newCardButton,
  popupProfileForm, popupAddingForm, cardFormElement, selectors,
  initialCards
} from '../utils/constants.js';


function renderCard(item, popupSelector) {
  const card = new Card(item, popupSelector, handleCardCklick);

  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
}

////////////////////      Валидация форм    /////////////////////////////

const validationProfile = new FormValidator(selectors, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(selectors, popupAddingForm);
validationCard.enableValidation();

////// Отрисовка первоначального массива карточек  ////////////////////////

const cardsSection = new Section({
  data: initialCards,
  renderer: (item) => {
    renderCard(item, '.elements-template_type_default');
  }
}, '.elements__grid');

cardsSection.renderItems();

//////////////  Обработка увеличенной карточки  ///////////////////////////

const popupWithImage = new PopupWithImage('.popup_type_picture');
function handleCardCklick(name, link) {
  popupWithImage.open(link, name);
}

///////////   Обработка формы добавления карточки   //////////////////////

const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_adding-form',
  handleFormSubmit: (cardData) => {

    const currentData = {
      name: cardData['adding-form-title'],
      link: cardData['adding-form-link']
    };

    renderCard(currentData, '.elements-template_type_default');
    popupWithAddForm.close();
  }
});

popupWithAddForm.setEventListeners();

newCardButton.addEventListener('click', function () {
  validationCard.resetValidation();
  cardFormElement.reset();
  popupWithAddForm.open();
  validationCard.toggleButtonState();
});

///////  Обработка формы добавления информации о путешественнике  ///////

const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_ocupation');
const popupWithProfileForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-form',
  handleFormSubmit: (cardData) => {

    const currentData = {
      name: cardData['profile-form-name'],
      description: cardData['profile-form-ocupation']
    };

    userInfo.setUserInfo(currentData);

    popupWithProfileForm.close();
  }
});

popupWithProfileForm.setEventListeners();

profileButtonEdit.addEventListener('click', function () {
  validationProfile.resetValidation();
  const userProfile = userInfo.getUserInfo();
  nameFieldElement.value = userProfile.name;
  occupationFieldElement.value = userProfile.description;
  popupWithProfileForm.open();
});

