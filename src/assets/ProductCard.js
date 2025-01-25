export class ProductCard extends HTMLElement {
  static register(tagName) {
    customElements.define(tagName || "product-card", ProductCard);
  }

  connectedCallback() {
    console.log("connected!");
    /* Init functions */
    this.bindEvents();
  }

  bindEvents() {}
}

ProductCard.register();
