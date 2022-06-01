import { Component, Host, h, Prop } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'custom-frame-selector',
  styleUrls: ['custom-frame-selector.css'], 
  shadow: true,
})
export class CustomFrameSelector {
  @Prop() frameCount!: number;
  @Prop() initialFrameIndex: number = 0;
  @Prop() currentFrame: number = 0;

  @Event({
    eventName: 'frameChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) frameChange: EventEmitter<number>
  frameChangeHandler(newIndex: number): void {
    this.frameChange.emit(newIndex);
  }

  renderButtons() {
    const frameArray = [];
    for(let i=0; i < this.frameCount; i++) {
      frameArray.push(
        <div class="item" is-selected={this.currentFrame === i} onClick={() => this.frameChangeHandler(i)}>
        </div>,
      );
    }

    return frameArray;
  }

  render() {
    return (
      <Host>
        {this.renderButtons()}
      </Host>
    );
  }
}
