class RyCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .ry-card-container {
          /* Styles for container */
        }
        ::slotted(*) {
          /* General slot styles */
        }
      </style>
      <div class="ry-card-container">
        <slot name="heading"></slot>
        <slot name="media"></slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

customElements.define("ry-card", RyCard);
