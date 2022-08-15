import {api, userId} from '../pages/index.js';
class Card {
  constructor(data, cardSelector, handleCardCklick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardCklick = handleCardCklick;
    this._handleDeleteCard = handleDeleteCard;
    this._likeNumber = data.likes.length;
    this._isLike = data.likes.some(function(item) {
      return item._id === userId;
  });
    this._itsMyCard = data.owner._id === userId;
  }

  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__title').alt = this._alt;
    this._element.querySelector('.element__image').id = this._cardId;
    this._element.querySelector('.element__like-number').textContent = this._likeNumber;
    if (this._isLike) {
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    if (!this._itsMyCard) {
      this._element.querySelector('.element__basket').style.display = "none";
    }

  // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
      this._handleLikeCounter();
    });

    this._element.querySelector('.element__basket').addEventListener('click', () => {
      this._handleDeleteCard(this._element, this._cardId);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardCklick(this._name, this._link, this._alt);
    });

  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleLikeCounter() {
    const counterElement= this._element.querySelector('.element__like-number');

    if (this._element.querySelector('.element__like').classList.contains('element__like_active')) {
      this._isLike = true;
      api.addLikeCard(this._cardId)
      .then((data) => {
        this._likeNumber = data.likes.length;
        counterElement.textContent = this._likeNumber;
      });
    }
    else {
      this._isLike = false;
      api.deleteLikeCard(this._cardId)
      .then((data) => {
        this._likeNumber = data.likes.length;
        counterElement.textContent = this._likeNumber;
      });
    }

  }

}

export default Card;
