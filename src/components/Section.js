export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(data) {

    this.addItem(this._renderer(data));

  }

  renderItems(data) {
    data.reverse().forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

}
