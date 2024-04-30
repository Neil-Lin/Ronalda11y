import { html, fixture, expect } from "@open-wc/testing";
import "../components/breadcrumbs/breadcrumbs.js";

describe("RyBreadcrumbs", () => {
  it("renders the correct number of breadcrumb items", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        items='[{"text":"Home","icon":"home-icon","url":"/"}, {"text":"About","icon":"info-icon","url":"/about"}]'
      ></ry-breadcrumbs>`
    );
    expect(el.shadowRoot.querySelectorAll(".breadcrumb-item").length).to.equal(
      2
    );
  });

  it("displays text and icon for each breadcrumb item", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        items='[{"text":"Home","icon":"home-icon","url":"/"}]'
      ></ry-breadcrumbs>`
    );
    const item = el.shadowRoot.querySelector(".breadcrumb-item");
    expect(item.textContent).to.include("Home");
    expect(item.innerHTML).to.include("home-icon");
  });

  it("makes all but the last breadcrumb item clickable", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        items='[{"text":"Home","url":"/"}, {"text":"About","url":"/about"}, {"text":"Contact", "isCurrent": true}]'
      ></ry-breadcrumbs>`
    );
    const items = el.shadowRoot.querySelectorAll(".breadcrumb-item a");
    expect(items.length).to.equal(2); // Only first two are links
    expect(items[0].href).to.contain("/");
    expect(items[1].href).to.contain("/about");
    const currentItem = el.shadowRoot.querySelector(
      ".breadcrumb-item:last-child"
    );
    expect(currentItem.querySelector("a")).to.be.null; // Last item is not a link
  });
  
  it("uses custom separator between breadcrumb items", async () => {
    const el = await fixture(
      html`<ry-breadcrumbs
        separator=">"
        items='[{"text":"Home","url":"/"}, {"text":"About","url":"/about"}]'
      ></ry-breadcrumbs>`
    );
    const separator = el.shadowRoot.querySelector(".breadcrumb-separator");
    expect(separator.textContent).to.equal(">");
  });
});
