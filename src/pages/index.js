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

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', 'e113d756-181d-4d20-b2e1-8221892630a4');

function renderCard(item, popupSelector) {
  const card = new Card(item, popupSelector, handleCardCklick, handleDeleteCard,
    handleAddLikeCard, handleDeleteLikeCard, userInfo.userId);
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

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
]).then(([userData, initialCards]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  cardsSection.renderItems(initialCards);
})
  .catch((err) =>
    console.log(err));

//(для себя)))))
// const req = new Promise(function (resolve, reject) {
//   if (resolve) {
//     api.getProfileInfo()
//       .then((userData) => {
//         userInfo.setUserInfo(userData);
//         userInfo.setUserAvatar(userData);
//       });
//     resolve();
//   } else {
//     reject();
//   }
// });

// req.then(() => {
//   api.getInitialCards()
//     .then((initialCards) => {
//       cardsSection.renderItems(initialCards);
//     })
//     .catch((err) =>
//       console.log(err));
// });


//////////////  Обработка увеличенной карточки  ///////////////////////////

const popupWithImage = new PopupWithImage('.popup_type_picture');

function handleCardCklick(name, link) {
  popupWithImage.open(link, name);
}

popupWithImage.setEventListeners();

///////////   Обработка формы добавления карточки   //////////////////////

const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_adding-form',
  handleFormSubmit: (cardData) => {

    const currentData = {
      name: cardData['adding-form-title'],
      link: cardData['adding-form-link']
    };
    popupWithAddForm.handleLoading(true, 'Сохранение...');
    api.addNewCard(currentData)
      .then((data) => {
        cardsSection.renderItem(data);
        popupWithAddForm.close();
      })
      .catch((err) =>
        console.log(err))
      .finally(() => {
        popupWithAddForm.handleLoading(true, 'Сохранить');
      });
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

const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_ocupation', '.profile__avatar');

const popupWithProfileForm = new PopupWithForm({
  popupSelector: '.popup_type_profile-form',
  handleFormSubmit: (cardData) => {

    const currentData = {
      name: cardData['profile-form-name'],
      about: cardData['profile-form-ocupation']
    };
    popupWithProfileForm.handleLoading(true, 'Сохранение...');
    api.setProfileInfo(currentData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.close();
    })
      .catch((err) =>
        console.log(err))
      .finally(() => {
        popupWithProfileForm.handleLoading(true, 'Сохранить');
      });
  }
});

popupWithProfileForm.setEventListeners();

profileButtonEdit.addEventListener('click', function () {
  validationProfile.resetValidation();
  const userProfile = userInfo.getUserInfo();
  nameFieldElement.value = userProfile.name;
  occupationFieldElement.value = userProfile.about;
  popupWithProfileForm.open();
});

/////////////////////  Обработка лайков  /////////////////////////////

function handleAddLikeCard(counterLikesElement, currentCardId) {
  api.addLikeCard(currentCardId)
    .then((data) => {
      const likeNumber = data.likes.length;
      counterLikesElement.textContent = likeNumber;
    })
    .catch((err) =>
      console.log(err));
}

function handleDeleteLikeCard(counterLikesElement, currentCardId) {
  api.deleteLikeCard(currentCardId)
    .then((data) => {
      const likeNumber = data.likes.length;
      counterLikesElement.textContent = likeNumber;
    })
    .catch((err) =>
      console.log(err));
}

/////////////////////  Удаление карточек  ////////////////////////////

const delitingForm = new PopupWithDeleteForm('.popup_type_delete-card-form', handlerDeleteCard);

function handleDeleteCard(card) {
  delitingForm.open(card);
}

function handlerDeleteCard(card) {
  api.deleteCard(card.getCardId())
    .then(() => {
      card.deleteCardElement();
      delitingForm.close();
    })
    .catch((err) =>
      console.log(err));
}

delitingForm.setEventListeners();

/////////////////////  Редактирование аватара  ////////////////////////////

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar-form',
  handleFormSubmit: (cardData) => {

    const currentData = {
      link: cardData['avatar-form-link']
    };

    popupWithAvatarForm.handleLoading(true, 'Сохранение...');
    api.setAvatar(currentData)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupWithAvatarForm.close();
      })
      .catch((err) =>
        console.log(err))
      .finally(() => {
        popupWithAvatarForm.handleLoading(true, 'Сохранить');
      });
  }
});

popupWithAvatarForm.setEventListeners();

document.querySelector('.profile__avatar-cover').addEventListener('click', function () {
  validationAvatar.resetValidation();
  avatarFormElement.reset();
  popupWithAvatarForm.open();
  validationAvatar.toggleButtonState();
});

/////////thanks for your patience//////////////

////// __000000___00000
////// _00000000_0000000
////// _0000000000000000
////// __00000000000000
////// ____00000000000
////// _______00000
////// _________0
