class RyBtn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Create button element
    this.button = document.createElement("button");
    // Attach any initial attributes
    this.attachInitialAttributes();

    // Create a slot for custom content
    const slot = document.createElement("slot");
    this.button.appendChild(slot); // Add slot inside button

    // Apply CSS styles
    const style = document.createElement("style");
    style.textContent = `
      button {
        /* behavior */
        cursor: pointer;
        
        /* spacing */
        padding: var(--btn-padding-vertical, 0.75rem) var(--btn-padding-horizontal, 1rem);
        
        /* text */
        color: oklch(var(--btn-text-color, 13.98% 0 0));
        font-size: var(--btn-text-size, 1rem);
        font-family: var(--btn-text-family, 'system-ui, Helvetica, Arial, sans-serif');
        line-height: var(--btn-text-line-height, 1.5);
        
        /* border */
        border: var(--btn-border-width, 1px) var(--btn-border-style, solid) oklch(var(--btn-border-color, 78.94% 0 0));
        border-radius: var(--btn-border-radius, 0.25rem);
        
        /* others decoration */
        background-color: oklch(var(--btn-bg, 99.4% 0 0));
        transition: background-color 160ms ease-in;
        
        &[size="small"] {
          padding: var(--btn-small-padding-vertical, 0.25rem) var(--btn-small-padding-horizontal, 0.5rem);
        }
        
        &[size="large"] {
          padding: var(--btn-large-padding-vertical, 1rem) var(--btn-large-padding-horizontal, 2rem);
          font-size: var(--btn-large-text-size, 1.25rem);
        }
        
        &:disabled {
          cursor: not-allowed;
          pointer-events: none;
          opacity: 0.4;
        }
        
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
        
        &.a11y {
          transition: none;
          text-shadow: var(--btn-a11y-text-shadow, none);
          background-image: var(--btn-a11y-bg-image, none);
            
          background-size: var(--btn-a11y-bg-size, 1.5rem 1.5rem);
          background-position: var(--btn-a11y-bg-position, center center);
          &:hover {
            background-image: var(--btn-a11y-hover-bg-image, none);
          }
          &:active {
            background-image: var(--btn-a11y-active-bg-image, none);
          }
        }
        
      }
      
      .spinner {
        display: inline-block;
        vertical-align: text-bottom;
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
          > span {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 1rem;
            height: 1rem;
            margin: 0.125rem;
            border: 0.125rem solid oklch(var(--btn-spinner-color, 78.94% 0 0));
            border-color: oklch(var(--btn-spinner-color, 78.94% 0 0)) transparent transparent transparent;
            border-radius: 50%;
            animation: btn-loading-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            &:nth-child(1) {
              animation-delay: -450ms;
            }
            &:nth-child(2) {
              animation-delay: -300ms;
            }
            &:nth-child(3) {
              animation-delay: -150ms;
            }
          }
         }
         
         @keyframes btn-loading-animation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `;

    this.shadowRoot.append(style, this.button);
  }

  // Attach initial attributes set on <ua-button>
  attachInitialAttributes() {
    Array.from(this.attributes).forEach((attr) => {
      this.button.setAttribute(attr.name, attr.value);
    });
  }

  connectedCallback() {
    // Handle attributes applied after element insertion
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          this.button.setAttribute(
            mutation.attributeName,
            this.getAttribute(mutation.attributeName)
          );
        }
      });
    });
    observer.observe(this, { attributes: true });
  }

  static get observedAttributes() {
    return ["disabled", "loading"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      // Specific logic for certain attributes
      this.button.setAttribute(name, newValue !== null ? newValue : "");
    } else if (name === "loading") {
      this.updateLoadingState(newValue !== null);
    } else {
      // Automatically forward attribute changes
      this.button.setAttribute(name, newValue);
    }
  }

  createSpinner() {
    const spinner = document.createElement("span");
    spinner.classList.add("spinner");
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span");
      spinner.appendChild(dot);
    }
    return spinner;
  }

  updateLoadingState(isLoading) {
    if (isLoading) {
      this.button.disabled = true;
      this.button.setAttribute("aria-busy", "true");
      this.button.appendChild(this.createSpinner());
    } else {
      this.button.disabled = false;
      this.button.removeAttribute("aria-busy");
      this.spinner && this.button.removeChild(this.spinner);
    }
  }
}

window.customElements.define("ry-btn", RyBtn);
