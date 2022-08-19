class Card {
  constructor(data, cardSelector, handleCardCklick, handleDeleteCard, handleAddLikeCard, handleDeleteLikeCard, userId) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardCklick = handleCardCklick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLikeCard = handleAddLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
    this._likeNumber = data.likes.length;
    this._isLiked = data.likes.some(function(item) {
      return item._id === userId;
  });
    this._ownCard = data.owner._id === userId;
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
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._setEventListeners();


    this._elementImage.src = this._link;
    this._elementTitle.textContent = this._name;
    this._elementTitle.alt = this._alt;
    this._elementImage.id = this._cardId;
    this._element.querySelector('.element__like-number').textContent = this._likeNumber;
    if (this._isLiked) {
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    if (!this._ownCard) {
      this._element.querySelector('.element__basket').style.display = "none";
    }

  // Вернём элемент наружу
    return this._element;
  }

  getCardId() {
    return this._cardId;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
      this._handleLikeCounter();
    });

    this._element.querySelector('.element__basket').addEventListener('click', () => {
      this._handleDeleteCard(this);
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardCklick(this._name, this._link, this._alt);
    });

  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  deleteCardElement() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCounter() {
    const counterLikesElement= this._element.querySelector('.element__like-number');

    if (this._element.querySelector('.element__like').classList.contains('element__like_active')) {
      this._isLiked = true;
      this._handleAddLikeCard(counterLikesElement, this._cardId);
    }
    else {
      this._isLiked = false;
      this._handleDeleteLikeCard(counterLikesElement, this._cardId);
    }

  }

}

export default Card;
