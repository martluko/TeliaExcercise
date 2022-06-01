import { newSpecPage } from '@stencil/core/testing';
import { CustomFrameSelector } from '../custom-frame-selector';

describe('custom-frame-selector', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CustomFrameSelector],
      html: `<custom-frame-selector></custom-frame-selector>`,
    });
    expect(page.root).toEqualHtml(`
      <custom-frame-selector>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </custom-frame-selector>
    `);
  });
});
