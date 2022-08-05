class FormValidator {
  constructor(obj, popupElement) {
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._popupElement = popupElement;
    this._buttonElement = this._popupElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._popupElement.querySelectorAll(this._inputSelector));
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', true);
  }

  toggleButtonState() {
    if (this._getInvalidInput(this._inputList, this._buttonElement)) {
      // сделай кнопку неактивной
      this._disableSubmitButton();
    } else {
      // иначе сделай кнопку активной
      this._enableSubmitButton();
    }
  }

  _getInvalidInput() {
    return this._inputList.some((inputElement) => {

      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>  {
      this._checkInputValidity(inputElement);
      this.toggleButtonState();
    });
  });
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  resetValidation() {
  this.toggleButtonState();
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
}

  enableValidation() {
    // this._formList = Array.from(document.querySelectorAll(this._formSelector));
    // this._formList.forEach((popupElement) => {
      this._popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(this._popupElement);
    };
  }


export default FormValidator;
