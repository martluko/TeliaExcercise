import { newSpecPage } from '@stencil/core/testing';
import { CustomCarousel } from '../custom-carousel';

describe('custom-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CustomCarousel],
      html: `<custom-carousel></custom-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <custom-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </custom-carousel>
    `);
  });
});
