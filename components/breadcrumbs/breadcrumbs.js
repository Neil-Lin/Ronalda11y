class RyBreadcrumbs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(); // Initial render
    this.observeAttributes(); // Setup attribute observation
  }

  observeAttributes() {
    // Observes attributes directly without using the static get observedAttributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          this.handleAttributeChange(
            mutation.attributeName,
            mutation.oldValue,
            this.getAttribute(mutation.attributeName)
          );
        }
      });
    });

    observer.observe(this, {
      attributes: true, // Observe all attribute changes
      attributeOldValue: true, // Provide the old value in the mutation record
    });
  }

  handleAttributeChange(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(); // Re-render on any attribute change
    }
  }

  render() {
    const items = this.items || [];
    const separator = this.getAttribute("separator") || "/";
    let navAttributes = Array.from(this.attributes)
      .filter((attr) => attr.name !== "items" && attr.name !== "style") // Exclude 'items' and 'style'
      .map((attr) => `${attr.name}="${attr.value}"`)
      .join(" ");

    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background-color: oklch(var(--breadcrumbs-bg, transparent));
          overflow: auto;
          white-space: nowrap;
          ol {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            li {
              display: inline-block;
              vertical-align: middle;
              &:after {
                content: " ${separator} ";
              }
              &:last-child {
                &:after {
                  display: none;
                }
                a {
                  text-decoration: none;
                }
              }
              a {
                display: inline-block;
                padding: var(--breadcrumbs-link-padding-vertical, 0.75rem) var(--breadcrumbs-link-padding-horizontal, 0.5rem);
                font-size: var(--breadcrumbs-text-size, 1rem);
                text-decoration: var(--breadcrumbs-text-deco, none);
                color: oklch(var(--breadcrumbs-link-color, 42.9% 0.2972777928415759 264.05202063805507));
                &:hover {
                  opacity: 0.7;
                }
                &:active {
                  opacity: 1;
                }
                &:visited {
                  color: oklch(var(--breadcrumbs-link-visited-color, 37.48% 0.167 303.51));
                }
                &:focus-visible {
                  outline: none;
                  box-shadow: inset 0 0 0 var(--breadcrumbs-focus-shadow-width, 3px) oklch(var(--breadcrumbs-focus-shadow-color, 83.15% 0.15681888825079074 78.05241467152487));
                }
                &[aria-current="page"] {
                  color: oklch(var(--breadcrumbs-link-currentpage-color, 13.98% 0 0));
                  pointer-events: none;
                }
              }
            }
          }
        }
      </style>
      <nav ${navAttributes}>
        <ol>
          ${items
            .map(
              (item, index) => `
            <li><a href="${item.url || ""}" ${
                index === items.length - 1 ? 'aria-current="page"' : ""
              }>${item.text}</a></li>
          `
            )
            .join("")}
        </ol>
      </nav>
    `;
  }

  get items() {
    try {
      return JSON.parse(this.getAttribute("items"));
    } catch (e) {
      return [];
    }
  }
}

customElements.define("ry-breadcrumbs", RyBreadcrumbs);
