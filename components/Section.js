export const parentCards = document.querySelector(".elements");

export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    // this._containerSelector = containerSelector;
  }

  renderItem() {
    this._items.forEach((card) => {
      this._renderer(card);
      //     const cardElement = new Card(this._containerSelector, card);
      //     const element = cardElement.getElement();

      //   return this.addItem(element);
    });
  }

  addItem(element) {
    parentCards.append(element);
  }
}
