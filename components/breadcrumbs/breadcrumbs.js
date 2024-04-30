class RyBreadcrumbs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["label", "items", "separator"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get label() {
    return this.getAttribute("label") || "導覽列 Navigation";
  }

  set label(val) {
    this.setAttribute("label", val);
  }

  get items() {
    return JSON.parse(this.getAttribute("items"));
  }

  set items(val) {
    this.setAttribute("items", JSON.stringify(val));
  }

  get separator() {
    return this.getAttribute("separator") || "/";
  }

  set separator(val) {
    this.setAttribute("separator", val);
  }

  render() {
    const label = this.label;
    const items = this.items || [];
    const separator = this.separator;
    this.shadowRoot.innerHTML = `
          <style>
              nav {
                ol {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  width: 100%;
                  li {
                    display: inline-block;
                    vertical-align: middle;
                    &:not(:last-child):after {
                      content: " ${separator} ";
                    }
                  }
                }
              }
          </style>
          <nav aria-label="${label}">
            <ol>
              ${items
                .map(
                  (item, index) => `
                    ${
                      index !== items.length - 1
                        ? ` <li><a href="${item.url}"> ${item.text}</a></li>`
                        : ` <li><a href="" aria-current="page">${item.text}</a></li>`
                    }
                  `
                )
              .join("")}
            </ol>
          </nav>
      `;
  }
}

customElements.define("ry-breadcrumbs", RyBreadcrumbs);
