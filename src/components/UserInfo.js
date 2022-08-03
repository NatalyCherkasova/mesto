export default class UserInfo {
  constructor( nameField, descriptionField ) {
    this._nameField = nameField;
    this._descriptionField = descriptionField;
    this._name = document.querySelector(this._nameField);
    this._info = document.querySelector(this._descriptionField);

  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._info.textContent
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._info.textContent = userInfo.description;
  }

}
