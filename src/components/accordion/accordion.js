class RyAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const container = document.createElement('div');
    container.setAttribute('class', 'ry-accordion');
    
    const slot = document.createElement('slot');
    container.appendChild(slot);
    this.shadowRoot.appendChild(container);
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
          .ry-accordion-item {
            margin-bottom: var(--ry-accordion-item-gap, 1rem);
          }
          button {
            /* behavior */
            cursor: pointer;
            
            /* spacing */
            display: flex;
            justify-content: space-between;
            align-items: center;
            word-break: break-word;
            width: 100%;
            text-align: left;
            padding: var(--ry-btn-padding-vertical, 0.75rem) var(--ry-btn-padding-horizontal, 1rem);
            
            /* text */
            color: oklch(var(--ry-btn-text-color, 13.98% 0 0));
            font-size: var(--ry-btn-text-size, 1rem);
            font-family: var(--ry-btn-text-family, 'Helvetica, Arial, sans-serif, system-ui');
            line-height: var(--ry-btn-text-line-height, 1.5);
            
            /* border */
            border: var(--ry-btn-border-width, 1px) var(--ry-btn-border-style, solid) oklch(var(--ry-btn-border-color, 78.94% 0 0));
            
            /* others decoration */
            background-color: oklch(var(--ry-btn-bg, 99.4% 0 0));
            transition: background-color 160ms ease-in;

            .heading {
              flex: 1;
              gap: 1rem;
            }

            .info {
              display: flex;
              align-items: center;
              gap: 1rem;
              flex: 0 1 auto;
            }

            .deco-icon {
              transition: transform 300ms ease-in;
            }

            &[aria-expanded="true"] {
              .deco-icon {
                transform: rotate3d(0, 0, 1, 180deg);
                transform-origin: center;
              }
            }

            &:hover {
              background-color: oklch(var(--ry-btn-hover-bg, 94.66% 0 0));
              border-color: oklch(var(--ry-btn-hover-border-color, 78.94% 0 0));
            }
            
            &:active {
              background-color: oklch(var(--ry-btn-active-bg, 86.89% 0 0));
              border-color: oklch(var(--ry-btn-active-border-color, 78.94% 0 0));
            }
            
            &:focus-visible {
              outline: none;
              box-shadow: inset 0 0 0 var(--ry-btn-focus-shadow-width, 3px) oklch(var(--ry-btn-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
            }
          }

          div[role="region"] {
            background-color: oklch(var(--ry-accordion-item-content-bg, 97.31% 0 0));
            color: oklch(var(--ry-accordion-item-content-text-color, 13.98% 0 0));
            padding-left: var(--ry-accordion-item-content-padding-left, 1rem);
            padding-right: var(--ry-accordion-item-content-padding-right, 1rem);
            transition: max-height 300ms linear;

            &[aria-hidden="true"] {
              max-height: 0;
              overflow: hidden;
            }

            &[aria-hidden="false"] {
              display: block;
              overscroll-behavior: var(--ry-accordion-item-content-overscroll-behavior, auto);
              max-height: var(--ry-accordion-item-content-max-height, 300px);
              overflow: auto;
              border-left: var(--ry-btn-border-width, 1px) var(--ry-btn-border-style, solid) oklch(var(--ry-btn-border-color, 78.94% 0 0));
              border-right: var(--ry-btn-border-width, 1px) var(--ry-btn-border-style, solid) oklch(var(--ry-btn-border-color, 78.94% 0 0));
              border-bottom: var(--ry-btn-border-width, 1px) var(--ry-btn-border-style, solid) oklch(var(--ry-btn-border-color, 78.94% 0 0));
            }
          }
        </style>
        <button aria-expanded="false" aria-controls="${regionId}" id="${titleId}" part="button">
            <div class="heading"><slot name="heading"></slot></div>
            <div class="info">
              <slot name="sub"></slot>
              <div class="deco-icon""><slot name="deco-icon"></slot></div>
            </div>
        </button>
        <div role="region" id="${regionId}" aria-labelledby="${titleId}" aria-hidden="true" part="region">
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
