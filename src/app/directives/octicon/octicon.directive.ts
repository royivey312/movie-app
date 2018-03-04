import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOcticon]'
})

export class OcticonDirective implements OnInit {

  @Input() octicon: string;
  @Input() color: string;
  @Input() width: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const octicons: any = require('octicons');
    const elem: HTMLElement = this.elementRef.nativeElement;
    elem.innerHTML = octicons[this.octicon].toSVG();

    const icon: Node = elem.firstChild;

    if (this.color) {
      this.renderColor(this.color, icon);
    }

    if (this.width) {
      this.renderSize(this.width, icon);
    }
  }

  private renderColor(color: string, icon: Node) {
    this.renderer.setStyle(icon, 'color', color);
  }

  private renderSize(width: number, icon: Node) {
    this.renderer.setStyle(icon, 'height', width);
    this.renderer.setStyle(icon, 'width', '100%');
  }
}
