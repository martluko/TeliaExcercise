import { Component, Host, h, Prop, State } from '@stencil/core';
import { Listen } from '@stencil/core';
import { debounce } from '../../utils/helpers';

const ONE_SECOND = 1000;
@Component({
  tag: 'custom-carousel',
  styleUrls: ['custom-carousel.css'],
  shadow: true,
})
export class CustomCarousel {
  /** 
   * Array of URLs to be used as images in carousel 
  */
  @Prop() imgURLArray: string[] = [
    `https://picsum.photos/400/600?random=1`,
    `https://picsum.photos/400/600?random=2`,
    `https://picsum.photos/400/600?random=3`,
    `https://picsum.photos/400/600?random=4`,
    `https://picsum.photos/400/600?random=5`,
    `https://picsum.photos/400/600?random=6`,
    `https://picsum.photos/400/600?random=7`,
  ];

  /** 
   * Number of images to be displayed in carousel per frame/page
  */
  @Prop() imageCountPerFrame: number = 2;
  /** 
   * Interval in seconds between auto frame/page change
  */
  @Prop() rotationTimeInSeconds: number = 3;
  
  @State() currentFrameIndex: number = 0;

  maxFrameCount = Math.ceil(this.imgURLArray.length / this.imageCountPerFrame);
  @State() debouncedFrameChange = debounce(() => {
    this.currentFrameIndex = this.maxFrameCount - 1 === this.currentFrameIndex ? 0 : this.currentFrameIndex + 1;
    this.debouncedFrameChange();
  }, this.rotationTimeInSeconds * ONE_SECOND);

  @Listen('frameChange')
  frameChangeHandler(event: CustomEvent<number>) {
    this.currentFrameIndex = event.detail;
    this.debouncedFrameChange();
  }

  componentWillLoad() {
    this.debouncedFrameChange();
  }

  isHidden(index:number) {
    const maxIndex = (this.currentFrameIndex+1) * this.imageCountPerFrame;
    const minIndex = maxIndex - this.imageCountPerFrame;
    console.log('isHidden', index, minIndex <= index && index < maxIndex);
    return minIndex <= index && index < maxIndex;
  }

  render() {
    return (
      <Host>
        <div class="row center">
          {this.imgURLArray.map((imageUrl, index) => (
            <div class="tile" hidden={!this.isHidden(index)}>
              <img src={imageUrl}></img>
            </div>
          ))}
        </div>
        <custom-frame-selector frameCount={this.maxFrameCount} currentFrame={this.currentFrameIndex} />
      </Host>
    );
  }
}
