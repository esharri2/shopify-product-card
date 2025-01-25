export class ProductCard extends HTMLElement {
  static register(tagName) {
    customElements.define(tagName || "product-card", ProductCard);
  }

  connectedCallback() {
    this.bindEvents();
  }

  bindEvents() {
    this.addEventListener("click", ({ target }) => {
      if (target.matches("[data-variant-switch]:not([aria-pressed='true'])")) {
        this.handleSwatchClick(target);
      }
    });
  }

  handleSwatchClick(target) {
    const { variantId, variantPrice, variantCompareAtPrice } = target.dataset;

    // Update images
    this.images = this.images || this.querySelectorAll(`img[data-variant-id]`);

    this.images.forEach((image) => {
      image.classList.add("hidden");

      if (image.dataset.variantId === variantId) {
        image.classList.remove("hidden");
      }
    });

    // Update prices
    this.priceSlot = this.priceSlot || this.querySelector("[data-price-slot]");
    this.compareAtPriceSlot =
      this.compareAtPriceSlot ||
      this.querySelector("[data-compare-at-price-slot]");

    this.priceSlot.innerHTML = variantPrice;
    if (this.compareAtPriceSlot) {
      if (variantCompareAtPrice) {
        this.compareAtPriceSlot.classList.remove("hidden");
        this.compareAtPriceSlot.innerHTML = variantCompareAtPrice;
      } else {
        this.compareAtPriceSlot.classList.add("hidden");
      }
    }

    // Toggle aria-pressed
    const pressedButtons = this.querySelectorAll("[aria-pressed='true']");

    pressedButtons.forEach((button) =>
      button.setAttribute("aria-pressed", "false")
    );

    target.setAttribute("aria-pressed", "true");
  }
}

ProductCard.register();
