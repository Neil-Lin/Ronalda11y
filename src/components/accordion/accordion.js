class RyAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const container = document.createElement('div');
    container.setAttribute('class', 'ry-accordion');
    
    const slot = document.createElement('slot');
    container.appendChild(slot);
    this.shadowRoot.appendChild(container);
    const style = document.createElement("style");
  }
}

customElements.define("ry-accordion", RyAccordion);


class RyAccordionItem extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });

      const regionId = this.generateId();
      const titleId = this.generateId();

      const content = document.createElement('div');
      content.setAttribute('class', 'ry-accordion-item');
      
      content.innerHTML = `
        <style>
          .ry-accordion-item{
            margin-bottom: 1rem;
          }
          button {
            /* behavior */
            cursor: pointer;
            
            /* spacing */
            display: block;
            width: 100%;
            text-align: left;
            padding: var(--btn-padding-vertical, 0.75rem) var(--btn-padding-horizontal, 1rem);
            
            /* text */
            color: oklch(var(--btn-text-color, 13.98% 0 0));
            font-size: var(--btn-text-size, 1rem);
            font-family: var(--btn-text-family, 'Helvetica, Arial, sans-serif, system-ui');
            line-height: var(--btn-text-line-height, 1.5);
            
            /* border */
            border: var(--btn-border-width, 1px) var(--btn-border-style, solid) oklch(var(--btn-border-color, 78.94% 0 0));
            
            /* others decoration */
            background-color: oklch(var(--btn-bg, 99.4% 0 0));
            transition: background-color 160ms ease-in;

            &:hover {
              background-color: oklch(var(--btn-hover-bg, 94.66% 0 0));
              border-color: oklch(var(--btn-hover-border-color, 78.94% 0 0));
            }
            
            &:active {
              background-color: oklch(var(--btn-active-bg, 86.89% 0 0));
              border-color: oklch(var(--btn-active-border-color, 78.94% 0 0));
            }
            
            &:focus-visible {
              outline: none;
              box-shadow: inset 0 0 0 var(--btn-focus-shadow-width, 3px) oklch(var(--btn-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
            }
          }

          div[role="region"] {
            background-color: oklch(var(--accordion-item-bg, 97.31% 0 0));
            transition: max-height 300ms linear;
            &[aria-hidden="true"] {
              max-height: 0;
              overflow: hidden;
            }
            &[aria-hidden="false"] {
              display: block;
              overscroll-behavior: var(--accordion-item-content-overscroll-behavior, contain);
              max-height: var(--accordion-item-content-max-height, 300px);
              overflow: auto;
              border-left: var(--btn-border-width, 1px) var(--btn-border-style, solid) oklch(var(--btn-border-color, 78.94% 0 0));
              border-right: var(--btn-border-width, 1px) var(--btn-border-style, solid) oklch(var(--btn-border-color, 78.94% 0 0));
              border-bottom: var(--btn-border-width, 1px) var(--btn-border-style, solid) oklch(var(--btn-border-color, 78.94% 0 0));
            }
          }
        </style>
        <button class="heading" aria-expanded="false" aria-controls="${regionId}" id="${titleId}" part="heading">
            <slot name="heading"></slot>
        </button>
        <div role="region" id="${regionId}" aria-labelledby="${titleId}" aria-hidden="true" part="content">
            <slot name="content"></slot>
        </div>
      `;

      this.shadowRoot.append(content);

      this.button = this.shadowRoot.querySelector('button');
      this.button.addEventListener('click', () => this.toggleAccordion());
  }

  connectedCallback() {
    this.updateExpanded();
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
        this.updateExpanded();
    }
  }

  updateExpanded() {
    const isOpen = this.hasAttribute('open');
    this.button.setAttribute('aria-expanded', isOpen);
    const region = this.shadowRoot.querySelector('div[role="region"]');
    region.setAttribute('aria-hidden', !isOpen);
  }

  generateId() {
      const byteArray = new Uint32Array(1);
      window.crypto.getRandomValues(byteArray);
      return `id-${byteArray[0].toString(36)}`;
  }

  toggleAccordion() {
    const expanded = this.button.getAttribute('aria-expanded') === 'true';
    this.button.setAttribute('aria-expanded', !expanded);
    const region = this.shadowRoot.querySelector('div[role="region"]');
    region.setAttribute('aria-hidden', expanded);
    if (!expanded) {
        this.setAttribute('open', '');
    } else {
        this.removeAttribute('open');
    }
  }
}

customElements.define("ry-accordion-item", RyAccordionItem);
