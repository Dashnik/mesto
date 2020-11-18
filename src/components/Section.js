export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
     this._containerSelector = containerSelector;
  }

  renderItems() {
    this._items.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }
}
