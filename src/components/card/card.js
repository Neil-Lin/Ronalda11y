class RyCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const content = document.createElement('div');
    content.setAttribute('class', 'ry-card-container')
    content.innerHTML = `
      <slot name="heading"></slot>
      <slot name="media"></slot>
      <slot name="content"></slot>
      <slot name="footer"></slot>
    `;
    this.shadowRoot.appendChild(content);
  }
}

customElements.define("ry-card", RyCard);
