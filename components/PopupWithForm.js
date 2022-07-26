import Popup from './Popup.js';
// import { cardInputTitle, cardInputLink } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleAddingFormSubmit) {
    super(popupSelector);
    this._handleAddingFormSubmit = handleAddingFormSubmit;
    this._cardInputTitle = document.querySelector('.popup__input_type_title');
    this._cardInputLink = document.querySelector('.popup__input_type_link');
    this._cardFormElement = document.querySelector('.adding-form');
  }

  open() {
    super.open();

    this._getInputValues();
  }

  close() {
    super.close();

    this._cardFormElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._cardFormElement.addEventListener('submit', () => {
      this._handleAddingFormSubmit();
    });
  }

  _getInputValues(name, link) {
    this._cardInputTitle.value = name;
    this._cardInputLink.value = link;
  }

}
