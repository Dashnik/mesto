export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items,userId) {
    items.forEach((card) => {
      this._renderer(card,userId);
    });
  }

  addItem(element, isArray) {
    if (isArray) {
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
    }
  }
}
