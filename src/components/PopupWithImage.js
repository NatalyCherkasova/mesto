import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPictureElement = document.querySelector('.popup__picture');
    this._popupPictureCaptionElement = document.querySelector('.popup__caption');
  }

  open(link, name) {
    super.setEventListeners();
    this._popupPictureElement.src = link;
    this._popupPictureElement.alt = name;
    this._popupPictureCaptionElement.textContent = name;
    super.open();
  }

}
