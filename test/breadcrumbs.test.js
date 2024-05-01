import { html, fixture, expect } from "@open-wc/testing";
import "../components/breadcrumbs/breadcrumbs.js";

describe("RyBreadcrumbs", () => {
  it("renders the correct number of breadcrumb items", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        items='[{"text":"Home","url":"/"}, {"text":"About","url":"/about"}]'
      ></ry-breadcrumbs>`
    );
    expect(el.shadowRoot.querySelectorAll("nav>ol>li").length).to.equal(2);
  });

  it("displays text for each breadcrumb item", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        items='[{"text":"Home", "url":"/"}]'
      ></ry-breadcrumbs>`
    );
    const item = el.shadowRoot.querySelector("nav>ol>li:first-child");
    expect(item.textContent).to.include("Home");
  });

  it("makes all but the last breadcrumb item clickable", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        items='[{"text":"Home","url":"/"}, {"text":"About","url":"/about"}, {"text":"Contact"}]'
      ></ry-breadcrumbs>`
    );
    const items = el.shadowRoot.querySelectorAll("nav>ol>li>a");
    expect(items.length).to.equal(3);
    expect(items[0].href).to.contain("/");
    expect(items[1].href).to.contain("/about");
    expect(items[2].href).to.contain("");
  });

  it("should use the custom separator string in li:after content", async () => {
    const separator = ">";
    const el = await fixture(html`
      <ry-breadcrumbs
        separator="${separator}"
        items='[{"text":"Home","url":"/"}, {"text":"About","url":"/about"}, {"text":"Contact"}]'
      ></ry-breadcrumbs>
    `);
    const liElements = el.shadowRoot.querySelectorAll(
      "nav>ol>li:not(:last-child)"
    );

    for (let li of liElements) {
      const style = window.getComputedStyle(li, "::after");
      expect(style.content).to.include(separator);
    }
  });

  it('Test if the attributes are inherited.', async () => {
    const separator = ">";
    const el = await fixture(html`
      <ry-breadcrumbs
        separator="${separator}"
        items='[{"text":"Home","url":"/"}, {"text":"About","url":"/about"}, {"text":"Contact"}]'
        any-attribute="this is custom attribute."
      ></ry-breadcrumbs>
    `);
    await el.updateComplete;
    const breadcrumbsInside = el.shadowRoot.querySelector('nav');
    expect(breadcrumbsInside.getAttribute('separator')).to.equal('>');
    expect(breadcrumbsInside.getAttribute('any-attribute')).to.equal('this is custom attribute.');
  });
});
