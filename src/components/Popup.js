import { popupCloseButton } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
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
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {

    this._popup.addEventListener('mousedown', (e) => {
      this._handleOverlayClose(e);
    });

    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e);
  });

    popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
