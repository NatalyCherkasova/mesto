import { popup, popupCloseButton } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e);
  });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => {
      this._handleEscClose(e);
  });
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', () => {
      this.open();
    });

    this._popupSelector.addEventListener('click', (e) => {
      this._handleOverlayClose(e);
    });

    popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
