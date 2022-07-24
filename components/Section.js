import Card from "./Card.js";

export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

    setItem(element) {
    this._container.prepend(element);
  }

  // clear() {
  //   this._container.innerHTML = '';
  // }

  renderItems() {
    // this._renderedItems.forEach((item) => {
    //   const card =  new Card(item, '.elements-template_type_default');

    //   const cardElement = card.generateCard();

    //   this.setItem(cardElement);

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

}
