import Popup from './Popup.js';

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, handlerDeleteCard) {
    super(popupSelector);
    this._handlerDeleteCard = handlerDeleteCard;
    this._cardForm = this._popup.querySelector('.popup__form');
  }

  setConfirmHandler(handler) {
    this.confirmHandler = handler;
  }

  open(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    super.open();
  }


  setEventListeners() {
    super.setEventListeners();

    this._cardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handlerDeleteCard(this._cardElement, this._cardId);
      this.close();
    });
  }

}
