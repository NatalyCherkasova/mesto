export default class UserInfo {
  constructor( nameField, descriptionField, userAvatarField ) {
    this._nameField = nameField;
    this._descriptionField = descriptionField;
    this._userAvatarField = userAvatarField;
    this._name = document.querySelector(this._nameField);
    this._info = document.querySelector(this._descriptionField);
    this._userAvatar = document.querySelector(this._userAvatarField);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._info.textContent
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._info.textContent = userInfo.about;
    this.userId = userInfo._id;
  }

  setUserAvatar(userInfo) {
    this._userAvatar.src = userInfo.avatar;
  }

}
