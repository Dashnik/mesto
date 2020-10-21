class Card {
  constructor(selector) {
    this._selector = selector;
  }

_getTemplate() {
  console.log(
    document.querySelector(this._selector).content.cloneNode(true)
  );
}

}

const TestTemplate = new Card(".card-template");
TestTemplate._getTemplate();