import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupWithDeleteForm from '../components/PopupWithDeleteForm.js';

import {
  nameFieldElement, occupationFieldElement, profileButtonEdit, newCardButton,
  popupProfileForm, popupAddingForm, popupAvatarForm, cardFormElement, avatarFormElement, selectors
} from '../utils/constants.js';

export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', 'e113d756-181d-4d20-b2e1-8221892630a4');
export let userId;

function renderCard(item, popupSelector) {
  const card = new Card(item, popupSelector, handleCardCklick, handleDeleteCard);
  return card.generateCard();
}

////////////////////      Валидация форм    /////////////////////////////

const validationProfile = new FormValidator(selectors, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(selectors, popupAddingForm);
validationCard.enableValidation();

const validationAvatar = new FormValidator(selectors, popupAvatarForm);
validationAvatar.enableValidation();

////// Отрисовка первоначального массива карточек  ////////////////////////

const cardsSection = new Section(
  (item) => {
    return renderCard(item, '.elements-template_type_default');

  }, '.elements__grid');

api.getInitialCards()
  .then((initialCards) => {
    cardsSection.renderItems(initialCards);
  });

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

    api.addNewCard(currentData)
      .then((data) => {
        cardsSection.renderItems([data]);
      });

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

api.getProfileInfo()
  .then((userData) => {
    document.querySelector('.profile__text_type_name').textContent = userData.name;
    document.querySelector('.profile__text_type_ocupation').textContent = userData.about;
    document.querySelector('.profile__avatar').src = userData.avatar;
    userId = userData._id;
  });

const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_ocupation');
const popupWithProfileForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-form',
  handleFormSubmit: (cardData) => {

    const currentData = {
      name: cardData['profile-form-name'],
      description: cardData['profile-form-ocupation']
    };

    api.setProfileInfo(currentData);

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

/////////////////////  Обработка лайков  /////////////////////////////


/////////////////////  Удаление карточек  ////////////////////////////



const delitingForm = new PopupWithDeleteForm('.popup_type_delete-card-form', handlerDeleteCard);

function handleDeleteCard(cardElement, currentCardId) {
  delitingForm.open(cardElement, currentCardId);
}

function handlerDeleteCard(cardElement, currentCardId) {
  api.deleteCard(currentCardId)
  .then(() => {
    cardElement.remove();
    cardElement = null;
  })
  .catch((err) =>
    console.log(err));
}

delitingForm.setEventListeners();

/////////////////////  Редактирование аватара  ////////////////////////////

document.querySelector('.profile__avatar').addEventListener('mouseover', function () {
  document.querySelector('.profile__avatar-load-button-cover')
  .classList.add('profile__avatar-load-button-cover_visible');
});

document.querySelector('.profile__avatar').addEventListener('mouseout', function () {
  document.querySelector('.profile__avatar-load-button-cover')
  .classList.remove('profile__avatar-load-button-cover_visible');
});

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar-form',
  handleFormSubmit: (cardData) => {

    console.log(cardData);

    const currentData = {
      link: cardData['avatar-form-link']
    };
    console.log(currentData);
    api.setAvatar(currentData)
      .then((data) => {
        document.querySelector('.profile__avatar').src = data.avatar;
      });

      popupWithAvatarForm.close();
  }
});

popupWithAvatarForm.setEventListeners();

document.querySelector('.profile__avatar-load-button').addEventListener('click', function () {
  validationAvatar.resetValidation();
  avatarFormElement.reset();
  popupWithAvatarForm.open();
  validationAvatar.toggleButtonState();
});

