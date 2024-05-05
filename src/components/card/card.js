class RyCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <div class="ry-card-container">
        <div><slot name="heading"></slot></div>
        <div><slot name="media"></slot></div>
        <div><slot name="content"></slot></div>
        <div><slot name="footer"></slot></div>
      </div>
    `;
  }
}

customElements.define("ry-card", RyCard);
