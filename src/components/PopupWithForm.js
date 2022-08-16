import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._cardForm = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup__button');
  }

  _getInputValues() {
    const cardData = {};
    this._inputList.forEach(input => cardData[input.name] = input.value);
    return cardData;
  }

  close() {
    super.close();
    this._cardForm.reset();
  }

  handleLoading(loading, text) {
    if (loading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = text;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._cardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

}
