import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output } from '@angular/core';
import { Data2d, ScrollStatus } from 'smooth-scrollbar/interfaces';
import SmoothScrollbar from 'smooth-scrollbar';

export class ScrollingEvent implements ScrollStatus {
  offset: Data2d;
  limit: Data2d;
  smoothScrollRef: SmoothScrollbar;
  constructor(scrollRef: SmoothScrollbar, scrollStatus: ScrollStatus) {
    this.offset = scrollStatus.offset;
    this.limit = scrollStatus.limit;
    this.smoothScrollRef = scrollRef;
  }

  prevent() {
    this.smoothScrollRef.setMomentum(0, 0);
  }
}

@Directive({
  selector: '[containerSmoothScroll]',
  exportAs: 'containerSmoothScroll'
})
export class ContainerSmoothScrollDirective implements AfterViewInit, OnDestroy {
  @Input() removeTrack = false;
  @Input() damping?: number = 0.1;
  smoothScrollRef!: SmoothScrollbar;

  @Output() scrolling = new EventEmitter<ScrollingEvent>();
  @Output() initScroll = new EventEmitter<SmoothScrollbar>();
  constructor(
    private el: ElementRef,
    private _ngZone: NgZone
  ) {
  }

  onScroll = (scrollStatus: ScrollStatus) => {
    this.updateContinuosScrolling();
    const event = new ScrollingEvent(this.smoothScrollRef, scrollStatus);
    this.scrolling.emit(event);
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this.smoothScrollRef = SmoothScrollbar.init(this.el.nativeElement, { alwaysShowTracks: false, damping: this.damping });
      if (this.removeTrack) {
        this.smoothScrollRef.containerEl.children[2].remove();
      }
      this.initScroll.emit(this.smoothScrollRef);
      this.updateContinuosScrolling();
      this.smoothScrollRef.addListener(this.onScroll);
    });
  }

  updateContinuosScrolling(): void {
    const isScroll = this.el.nativeElement.clientWidth < this.el.nativeElement.scrollWidth || this.el.nativeElement.clientHeight < this.el.nativeElement.scrollHeight;
    this.smoothScrollRef.options.continuousScrolling = !isScroll;
  }

  ngOnDestroy(): void {
    this._ngZone.runOutsideAngular(() => {
      this.smoothScrollRef.removeListener(this.onScroll);
      this.smoothScrollRef.destroy();
    })
  }

}
