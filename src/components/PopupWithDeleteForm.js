import Popup from './Popup.js';

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, handlerDeleteCard) {
    super(popupSelector);
    this._handlerDeleteCard = handlerDeleteCard;
    this._cardForm = this._popup.querySelector('.popup__form');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._cardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handlerDeleteCard(this._card);
    });
  }

}
