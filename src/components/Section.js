export class Section {
  // constructor({ items, renderer }, containerSelector) {
  //   this._items = items;
  //   this._renderer = renderer;
  //    this._containerSelector = containerSelector;
  // }

  constructor({renderer }, containerSelector) {
    this._renderer = renderer;
     this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(element, isArray) {
    if (isArray){
      this._containerSelector.append(element);
    }
    else {
      this._containerSelector.prepend(element);
    }
  }
}
