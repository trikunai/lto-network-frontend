import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lto-content-section',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: 0 auto;
        padding: 16px;
        width: 100%;
        box-sizing: border-box;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentSectionComponent implements OnInit {
  @Input() width!: 'full' | 'large' | 'medium' | 'small' | 'very-small';

  get maxWidth(): string {
    switch (this.width) {
      case 'full':
        return '100%';
      case 'large':
        return '1400px';
      case 'medium':
        return '1024px';
      case 'small':
        return '800px';
      case 'very-small':
        return '600px';
      default:
        return '1024px';
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.maxWidth = this.maxWidth;
  }
}
