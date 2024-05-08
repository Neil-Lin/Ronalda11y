class RyCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Generate a unique ID for the input element
    const inputID = this.generateId();

    const style = document.createElement('style');
    style.textContent = `
      .ry-checkbox {
        display: inline-block;
        vertical-align: middle;
        padding: var(--spacing-xxs);
      }
      label {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs, 0.875rem);
        input[type="checkbox"] {
          cursor: pointer;
          width: var(--ry-checkbox-width, 1.5rem);
          height: var(--ry-checkbox-height, 1.5rem);
          border-radius: var(--radius, 0.25rem);
          accent-color: oklch(var(--ry-checkbox-accent-color, 13.98% 0 0));
          &:focus-visible {
            outline: none;
            box-shadow: inset 0 0 0 var(--ry-checkbox-focus-shadow-width, 3px) oklch(var(--ry-checkbox-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
          }
          &:disabled {
            cursor: not-allowed;
          }
        }
        .text {
          color: oklch(var(--ry-checkbox-text-color, 13.98% 0 0));
          font-size: var(--ry-checkbox-text-size, 1rem);
        }
        &:hover {
          .text {
            text-decoration: underline;
          }
        }
        &:active {
          .text {
            color: oklch(var(--ry-checkbox-active-text-color, 53.7% 0 0));
          }
        }
        &:has(input[type="checkbox"]:disabled) {
          cursor: not-allowed;
          .text {
            pointer-events: none;
            text-decoration: none;
            color: oklch(var(--ry-checkbox-disabled-text-color, 53.7% 0 0));
          }
        }
      }
    `;

    // Create a container for the checkbox and its label
    const container = document.createElement('div');
    container.setAttribute('class', 'ry-checkbox');

    // Create the label and input elements
    const label = document.createElement('label');
    label.setAttribute('for', inputID);
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = inputID;
    input.name = this.getAttribute('name') || 'default-checkbox';
    input.value = this.getAttribute('value') || 'default';
    if (this.hasAttribute('checked')) {
      input.checked = true;
    }
    if (this.hasAttribute('disabled')) {
      input.disabled = true;
    }

    // Create the text slot
    const textSlot = document.createElement('div');
    textSlot.setAttribute('class', 'text');
    const slot = document.createElement('slot');
    textSlot.appendChild(slot);

    // Append elements to the label
    label.append(input, textSlot);

    // Append all elements to the container
    container.appendChild(label);

    // Append style and container to the shadow root
    this.shadowRoot.append(style, container);

    // Listen for checkbox events
    input.addEventListener('change', (event) => {
      this.dispatchEvent(new CustomEvent('change', { detail: event.target.checked }));
    });
  }

  // Method to generate a unique ID
  generateId() {
    const byteArray = new Uint32Array(1);
    window.crypto.getRandomValues(byteArray);
    return `ry-checkbox-${byteArray[0].toString(36)}`;
  }

  static get observedAttributes() {
    return ['name', 'value', 'checked', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      switch (name) {
        case 'checked':
          input.checked = newValue !== null;
          break;
        case 'disabled':
          input.disabled = newValue !== null;
          break;
        default:
          input.setAttribute(name, newValue);
          break;
      }
    }
  }
}

customElements.define('ry-checkbox', RyCheckbox);
