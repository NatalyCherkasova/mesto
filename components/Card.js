class Card {
  constructor(data, cardSelector, handleCardCklick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardCklick = handleCardCklick;
  }

  _getTemplate() {
    return document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    // return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__title').alt = this._alt;

  // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__basket').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardCklick(this._name, this._link, this._alt);
    });

  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

}

export default Card;
