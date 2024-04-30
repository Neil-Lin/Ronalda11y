import { html, fixture, expect } from "@open-wc/testing";
import "../components/button/button.js";

describe("RyBtn", () => {
  it("測試是否有 ry-btn 這個 html tag，以及是否創造 shadow-dom，而且裡面的<button>是HTMLElement", async () => {
    const el = await fixture(html`<ry-btn></ry-btn>`);
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot.querySelector('button')).to.be.an.instanceof(HTMLElement);
  });

  it("測試按鈕內容是否正常顯示", async () => {
    const el = await fixture(html`<ry-btn><span>Test Content</span></ry-btn>`);
    const slotContent = el.shadowRoot.querySelector("slot").assignedNodes();
    const contentText = Array.from(slotContent).reduce((acc, node) => acc + node.textContent, "");
    expect(contentText).to.include("Test Content");
  });
  
  it('測試 attribute 是否有繼承，此測試包含 disable, loading, size', async () => {
    const el = await fixture(html`<ry-btn title="this is attribute title content test"></ry-btn>`);
    await el.updateComplete;
    const buttonInside = el.shadowRoot.querySelector('button');
    expect(buttonInside.getAttribute('title')).to.equal('this is attribute title content test');
  });

  it('測試禁用狀態', async () => {
    const el = await fixture(html`<ry-btn disabled></ry-btn>`);
    await el.updateComplete;
    const buttonInside = el.shadowRoot.querySelector('button');
    expect(buttonInside.hasAttribute('disabled')).to.be.true;
  });

  it('測試 Loading 狀態是否有轉圈圈跑出來', async () => {
    const el = await fixture(html`<ry-btn loading></ry-btn>`);
    await el.updateComplete;
    const buttonInside = el.shadowRoot.querySelector('button');
    expect(buttonInside.hasAttribute('loading')).to.be.true;
    expect(buttonInside.hasAttribute('disabled')).to.be.true;
    expect(buttonInside.hasAttribute('aria-busy')).to.be.true;
    const spinner = buttonInside.querySelector('.spinner');
    expect(spinner, 'Loading 容器是否出現').to.exist;
    const spans = spinner.querySelectorAll('span');
    expect(spans.length, 'Loading 容器的裝飾是否出現3個').to.equal(3);
  });

});
